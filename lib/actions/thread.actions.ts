"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { connectDb } from "../database/db";
import threadModel, { iThread } from "../database/models/thread.model";
import { unstable_cache as cache } from "next/cache";

import { threadSchema } from "../schemas/thread";

export const createThread = async (
	thread: z.infer<typeof threadSchema>
): Promise<void> => {
	try {
		await connectDb();
		await threadModel.create(thread);

		revalidatePath("/feeds");
		revalidateTag("threads");
	} catch (error: any) {
		console.error(error);
	}
};

export const getThreads = cache(
	async (): Promise<iThread[]> => {
		try {
			await connectDb();
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
			throw new Error(error);
		}
	},
	["threads"],
	{ revalidate: 60, tags: ["threads"] }
);

export const getUserThreads = cache(
	async (userId: string): Promise<iThread[]> => {
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
				.populate("community", "-members -creator")

				.sort({ createdAt: "desc" });

			return JSON.parse(JSON.stringify(userThreads));
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["user-threads"],
	{ revalidate: 60, tags: ["threads"] }
);

export const getFollowingsTreads = cache(
	async (followings: string[]): Promise<iThread[]> => {
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
	},
	["followings-threads"],
	{ revalidate: 60, tags: ["threads"] }
);

export const getFriendThreads = cache(
	async (friendsId: string[]): Promise<iThread[]> => {
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
	},
	["friend-threads"],
	{ revalidate: 60, tags: ["threads"] }
);

export const getCommunityThreads = cache(
	async (communityId: string): Promise<iThread[]> => {
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
	},
	["community-threads"],
	{ revalidate: 20, tags: ["threads"] }
);

export const getCommunitiesThreads = cache(
	async (communitiesIds: string[] = []): Promise<iThread[]> => {
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
	},
	["communities-threads"],
	{ revalidate: 60, tags: ["threads"] }
);

export const getSearchThreads = cache(
	async (q: string): Promise<iThread[]> => {
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
	},
	["search-threads"],
	{ revalidate: 120, tags: ["threads"] }
);

export const getThread = cache(
	async (threadId: string): Promise<iThread> => {
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
			throw new Error(error);
		}
	},
	["thread"],
	{ revalidate: 60, tags: ["threads", "thread"] }
);

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
		revalidateTag("threads"); // ! Revalidate all the cached threads with tag "threads"
	} catch (error: any) {
		throw new Error(error);
	}
};
