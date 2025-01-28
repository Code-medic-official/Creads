import { model, models, Schema } from "mongoose";
import { iUser } from "./user.model";

// {
// 	"created_at": 1654013202977,
// 	"created_by": "user_1vq84bqWzw7qmFgqSwN4CH1Wp0n",
// 	"id": "org_29w9IfBrPmcpi0IeBVaKtA7R94W",
// 	"image_url": "https://img.clerk.com/xxxxxx",
// 	"logo_url": "https://example.org/example.png",
// 	"name": "Acme Inc",
// 	"object": "organization",
// 	"public_metadata": {},
// 	"slug": "acme-inc",
// 	"updated_at": 1654013202977
// }

export interface iCommunity {
	_id?: string;
	clerkId: string;
	creator: iUser;
	imageUrl: string;
	logoUrl: string;
	name: string;
	bio: string;
	// object: "organization";
	// publicMetadata: {};
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

const communitySchema = new Schema({
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
		immutable: true,
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
	logoUrl: String,
});

export default models?.Community || model("Community", communitySchema);
