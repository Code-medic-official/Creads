"use server";

import { auth, currentUser, User } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { connectDb } from "../database/db";
import { unstable_cache as cache } from "next/cache";
import userModel, { iUser } from "../database/models/user.model";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

// ! AUTH Server Actions
export const createUser = async (newUser: iUser): Promise<void> => {
	await connectDb();

	console.log("creating User");

	try {
		await userModel.create(newUser);

		revalidateTag("user");
		revalidateTag("users");
		revalidateTag("current-user");
		// ! Redirect user to onboarding page after creating account Immediately
		redirect("/onboarding");
	} catch (error: any) {
		throw new Error(error);
	}
};

// ? Directly get active User
export const getActiveUser = async (): Promise<iUser> => {
	try {
		await connectDb();

		const clerkUser = (await currentUser()) as User;

		// ? Applying the caching concepts
		const fetchActiveUser = cache(
			async (): Promise<iUser> =>
				await userModel
					.findOne({ username: clerkUser?.username })
					.populate(["followers", "blockList"]),
			["current-user"],
			{ revalidate: 1800, tags: ["current-user", "users", "user"] }
		);

		return JSON.parse(JSON.stringify(await fetchActiveUser()));

		// const user = await userModel
		// 	.findOne({ username })
		// 	.populate(["followers", "blockList"]);

		// return JSON.parse(JSON.stringify(user));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUsers = cache(
	async (): Promise<iUser[]> => {
		try {
			await connectDb();

			const users = await userModel.find().populate(["followers", "blockList"]);

			// return users
			return JSON.parse(JSON.stringify(users));
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["users"],
	{ revalidate: 3600, tags: ["users"] }
);

// export const getUsers = async (): Promise<iUser[]> => {
// 	try {
// 		await connectDb();

// 		const users = await userModel.find().populate(["followers", "blockList"]);

// 		// return users
// 		return JSON.parse(JSON.stringify(users));
// 	} catch (error: any) {
// 		throw new Error(error);
// 	}
// };

export const getUser = cache(
	async (username?: string, clerkId?: string): Promise<iUser> => {
		try {
			await connectDb();

			const user = await userModel
				.findOne()
				.or([{ username }, { clerkId }])
				.populate(["followers", "blockList"]);

			return JSON.parse(JSON.stringify(user));
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["user"],
	{ revalidate: 1800, tags: ["user", "db-user"] }
);

export const getRandomUsers = async (): Promise<iUser[]> => {
	try {
		await connectDb();
		const { userId } = await auth();

		const _randomUsers = await userModel.aggregate([
			{ $match: { clerkId: { $ne: userId } } },
			{ $sample: { size: 3 } },
		]);

		const randomUsers = await userModel.populate(_randomUsers, {
			path: "followers blockList",
		});

		return JSON.parse(JSON.stringify(randomUsers));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUserFollowings = async (userId: string): Promise<iUser[]> => {
	try {
		await connectDb();

		const followings = await userModel
			.find({ followers: userId })
			.select("-age -password -email -onboarded -blockList");

		return JSON.parse(JSON.stringify(followings));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUserFriends = async (
	userFollowers: string[],
	userId: string
): Promise<iUser[]> => {
	try {
		await connectDb();

		const friends = await userModel
			.find({ followers: userId })
			.in("_id", userFollowers)
			.populate("followers");

		return JSON.parse(JSON.stringify(friends));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getSearchUsers = async (q: string): Promise<iUser[]> => {
	try {
		await connectDb();

		const qRegex = new RegExp(q, "i");

		const results = await userModel
			.find()
			.regex("username", qRegex)
			.populate("followers");

		return JSON.parse(JSON.stringify(results));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const upsertUser = async (
	user: iUser,
	pathname?: string
): Promise<void> => {
	await connectDb();

	try {
		await userModel.findByIdAndUpdate(
			user._id,
			{
				username: user.username,
				emailAdress: user.emailAdress,
				age: user.age,
				bio: user.bio,
				onboarded: user.onboarded,
				followers: user.followers,
				blockList: user.blockList,
			},
			{ upsert: true }
		);

		// Revalidate profile page only on updating.
		// revalidatePath(pathname || "/profile");
		revalidateTag("user");
		revalidateTag("users");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteUser = async (clerkId: string) => {
	try {
		await connectDb();

		const deletedUser = await userModel.findOneAndDelete({ clerkId });

		revalidateTag("users");

		return JSON.parse(JSON.stringify(deletedUser));
	} catch (error: any) {
		throw new Error(error);
	}
};
