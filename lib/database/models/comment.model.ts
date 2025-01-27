import { model, models, Schema } from "mongoose";
import { iUser } from "./user.model";
import { iThread } from "./thread.model";

export interface iComment {
	_id: string;
	user: iUser;
	thread: iThread;
	body: string;
	refComment: iComment;
	likes: string[];
	dislikes: string[];
	createdAt: string;
	updatedAt: string;
}

const commentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true,
		},
		thread: {
			type: Schema.Types.ObjectId,
			ref: "Thread",
			required: true,
			immutable: true,
		},
		refComment: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
			immutable: true,
		},
		body: {
			type: String,
			max: 300,
		},
		likes: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
		dislikes: {
			type: [Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
	},
	{ timestamps: true }
);

export default models.Comment || model("Comment", commentSchema);
