import { iComment } from "@/lib/database/models/comment.model";
import moment from "moment";
import ThreadCard from "./cards/ThreadCard";
import UserCard from "./cards/UserCard";
import Engagement from "./Engagement";

export default function ReplyCard({ reply }: { reply: iComment }) {
	return (
		<div>
			<div className="flex items-center justify-between">
				<UserCard _user={reply.user} variant="sm" />
				<span className="text-xs text-muted-foreground">
					{moment(reply.createdAt).fromNow()}
				</span>
			</div>

			<div className="ml-3 border-l-2 border-b-2 rounded-bl-xl pl-6 pb-7">
				<p>{reply.body}</p>
				<Engagement item={reply} variant="COMMENT" />
			</div>
			<div className="-mt-7 ml-7">
				<ThreadCard thread={reply.thread} />
			</div>
		</div>
	);
}
