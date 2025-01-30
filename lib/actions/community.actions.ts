"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../database/db";
import communityModel, { iCommunity } from "../database/models/community.model";

export const createCommunity = async (community: iCommunity) => {
	try {
		await connectDb();

		await communityModel.create(community);

		revalidatePath("/communities");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCommunity = async (slug?: string, clerkId?: string): Promise<iCommunity> => {
	try {
		await connectDb();

		const community = await communityModel
			.findOne().or([{clerkId},{ slug }])
			.populate("creator", "-age -blocklist")
			.populate("members");

		return JSON.parse(JSON.stringify(community));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCommunities = async (): Promise<iCommunity[]> => {
	try {
		await connectDb();

		const communities = await communityModel
			.find()
			.populate("creator", "-age -blocklist")
			.populate("members");

		return JSON.parse(JSON.stringify(communities));
	} catch (error: any) {
		throw new Error(error);
	}
};

export const upsertCommunity = async (
	community: iCommunity,
	pathname: string,
	slug?: string,
	clerkId?: string
): Promise<void> => {
	try {
		await connectDb();

		// ? Filter using Slug or clerk Id
		await communityModel.findOneAndUpdate(
			{
				$or: [{ slug }, { clerkId }],
			},
			{
				name: community.name,
				bio: community.bio,
				members: community.members,
				slug: community.slug,
				imageUrl: community.imageUrl,
				logoUrl: community.logoUrl,
			},
			{ upsert: true }
		);
		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const delelteCommunity = async (
	clerkId: string,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await communityModel.findOneAndDelete({ clerkId });

		// ! Delete all threads associated with the community
		// await threadModel.deleteMany({ community: communityId });

		revalidatePath(pathname);
	} catch (error: any) {
		throw new Error(error);
	}
};
