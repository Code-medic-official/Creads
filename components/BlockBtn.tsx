"use client";

import { getActiveUser, upsertUser } from "@/lib/actions/user.actions";
import { iUser } from "@/lib/database/models/user.model";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Ban } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export default function BlockBtn({
	_user,
}: {
	_user: iUser;
}) {
	const [isBlocked, setIsBlocked] = useState<boolean>();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const [user, setUser] = useState<iUser>();

	const { isLoaded } = useUser();

	const blockList: string[] = user?.blockList?.map((_user) => _user._id) ?? [];

	useEffect(() => {
		setIsBlocked(!!blockList.find((userId) => userId === user?._id));

		const fetchActiveUser = async (): Promise<void> => {
			setUser(await getActiveUser());
		};

		if (isLoaded) fetchActiveUser();
	}, [isLoaded]);

	const blockHandler = async () => {
		startTransition(() =>
			upsertUser({ ..._user, blockList: [...blockList, _user?._id] }, pathname)
		);

		toast(
			`@${
				_user.username.toLowerCase().split(" ")[0]
			} BLOCKED. You will no-longer see threads from this account.`,
			{ icon: "🛑" }
		);
	};

	const unblockHandler = async () => {
		startTransition(() =>
			upsertUser(
				{
					..._user,
					blockList: blockList.filter((userId) => userId !== user?._id),
				},
				pathname
			)
		);

		toast.success(
			`You just unblocked @${_user.username.toLowerCase().split(" ")[0]}`
		);
	};

	return (
		<>
			{isBlocked ? (
				<Button
					size="sm"
					disabled={isPending}
					variant="secondary"
					onClick={unblockHandler}
					className="text-destructive rounded-2xl"
				>
					unblock
					<Ban className={cn(isPending && "animate-spin")} />
				</Button>
			) : (
				<Button
					size="sm"
					disabled={isPending}
					variant="secondary"
					onClick={blockHandler}
					className="text-destructive rounded-2xl"
				>
					Block
					<Ban className={cn(isPending && "animate-spin")} />
				</Button>
			)}
		</>
	);
}
