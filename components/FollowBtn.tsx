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
	const [_userFollowers, _setUserFollowers] = useState<string[]>(
		_user.followers.map((follower) => follower._id)
	);
	const [isPending, startTransition] = useTransition();
	const [user, setUser] = useState<iUser>();
	const pathname = usePathname();
	const { isLoaded } = useUser();

	useEffect(() => {
		setIsFollowing(!!_userFollowers.find((userId) => userId == user?._id));

		const fetchActiveUser = async (): Promise<void> => {
			setUser(await getActiveUser());
		};

		if (isLoaded && !user) fetchActiveUser();
	}, [_user, isLoaded, user?._id, `${_userFollowers}`]);

	const followHandler = async (action: "FOLLOW" | "UNFOLLOW") => {
		if (action === "FOLLOW") {
			const updatedList: string[] = [..._userFollowers, user?._id];
			_setUserFollowers(updatedList);

			await upsertUser({ ..._user, followers: updatedList }, pathname);
		} else {
			const updatedList: string[] = _userFollowers.filter(
				(followerId) => followerId !== user?._id
			);
			_setUserFollowers(updatedList);

			await upsertUser({ ..._user, followers: updatedList }, pathname);
		}
	};

	if (!user || isFollowing === undefined)
		return <Skeleton className="w-20 h-6 rounded-3xl" />;

	return (
		<>
			{isFollowing ? (
				<Button
					size="sm"
					variant="ghost"
					disabled={isPending}
					onClick={() => followHandler(isFollowing ? "UNFOLLOW" : "FOLLOW")}
					className="rounded-2xl text-muted-foreground hover:text-primary"
				>
					Unfollow
					<UserMinus2 />
					{/* {isPending ? <Loader2 className="animate-spin" /> : <UserMinus2 />} */}
				</Button>
			) : (
				<Button
					size="sm"
					disabled={isPending}
					onClick={() => followHandler(isFollowing ? "UNFOLLOW" : "FOLLOW")}
					className="rounded-2xl"
				>
					Follow
					<Plus />
					{/* {isPending ? <Loader2 className="animate-spin" /> : <Plus />} */}
				</Button>
			)}
		</>
	);
}
