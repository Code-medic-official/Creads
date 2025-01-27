import { getThreadComments } from "@/lib/actions/comment.action";
import { getActiveUser } from "@/lib/actions/user.actions";
import { iComment } from "@/lib/database/models/comment.model";
import CommentCard from "./cards/CommentCard";
import CommentForm from "./forms/CommentForm";

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
