"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
	getReplyComments,
	getThreadComments,
} from "@/lib/actions/comment.action";
import { iComment } from "@/lib/database/models/comment.model";
import { iThread } from "@/lib/database/models/thread.model";

export default function AvatarGroup({
	items,
}: {
	items: iComment[] | undefined;
}) {

	// useEffect(() => {
	// 	const fetchReplyComment = async () => {
	// 		setItems(await getReplyComments(itemId));
	// 	};

	// 	if (variant === "THREAD" && !items) {
	// 		fetchThreadComment();
	// 	} else if (variant === "COMMENT" && !items) {
	// 		fetchReplyComment();
	// 	}
	// }, [itemId, variant]);

	const getUserReplies = () => {
		const users = items?.map((item) => item.user);

		return users?.filter(
			(user, i, arr) => i === arr.findIndex((_user) => _user._id === user._id)
		);
	};

	if (!items) return;

	return (
		<div className="flex items-center ml-2 gap-1">
			{getUserReplies()
				?.slice(0, 3)
				.map((user, i) => (
					<Avatar key={i} className="size-7 md:size-9 -ml-3 border">
						<AvatarImage src={user.imageUrl || ""} />
						<AvatarFallback className="text-sm font-medium bg-purple-400">
							{user.username[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				))}

			{items.length > 0 && (
				<span className="text-xs font-medium text-muted-foreground">
					{items.length} replies
				</span>
			)}
		</div>
	);
}
