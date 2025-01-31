"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../database/db";
import commentModel, { iComment } from "../database/models/comment.model";
import { commentSchema } from "../schemas/comment";
import { z } from "zod";
import { getCommunityThreads } from "./thread.actions";

export const createComment = async (
	comment: z.infer<typeof commentSchema>,
	path: string
): Promise<void> => {
	try {
		await connectDb();

		await commentModel.create(comment);

		revalidatePath(path);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getThreadComments = async (
	threadId: string
): Promise<iComment[]> => {
	try {
		await connectDb();

		const threadComments = await commentModel
			.find({ thread: threadId, refComment: null })
			.populate(["user", "refComment"])
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(threadComments));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUserComments = async (userId: string): Promise<iComment[]> => {
	try {
		await connectDb();

		const userComments = await commentModel
			.find({ user: userId, refComment: null })
			.populate("user")
			.populate({
				path: "thread",
				populate: {
					path: "user",
					populate: {
						path: "followers",
						select: "-age -password -onboarded -followers",
					},
				},
			})
			.populate({
				path: "thread",
				populate: { path: "community", select: "-bio -members -creator" },
			})

			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(userComments));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getReplyComments = async (
	commentId: string
): Promise<iComment[]> => {
	try {
		await connectDb();

		const replyComments = await commentModel
			.find({ refComment: commentId })
			.populate("user")
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(replyComments));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getSearchComments = async (q: string): Promise<iComment[]> => {
	try {
		await connectDb();

		const qRegEx = new RegExp(q, "i");

		const results = await commentModel
			.find({ refComment: null })
			.regex("body", qRegEx)
			.populate("user")
			.populate({
				path: "thread",
				populate: {
					path: "user",
					populate: {
						path: "followers",
						select: "-age -password -onboarded -followers",
					},
				},
			})
			.populate({
				path: "thread",
				populate: { path: "community", select: "-bio -members -creator" },
			})

			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(results));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCommunityComments = async (
	communityId: string
): Promise<iComment[]> => {
	try {
		const communityThreadsIds = (await getCommunityThreads(communityId)).map(
			(thread) => thread._id
		);

		const communityReplies = await commentModel
			.find({ refComment: null })
			.in("thread", communityThreadsIds)
			.populate("user")
			.populate({
				path: "thread",
				populate: {
					path: "user",
					populate: {
						path: "followers",
						select: "-age -password -onboarded -followers",
					},
				},
			})
			.populate({
				path: "thread",
				populate: { path: "community", select: "-bio -members -creator" },
			})
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(communityReplies));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const upsertComment = async (
	comment: iComment,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await commentModel.findByIdAndUpdate(
			comment._id,
			{
				body: comment.body,
				likes: comment.likes,
				dislikes: comment.dislikes,
			},
			{ upsert: true }
		);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
