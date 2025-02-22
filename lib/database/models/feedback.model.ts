import { model, models, Schema } from "mongoose";
import { iUser } from "./user.model";

export interface iFeedback {
	_id?: string;
	user: string | iUser;
	rating: number;
	body: string | null;
	isApproved?: boolean;
	createdAt?: string;
	updatedAt?: string;
}

const feedbackSchema = new Schema(
	{
		rating: {
			type: Number,
			default: 0,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true,
		},
		body: {
			type: String,
			maxLength: 1000,
			nullable: true,
		},
		isApproved: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export default models?.Feedback || model("Feedback", feedbackSchema);
