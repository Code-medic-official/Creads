"use client";

import { getThreadComments } from "@/lib/actions/comment.action";
import { getActiveUser } from "@/lib/actions/user.actions";
import { iComment } from "@/lib/database/models/comment.model";
import { iThread } from "@/lib/database/models/thread.model";
import { iUser } from "@/lib/database/models/user.model";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AvatarGroup from "../AvatarGroup";
import Engagement from "../Engagement";
import FollowBtn from "../FollowBtn";
import { Card, CardContent } from "../ui/card";
import UserCard from "./UserCard";

export default function ThreadCard({ thread }: { thread: iThread }) {
	const [user, setUser] = useState<iUser>();
	const [comments, setComments] = useState<iComment[]>();

	const { isLoaded } = useUser();

	const router = useRouter();
	const pathname = usePathname();


	useEffect(() => {
		const fetchActiveUser = async (): Promise<void> => {
			setUser(await getActiveUser());
		};

		const fetchThreadComment = async () => {
			setComments(await getThreadComments(thread._id));
		};

		if (!comments) fetchThreadComment();
		if (isLoaded) fetchActiveUser();
	}, [isLoaded]);

	return (
		<Card className="bg-secondary hover:shadow-md">
			<CardContent className="p-3">
				<div className="flex items-center justify-between">
					<UserCard _user={thread.user} variant="sm" />

					{thread.user._id !== user?._id && (
						<FollowBtn _user={thread.user} pathname={pathname} />
					)}
				</div>

				<div className="mt-1 ml-3 pt-2 pl-4 border-l-2 border-l-muted-foreground/20">
					<p
						onClick={() => router.push(`/thread/${thread._id}`)}
						className="text-sm cursor-pointer pl-1"
					>
						{thread.caption}
					</p>

					<div className="flex items-center justify-between">
						<Engagement item={thread} variant="THREAD" pathname={pathname} />

						<span className="text-xs text-muted-foreground">
							{/* {moment(thread.createdAt).fromNow()} */}
							{moment(thread.createdAt).format("h:ma - MMM D,YYYY")}
						</span>
					</div>
				</div>

				<AvatarGroup items={comments} />
			</CardContent>
		</Card>
	);
}
