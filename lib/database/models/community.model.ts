import { model, models, Schema } from "mongoose";
import { iUser } from "./user.model";

export interface iCommunity {
	_id?: string;
	clerkId: string;
	creator: iUser | string;
	imageUrl: string;
	name: string;
	bio?: string;
	slug: string;
	members?: (iUser | string)[];
	createdAt?: string;
	updatedAt?: string;
}

// const communitySchema = new Schema(
// 	{
// 		id: {
// 			type: String,
// 			required: true,
// 		},
// 		username: {
// 			type: String,
// 			unique: true,
// 			required: true,
// 		},
// 		name: {
// 			type: String,
// 			required: true,
// 		},
// 		image: String,
// 		bio: String,
// 		createdBy: {
// 			type: Schema.Types.ObjectId,
// 			ref: "User",
// 		},
// 		threads: [
// 			{
// 				type: Schema.Types.ObjectId,
// 				ref: "Thread",
// 			},
// 		],
// 		members: [
// 			{
// 				type: Schema.Types.ObjectId,
// 				ref: "User",
// 			},
// 		],
// 	},
// 	{ timestamps: true }
// );

const communitySchema = new Schema(
	{
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			requried: true,
			ref: "User",
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
		bio: {
			type: String,
			maxLength: 500,
		},
		members: {
			types: [Schema.Types.ObjectId],
			ref: "User",
		},
		imageUrl: String,
	},
	{ timestamps: true }
);

export default models?.Community || model("Community", communitySchema);
