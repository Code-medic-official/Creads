"use client";

import { getActiveUser, upsertUser } from "@/lib/actions/user.actions";
import { iUser } from "@/lib/database/models/user.model";
import { cn } from "@/lib/utils";
import { Ban } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export default function BlockBtn({ _user }: { _user: iUser }) {
	const [isBlocked, setIsBlocked] = useState<boolean>();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const [user, setUser] = useState<iUser>();

	const blockList: string[] = user?.blockList?.map((user_) => user_._id) ?? [];

	useEffect(() => {
		setIsBlocked(!!blockList.find((userId) => userId === _user._id));
						
		const fetchActiveUser = async (): Promise<void> => {  
			setUser(await getActiveUser());
		};

		if(!user) fetchActiveUser();
	}, [blockList]);

	const blockHandler = () => {
		startTransition(() =>
			upsertUser({ ...user, blockList: [...blockList, _user?._id] }, pathname)
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
					...user,
					blockList: blockList.filter((userId) => userId !== _user?._id),
				} as iUser,
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
