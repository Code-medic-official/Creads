"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDb } from "../database/db";
import threadModel, { iThread } from "../database/models/thread.model";
import { threadSchema } from "../schemas/thread";

export const createThread = async (
	thread: z.infer<typeof threadSchema>
): Promise<void> => {
	await connectDb();

	try {
		await threadModel.create(thread);

		revalidatePath("/feeds");
		// return JSON.parse(JSON.stringify(newThread));
	} catch (error: any) {
		console.error(error);
	}
};

export const getThreads = async (): Promise<void> => {
	await connectDb();

	try {
		const threads = await threadModel
			.find({ community: null }) // ? Only those without communities
			.populate({
				path: "user",
				populate: {
					path: "followers",
					select: "-age -password -onboarded -followers",
				},
			})
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(threads));
	} catch (error: any) {
		console.error(error);
	}
};

export const getUserThreads = async (userId: string): Promise<iThread[]> => {
	try {
		await connectDb();

		const userThreads = await threadModel
			.find({ user: userId })
			.populate({
				path: "user",
				populate: {
					path: "followers",
					select: "-age -password -onboarded -followers",
				},
			})
			.populate("community", "-bio -members -creator")

			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(userThreads));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getFollowingsTreads = async (
	followings: string[]
): Promise<iThread[]> => {
	try {
		await connectDb();

		const followingsThreads = await threadModel
			.find()
			.in("user", followings)
			.populate({
				path: "user",
				populate: {
					path: "followers",
					select: "-age -password -onboarded -followers",
				},
			})
			.populate("community", "-bio -members -creator")

			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(followingsThreads));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getFriendThreads = async (
	friendsId: string[]
): Promise<iThread[]> => {
	try {
		await connectDb();

		const friendThreads = await threadModel
			.find()
			.in("user", friendsId)
			.populate({
				path: "user",
				populate: {
					path: "followers",
					select: "-age -password -onboarded -followers",
				},
			})
			.populate("community", "-bio -members -creator")
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(friendThreads));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCommunityThreads = async (
	communityId: string
): Promise<iThread[]> => {
	try {
		await connectDb();

		const communityThreads = await threadModel
			.find({ community: communityId })
			.populate({
				path: "user",
				populate: {
					path: "followers",
					select: "-age -password -onboarded -followers",
				},
			})
			.populate("community", "-bio -members -creator")
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(communityThreads));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCommunitiesThreads = async (
	communitiesIds: string[] = []
): Promise<iThread[]> => {
	try {
		await connectDb();

		const communityThreads = await threadModel
			.find()
			.in("community", communitiesIds)
			.populate({
				path: "user",
				populate: {
					path: "followers",
					select: "-age -password -onboarded -followers",
				},
			})
			.populate("community", "-bio -members -creator")
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(communityThreads));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getSearchThreads = async (q: string): Promise<iThread[]> => {
	try {
		await connectDb();

		const qRegex = new RegExp(q, "i");

		const results = await threadModel
			.find()
			.regex("caption", qRegex)
			.populate({
				path: "user",
				populate: {
					path: "followers",
					select: "-age -password -onboarded -followers",
				},
			})
			.populate("community", "-bio -members -creator")
			.sort({ createdAt: "desc" });

		return JSON.parse(JSON.stringify(results));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getThread = async (threadId: string): Promise<iThread> => {
	try {
		await connectDb();

		const thread = await threadModel
			.findById(threadId)
			.populate({
				path: "user",
				populate: {
					path: "followers",
					select: "-age -password -onboarded -followers",
				},
			})
			.populate("community", "-bio -members -creator");

		return JSON.parse(JSON.stringify(thread));
	} catch (error: any) {
		console.error(error);
	}
};

export const upsertThread = async (
	thread: iThread,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await threadModel.findByIdAndUpdate(
			{
				_id: thread._id,
			},
			{
				caption: thread.caption,
				likes: thread.likes,
				dislikes: thread.dislikes,
				image: thread.image,
				privacy: thread.privacy,
			},
			{ upsert: true }
		);

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
