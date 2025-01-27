"use client";

import { setRefComment } from "@/Features/commentSlice";
import { getReplyComments } from "@/lib/actions/comment.action";
import { iComment } from "@/lib/database/models/comment.model";
import { useAppDispatch } from "@/lib/hooks";
import { ChevronDown, ChevronUp } from "lucide-react";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Engagement from "../Engagement";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../ui/collapsible";
import { Label } from "../ui/label";
import UserCard from "./UserCard";

export default function CommentCard({ comment }: { comment: iComment }) {
	const [replyComments, setReplyComments] = useState<iComment[]>();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const pathname = usePathname();
	const router = useRouter();

	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchReplyComments = async (): Promise<void> => {
			setReplyComments(await getReplyComments(comment?._id));
		};

		fetchReplyComments();
	}, [comment]);

	return (
		<div className="flex gap-x-1">
			<Avatar
				onClick={() => router.push(`/profile/${comment.user.username}`)}
				className="size-7 md:size-9 cursor-pointer"
			>
				<AvatarImage src={comment.user.imageUrl || ""} />
				<AvatarFallback className="text-sm font-medium bg-purple-400">
					{comment.user.username[0].toUpperCase()}
				</AvatarFallback>
			</Avatar>

			<Card className="w-full bg-secondary border-none shadow-none hover:shadow">
				<CardContent className="p-2 text-sm">
					<Label className="mb-2">{comment.user.username.split(" ")[0]}</Label>
					<p className="px-1 text-sm">{comment.body}</p>
					<div className="flex items-center justify-between">
						<div className="flex gap-x-3 items-end">
							<Engagement
								item={comment}
								pathname={pathname}
								variant="COMMENT"
							/>

							<Button
								variant="ghost"
								onClick={() => dispatch(setRefComment(comment))}
								className="  w-8 text-muted-foreground"
							>
								Reply
							</Button>
						</div>

						<span className="text-xs text-muted-foreground">
							{moment(comment.createdAt).fromNow(true)}
						</span>
					</div>

					{replyComments?.length > 0 && (
						<Collapsible open={isOpen} onOpenChange={setIsOpen}>
							<CollapsibleTrigger asChild>
								<Button
									size="sm"
									variant="ghost"
									className="text-muted-foreground"
								>
									View {replyComments?.length} replies{" "}
									{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
								</Button>
							</CollapsibleTrigger>

							<CollapsibleContent className="space-y-2">
								{replyComments?.map((_comment) => (
									<ReplyCard key={_comment._id} replyComment={_comment} />
								))}
							</CollapsibleContent>
						</Collapsible>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

const ReplyCard = ({ replyComment: comment }: { replyComment: iComment }) => {
	const pathname = usePathname();

	return (
		<div className="">
			<UserCard _user={comment.user} variant="sm" />

			<div className="ml-4 rounded-bl-xl border-b-2 border-l-2 border-t-0 border-r-0 pl-6">
				<p className="text-sm">{comment.body}</p>

				<div className="flex items-center justify-between">
					<Engagement item={comment} pathname={pathname} variant="COMMENT" />

					<span className="text-xs text-muted-foreground">
						{moment(comment.createdAt).fromNow(true)}
					</span>
				</div>
			</div>
		</div>
	);
};
