"use client";

import { upsertComment } from "@/lib/actions/comment.action";
import { upsertThread } from "@/lib/actions/thread.actions";
import { getActiveUser } from "@/lib/actions/user.actions";
import { iComment } from "@/lib/database/models/comment.model";
import { iThread } from "@/lib/database/models/thread.model";
import { iUser } from "@/lib/database/models/user.model";
import { useUser } from "@clerk/nextjs";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function Engagement({
	item,
	variant,
	pathname,
}: {
	item: iThread | iComment;
	variant: "THREAD" | "COMMENT";
	pathname: string;
}) {
	const [isPending, startTransition] = useTransition();
	const [hasLiked, setHasLiked] = useState<boolean>(false);
	const [hasDisliked, setHasDisliked] = useState<boolean>(false);

	const { isLoaded } = useUser();

	const [user, setUser] = useState<iUser>();


	const itemLikes: string[] = item.likes;
	const itemDislikes: string[] = item.dislikes;

	useEffect(() => {
		setHasLiked(!!itemLikes.find((userId) => userId === user?._id));
		setHasDisliked(!!itemDislikes.find((userId) => userId === user?._id));

		const fetchActiveUser = async (): Promise<void> => {
			setUser(await getActiveUser());
		};

		if (isLoaded) fetchActiveUser();
	}, [item, isLoaded, user?._id]);

	const likeHandler = async (): Promise<void> => {
		const likesUpdate = hasLiked
			? itemLikes.filter((userId) => userId !== user?._id)
			: [...itemLikes, user?._id];

		startTransition(() => {
			if (variant === "COMMENT") {
				return upsertComment(
					{ ...item, likes: likesUpdate } as iComment,
					pathname
				);
			} else {
				return upsertThread(
					{ ...item, likes: likesUpdate } as iThread,
					pathname
				);
			}
		});
	};

	const dislikeHandler = async (): Promise<void> => {
		const dislikesUpdate = hasDisliked
			? itemDislikes.filter((userId) => userId !== user?._id)
			: [...itemDislikes, user?._id];

		startTransition(() => {
			if (variant === "COMMENT") {
				return upsertComment(
					{ ...item, dislikes: dislikesUpdate } as iComment,
					pathname
				);
			} else {
				return upsertThread(
					{ ...item, dislikes: dislikesUpdate } as iThread,
					pathname
				);
			}
		});
	};

	return (
		<div className="mt-3 space-x-2">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						disabled={isPending || hasDisliked}
						variant="ghost"
						onClick={likeHandler}
						className=" w-8 text-muted-foreground"
					>
						<ThumbsUp fill={hasLiked ? "#874ced" : "#ffffff00"} />
						{itemLikes.length}
					</Button>
				</TooltipTrigger>

				<TooltipContent>Like</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						disabled={isPending || hasLiked}
						variant="ghost"
						onClick={dislikeHandler}
						className="  w-8 text-muted-foreground"
					>
						<ThumbsDown fill={hasDisliked ? "#bbb" : "#ffffff00"} />
						{itemDislikes.length}
					</Button>
				</TooltipTrigger>

				<TooltipContent>Dislike</TooltipContent>
			</Tooltip>
		</div>
	);
}
