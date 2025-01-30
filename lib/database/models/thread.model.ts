import { Schema, model, models } from "mongoose";
import { iUser } from "./user.model";

export enum ThreadPrivacy {
	PUBLIC = "PUBLIC",
	PRIVATE = "PRIVATE",
	FRIENDS = "FRIENDS",
}

export interface iThread {
	_id: string;
	user: iUser;
	community: string; // ! change this
	caption: string;
	image: string;
	likes: string[];
	dislikes: string[];
	privacy: ThreadPrivacy;
	createdAt: string;
	updatedAt: string;
}

const threadSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true,
		},
		community: {
			type: Schema.Types.ObjectId,
			ref: "Community",
			immutable: true,
		},
		caption: {
			type: String,
			max: 500,
			required: true,
		},
		image: String,
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
		privacy: {
			type: String,
			enum: ThreadPrivacy,
			default: ThreadPrivacy.PUBLIC,
		},
	},
	{
		timestamps: true,
	}
);

export default models?.Thread || model("Thread", threadSchema);
