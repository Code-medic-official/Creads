import { getThreadComments } from "@/lib/actions/comment.action";
import { iComment } from "@/lib/database/models/comment.model";
import React, { useState } from "react";
import CommentForm from "./forms/CommentForm";
import CommentCard from "./cards/CommentCard";
import { getActiveUser } from "@/lib/actions/user.actions";

export default async function Comments({ threadId }: { threadId: string }) {
	const comments: iComment[] = await getThreadComments(threadId);
	const user = await getActiveUser();

	return (
		<section className="space-y-3">
			<div className="sticky top-[3.6rem] z-10">
				<CommentForm user={user} threadId={threadId} />
			</div>
			<div className="space-y-2">
				{comments.map((comment) => {
					if (comment.refComment) return;

					return <CommentCard key={comment._id} comment={comment} />;
				})}
			</div>
		</section>
	);
}
