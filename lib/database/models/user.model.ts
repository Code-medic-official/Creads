import { model, models, Schema } from "mongoose";

export interface iUser {
	_id?: string;

	// ? Clerk fields
	clerkId: string;
	username: string;
	emailAdress: string;
	imageUrl?: string;

	age?: number;
	bio?: string;
	onboarded?: boolean;
	createdAt?: string;
	updatedAt?: string;

	// ? Engagement
	followers: (iUser | string)[];
	blockList: (iUser | string)[];
}

const userSchema = new Schema(
	{
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		emailAdress: {
			type: String,
			required: true,
			unique: true,
		},
		imageUrl: { type: String, default: "" },

		// ? Additional fields
		bio: { type: String, default: "App made by CodeMedic👨‍💻🚀" },
		onboarded: {
			type: Boolean,
			default: false,
		},
		age: Number,
		followers: {
			type: [Schema.Types.ObjectId],
			ref: "User",
		},
		blockList: {
			type: [Schema.Types.ObjectId],
			ref: "User",
		},
	},
	{ timestamps: true }
);

userSchema.pre("find", function () {
	this.sort({ createdAt: "desc" });
});

export default models.User || model("User", userSchema);
