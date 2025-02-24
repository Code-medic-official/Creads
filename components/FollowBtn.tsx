"use client";

import { getActiveUser, upsertUser } from "@/lib/actions/user.actions";
import { iUser } from "@/lib/database/models/user.model";
import { useUser } from "@clerk/nextjs";
import { Loader2, Plus, UserMinus2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { usePathname } from "next/navigation";

export default function FollowBtn({ _user }: { _user: iUser }) {
	const [isFollowing, setIsFollowing] = useState<boolean>();
	const [isPending, startTransition] = useTransition();
	const [user, setUser] = useState<iUser>();
	const pathname = usePathname();
	const { isLoaded } = useUser();

	const _userFollowers: string[] = _user.followers.map(
		(follower) => follower._id
	);

	useEffect(() => {
		setIsFollowing(!!_userFollowers.find((userId) => userId == user?._id));

		const fetchActiveUser = async (): Promise<void> => {
			setUser(await getActiveUser());
		};

		if (isLoaded && !user) fetchActiveUser();
	}, [_user, isLoaded, user?._id]);

	const followHandler = async (action: "FOLLOW" | "UNFOLLOW") => {
		if (action === "FOLLOW") {
			startTransition(
				async () =>
					await upsertUser(
						{ ..._user, followers: [..._userFollowers, user?._id] },
						pathname
					)
			);
		} else {
			startTransition(
				async () =>
					await upsertUser(
						{
							..._user,
							followers: _userFollowers.filter(
								(followerId) => followerId !== user?._id
							),
						},
						pathname
					)
			);
		}
	};

	// console.log(!isLoaded && !user)
	if (isFollowing === undefined)
		return <Skeleton className="w-20 h-6 rounded-3xl" />;

	return (
		<>
			{isFollowing ? (
				<Button
					size="sm"
					variant="outline"
					disabled={isPending}
					onClick={() => followHandler(isFollowing ? "UNFOLLOW" : "FOLLOW")}
					className="rounded-2xl"
				>
					Unfollow
					{isPending ? <Loader2 className="animate-spin" /> : <UserMinus2 />}
				</Button>
			) : (
				<Button
					size="sm"
					disabled={isPending}
					onClick={() => followHandler(isFollowing ? "UNFOLLOW" : "FOLLOW")}
					className="rounded-2xl"
				>
					Follow
					{isPending ? <Loader2 className="animate-spin" /> : <Plus />}
				</Button>
			)}
		</>
	);
}
