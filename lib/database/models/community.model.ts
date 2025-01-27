import { model, models, Schema } from "mongoose";

const communitySchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		image: String,
		bio: String,
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		threads: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thread",
			},
		],
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

export default models?.Community || model("Community", communitySchema);
