import { model, models, Schema } from "mongoose";
import { iUser } from "./user.model";

export interface iCommunity {
	_id?: string;
	clerkId: string;
	creator: iUser | string;
	imageUrl: string;
	name: string;
	slug: string;
	members?: (iUser | string)[];
	createdAt?: string;
	updatedAt?: string;
}

const communitySchema = new Schema(
	{
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			immutable: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},

		members: {
			type: [Schema.Types.ObjectId],
			ref: "User",
		},
		imageUrl: String,
	},
	{ timestamps: true }
);

export default models?.Community || model("Community", communitySchema);
