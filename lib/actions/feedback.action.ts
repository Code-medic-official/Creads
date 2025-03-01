"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { connectDb } from "../database/db";
import feedbackModel, { iFeedback } from "../database/models/feedback.model";
import { unstable_cache as cache } from "next/cache";

export const createFeedback = async (feedback: iFeedback): Promise<void> => {
	try {
		await connectDb();
		await feedbackModel.create(feedback);

		revalidatePath("/");
		revalidateTag("feedbacks");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getFeedbacks = cache(
	async (): Promise<[iFeedback]> => {
		try {
			await connectDb();

			const feedbacks = await feedbackModel
				.find()
				.nin("body", [null, ""]) // ? Only feedbacks with a valid Comments
				.populate("user", "-age -bio -blockList -followers -onboarded");

			return JSON.parse(JSON.stringify(feedbacks));
		} catch (error: any) {
			throw new Error(error);
		}
	},
	["feedbacks"],
	{ revalidate: 900, tags: ["feedbacks"] }
);

export const getFeedbackStats = async (): Promise<{
	totalFeedbacks: number;
	avgRating: string;
}> => {
	try {
		await connectDb();

		const feedbacks = await feedbackModel.find();

		const totalFeedbacks = feedbacks.length;
		const avgRating = (
			feedbacks
				.map((feedback) => feedback.rating)
				.reduce((t, rate) => rate + t, 0) / totalFeedbacks
		).toFixed(1);

		return JSON.parse(JSON.stringify({ totalFeedbacks, avgRating }));
	} catch (error: any) {
		throw new Error(error);
	}
};
