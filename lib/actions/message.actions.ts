"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectDb } from "../database/db";
import messageModel, { iMessage } from "../database/models/message.model";
import { messageSchema } from "../schemas/message";

export const createMessage = async (
	message: z.infer<typeof messageSchema>,
	pathname: string
): Promise<void> => {
	try {
		await connectDb();

		await messageModel.create(message);

		revalidatePath(pathname);
		// Pusher
		// await pusherServer.trigger("user._id", "message:new", newMsg);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getChatMessages = async (
	userId: string,
	friendId: string
): Promise<iMessage[]> => {
	try {
		await connectDb();

		const userMessages = await messageModel
			.find()
			.and([
				{ from: { $in: [userId, friendId] } },
				{ to: { $in: [friendId, userId] } },
			]);
		// .populate("from", "-onboarded -followers -blocklist");

		return JSON.parse(JSON.stringify(userMessages));
	} catch (error: any) {
		throw new Error(error);
	}
};
