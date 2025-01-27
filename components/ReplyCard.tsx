"use client";

import { iComment } from "@/lib/database/models/comment.model";
import React from "react";
import UserCard from "./cards/UserCard";
import moment from "moment";
import ThreadCard from "./cards/ThreadCard";
import Engagement from "./Engagement";
import { usePathname } from "next/navigation";

export default function ReplyCard({ reply }: { reply: iComment }) {
	const pathname = usePathname();

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
				<Engagement item={reply} variant="COMMENT" pathname={pathname} />
			</div>
			<div className="-mt-7 ml-7">
				<ThreadCard thread={reply.thread} />
			</div>
		</div>
	);
}
