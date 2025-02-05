"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDb } from "../database/db";
import userModel, { iUser } from "../database/models/user.model";

// ! AUTH Server Actions
export const createUser = async (newUser: iUser): Promise<void> => {
	await connectDb();

	console.log("creating User");

	try {
		await userModel.create(newUser);

		// redirect("/onboarding");
	} catch (error: any) {
		throw new Error(error);
	}
};

// ? Directly get active User
export const getActiveUser = async (): Promise<iUser> => {
	try {
		const { userId } = await auth();

		const activeUser = await getUser(undefined, userId!);

		return JSON.parse(JSON.stringify(activeUser));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUsers = async (): Promise<iUser[]> => {
	try {
		await connectDb();

		const users = await userModel.find().populate(["followers", "blockList"]);

		// return users
		return JSON.parse(JSON.stringify(users));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getUser = async (
	username?: string,
	clerkId?: string
): Promise<iUser> => {
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

export const deleteUser = async (clerkId: string) => {
	try {
		await connectDb();

		const deletedUser = await userModel.findOneAndDelete({ clerkId });

		return JSON.parse(JSON.stringify(deletedUser));
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
			{ _id: user._id },
			{
				username: user.username,
				emailAdress: user.emailAdress,
				age: user.age,
				bio: user.bio,
				onboarded: user.onboarded,
				followers: user.followers,
			},
			{ upsert: true }
		);

		// Revalidate profile page only on updating.
		revalidatePath(pathname || "/profile");
	} catch (error: any) {
		throw new Error(error);
	}
};
