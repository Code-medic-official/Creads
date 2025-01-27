"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { connectDb } from "../database/db";
import userModel from "../database/models/user.model";
import communityModel from "../database/models/community.model";
import threadModel from "../database/models/thread.model";

export async function createCommunity(
	id: string,
	name: string,
	username: string,
	image: string,
	bio: string,
	createdById: string // Change the parameter name to reflect it's an id
) {
	try {
		connectDb();

		// Find the user with the provided unique id
		const user = await userModel.findOne({ id: createdById });

		if (!user) {
			throw new Error("User not found"); // Handle the case if the user with the id is not found
		}

		const newCommunity = new communityModel({
			id,
			name,
			username,
			image,
			bio,
			createdBy: user._id, // Use the mongoose ID of the user
		});

		const createdCommunity = await newCommunity.save();

		// Update User model
		user.communities.push(createdCommunity._id);
		await user.save();

		return createdCommunity;
	} catch (error) {
		// Handle any errors
		console.error("Error creating community:", error);
		throw error;
	}
}

export async function fetchCommunityDetails(id: string) {
	try {
		connectDb();

		const communityDetails = await communityModel.findOne({ id }).populate([
			"createdBy",
			{
				path: "members",
				model: userModel,
				select: "name username image _id id",
			},
		]);

		return communityDetails;
	} catch (error) {
		// Handle any errors
		console.error("Error fetching community details:", error);
		throw error;
	}
}

export async function fetchCommunityPosts(id: string) {
	try {
		connectDb();

		const communityPosts = await communityModel.findById(id).populate({
			path: "threads",
			model: threadModel,
			populate: [
				{
					path: "author",
					model: userModel,
					select: "name image id", // Select the "name" and "_id" fields from the "User" model
				},
				{
					path: "children",
					model: threadModel,
					populate: {
						path: "author",
						model: userModel,
						select: "image _id", // Select the "name" and "_id" fields from the "User" model
					},
				},
			],
		});

		return communityPosts;
	} catch (error) {
		// Handle any errors
		console.error("Error fetching community posts:", error);
		throw error;
	}
}

export async function fetchCommunities({
	searchString = "",
	pageNumber = 1,
	pageSize = 20,
	sortBy = "desc",
}: {
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: SortOrder;
}) {
	try {
		connectDb();

		// Calculate the number of communities to skip based on the page number and page size.
		const skipAmount = (pageNumber - 1) * pageSize;

		// Create a case-insensitive regular expression for the provided search string.
		const regex = new RegExp(searchString, "i");

		// Create an initial query object to filter communities.
		const query: FilterQuery<typeof communityModel> = {};

		// If the search string is not empty, add the $or operator to match either username or name fields.
		if (searchString.trim() !== "") {
			query.$or = [
				{ username: { $regex: regex } },
				{ name: { $regex: regex } },
			];
		}

		// Define the sort options for the fetched communities based on createdAt field and provided sort order.
		const sortOptions = { createdAt: sortBy };

		// Create a query to fetch the communities based on the search and sort criteria.
		const communitiesQuery = communityModel
			.find(query)
			.sort(sortOptions)
			.skip(skipAmount)
			.limit(pageSize)
			.populate("members");

		// Count the total number of communities that match the search criteria (without pagination).
		const totalCommunitiesCount = await communityModel.countDocuments(query);

		const communities = await communitiesQuery.exec();

		// Check if there are more communities beyond the current page.
		const isNext = totalCommunitiesCount > skipAmount + communities.length;

		return { communities, isNext };
	} catch (error) {
		console.error("Error fetching communities:", error);
		throw error;
	}
}

export async function addMemberToCommunity(
	communityId: string,
	memberId: string
) {
	try {
		connectDb();

		// Find the community by its unique id
		const community = await communityModel.findOne({ id: communityId });

		if (!community) {
			throw new Error("communityModel not found");
		}

		// Find the user by their unique id
		const user = await userModel.findOne({ id: memberId });

		if (!user) {
			throw new Error("User not found");
		}

		// Check if the user is already a member of the community
		if (community.members.includes(user._id)) {
			throw new Error("User is already a member of the community");
		}

		// Add the user's _id to the members array in the community
		community.members.push(user._id);
		await community.save();

		// Add the community's _id to the communities array in the user
		user.communities.push(community._id);
		await user.save();

		return community;
	} catch (error) {
		// Handle any errors
		console.error("Error adding member to community:", error);
		throw error;
	}
}

export async function removeUserFromCommunity(
	userId: string,
	communityId: string
) {
	try {
		connectDb();

		const userIdObject = await userModel.findOne({ id: userId }, { _id: 1 });
		const communityIdObject = await communityModel.findOne(
			{ id: communityId },
			{ _id: 1 }
		);

		if (!userIdObject) {
			throw new Error("User not found");
		}

		if (!communityIdObject) {
			throw new Error("communityModel not found");
		}

		// Remove the user's _id from the members array in the community
		await communityModel.updateOne(
			{ _id: communityIdObject._id },
			{ $pull: { members: userIdObject._id } }
		);

		// Remove the community's _id from the communities array in the user
		await userModel.updateOne(
			{ _id: userIdObject._id },
			{ $pull: { communities: communityIdObject._id } }
		);

		return { success: true };
	} catch (error) {
		// Handle any errors
		console.error("Error removing user from community:", error);
		throw error;
	}
}

export async function updateCommunityInfo(
	communityId: string,
	name: string,
	username: string,
	image: string
) {
	try {
		connectDb();

		// Find the community by its _id and update the information
		const updatedCommunity = await communityModel.findOneAndUpdate(
			{ id: communityId },
			{ name, username, image }
		);

		if (!updatedCommunity) {
			throw new Error("communityModel not found");
		}

		return updatedCommunity;
	} catch (error) {
		// Handle any errors
		console.error("Error updating community information:", error);
		throw error;
	}
}

export async function deleteCommunity(communityId: string) {
	try {
		connectDb();

		// Find the community by its ID and delete it
		const deletedCommunity = await communityModel.findOneAndDelete({
			id: communityId,
		});

		if (!deletedCommunity) {
			throw new Error("communityModel not found");
		}

		// Delete all threads associated with the community
		await threadModel.deleteMany({ community: communityId });

		// Find all users who are part of the community
		const communityUsers = await userModel.find({ communities: communityId });

		// Remove the community from the 'communities' array for each user
		const updateUserPromises = communityUsers.map((user) => {
			user.communities.pull(communityId);
			return user.save();
		});

		await Promise.all(updateUserPromises);

		return deletedCommunity;
	} catch (error) {
		console.error("Error deleting community: ", error);
		throw error;
	}
}
