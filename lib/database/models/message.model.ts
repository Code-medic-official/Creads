import { model, models, Schema } from "mongoose";
import { iUser } from "./user.model";

export enum MsgState {
	SENT = "SENT",
	RECIEVED = "RECIEVED",
	READ = "READ",
}

export interface iMessage {
	_id: string;
	from: iUser | string;
	to: string;
	body: string;
	refMessage?: string | iMessage | null;
	state: MsgState;
	// state: "SENT" | "RECEIVED" | "READ";
	createdAt: string;
	updatedAt: string;
}

const messageSchema = new Schema(
	{
		from: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		to: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		body: {
			type: String,
			maxlength: 1000, // ! Can modify
			trim: true,
		},
		refMessage: {
			type: Schema.Types.ObjectId,
			ref: "Message",
		},
		state: {
			type: String,
			enum: MsgState,
			default: MsgState.SENT,
		},
	},
	{ timestamps: true }
);

export default models?.Message || model("Message", messageSchema);
