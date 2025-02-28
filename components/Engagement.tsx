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
import { usePathname } from "next/navigation";

export default function Engagement({
	item,
	variant,
}: {
	item: iThread | iComment;
	variant: "THREAD" | "COMMENT";
}) {
	const [hasLiked, setHasLiked] = useState<boolean>(false);
	const [hasDisliked, setHasDisliked] = useState<boolean>(false);
	const [itemLikes, setItemLikes] = useState<string[]>(item.likes);
	const [itemDislikes, setItemDisLikes] = useState<string[]>(item.dislikes);
	const pathname = usePathname();

	const { isLoaded } = useUser();

	const [user, setUser] = useState<iUser>();

	useEffect(() => {
		setHasLiked(!!itemLikes.find((userId) => userId === user?._id));
		setHasDisliked(!!itemDislikes.find((userId) => userId === user?._id));

		const fetchActiveUser = async (): Promise<void> => {
			setUser(await getActiveUser());
		};

		if (isLoaded && !user) fetchActiveUser();
	}, [item, isLoaded, user?._id, itemLikes, itemDislikes]);

	const likeHandler = async (): Promise<void> => {
		const likesUpdate = hasLiked
			? itemLikes.filter((userId) => userId !== user?._id)
			: [...itemLikes, user?._id];

		// ! Manualy update item likes
		setItemLikes(likesUpdate!);

		if (variant === "COMMENT") {
			return await upsertComment(
				{ ...item, likes: likesUpdate } as iComment,
				pathname
			);
		} else {
			return await upsertThread(
				{ ...item, likes: likesUpdate } as iThread,
				pathname
			);
		}
	};

	const dislikeHandler = async (): Promise<void> => {
		const dislikesUpdate = hasDisliked
			? itemDislikes.filter((userId) => userId !== user?._id)
			: [...itemDislikes, user?._id];

		// ! Manually update item Dislikes
		setItemDisLikes(dislikesUpdate);

		if (variant === "COMMENT") {
			return await upsertComment(
				{ ...item, dislikes: dislikesUpdate } as iComment,
				pathname
			);
		} else {
			return await upsertThread(
				{ ...item, dislikes: dislikesUpdate } as iThread,
				pathname
			);
		}
	};

	return (
		<div className="mt-3 space-x-2">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						disabled={hasDisliked}
						variant="ghost"
						onClick={likeHandler}
						className=" w-8 text-muted-foreground"
					>
						<ThumbsUp
							fill={hasLiked ? "#874ced" : "transparent"}
						/>
						{itemLikes.length}
					</Button>
				</TooltipTrigger>

				<TooltipContent>Like</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						disabled={hasLiked}
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
