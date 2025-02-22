"use server";

import { revalidatePath } from "next/cache";
import { connectDb } from "../database/db";
import feedbackModel, { iFeedback } from "../database/models/feedback.model";

export const createFeedback = async (feedback: iFeedback): Promise<void> => {
	try {
		await connectDb();

		await feedbackModel.create(feedback);

		revalidatePath("/");
	} catch (error: any) {
		throw new Error(error);
	}
};
