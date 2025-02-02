"use client";

import { getActiveUser } from "@/lib/actions/user.actions";
import { iUser } from "@/lib/database/models/user.model";
import { useUser } from "@clerk/nextjs";
import { EditIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BlockBtn from "../BlockBtn";
import FollowBtn from "../FollowBtn";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function UserCard({
	variant,
	_user,
	followings,
}: {
	variant: "sm" | "md" | "lg" | "profile";
	_user: iUser;
	followings?: iUser[];
}) {
	const [user, setUser] = useState<iUser>();

	const { isLoaded } = useUser();

	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const fetchActiveUser = async (): Promise<void> => {
			setUser(await getActiveUser());
		};

		if (isLoaded && !user) fetchActiveUser();
	}, [isLoaded]);

	if (variant === "sm") {
		return (
			<Tooltip>
				<TooltipTrigger>
					<div
						onClick={() => router.push(`/profile/${_user.username}`)}
						className="flex items-center gap-1"
					>
						<Avatar className="size-8  md:size-10">
							<AvatarImage src={_user?.imageUrl || ""} />
							<AvatarFallback className="bg-[#d15cec] text-sm font-bold">
								{_user?.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<span className="font-medium ">
							{_user?.username.split(" ")[0]}
						</span>
					</div>
				</TooltipTrigger>
				<TooltipContent>View profile</TooltipContent>
			</Tooltip>
		);
	} else if (variant === "profile") {
		return (
			<section>
				<div className="flex items-center justify-between relative">
					<div className="flex items-center gap-x-3">
						<Avatar className="size-24  md:size-28 border">
							<AvatarImage src={_user.imageUrl || ""} />
							<AvatarFallback className="bg-[#d559da] text-2xl font-medium">
								{_user.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="leading-3">
							<p className="text-xl font-bold">{_user?.username}</p>
							<span className="font-medium text-muted-foreground text-sm">
								@{_user?.username.toLowerCase().split(" ")[0]}
							</span>
							<p className="font-medium text-muted-foreground text-sm">
								{_user?.emailAdress}
							</p>

							<div className="flex items-center mt-2">
								<Button
									size="sm"
									variant="ghost"
									className="p-1 text-muted-foreground"
								>
									<span className="font-semibold text-foreground">
										{followings.length}
									</span>
									<span>Following</span>
								</Button>
								<Button
									size="sm"
									variant="ghost"
									className="p-1 text-muted-foreground "
								>
									<span className="font-semibold text-foreground">
										{_user?.followers.length}
									</span>
									<span>Followers</span>
								</Button>
							</div>
						</div>
					</div>

					<div className="">
						{_user._id === user?._id ? (
							<Button size="icon">
								<EditIcon />
							</Button>
						) : (
							<>
								<div className="absolute top-0 right-0">
									<FollowBtn _user={_user} pathname={pathname} />
								</div>
								<div className="absolute bottom-4 right-0">
									<BlockBtn _user={_user} />
								</div>
							</>
						)}
					</div>
				</div>

				<p className="text-sm mt-3">{_user?.bio}</p>
			</section>
		);
	} else if (variant === "md") {
		return (
			<Tooltip>
				<TooltipTrigger>
					<div
						onClick={() => router.push(`/profile/${_user.username}`)}
						className="flex items-center gap-x-1"
					>
						<Avatar className="size-12  md:size-14">
							<AvatarImage src={_user.imageUrl} />
							<AvatarFallback className="bg-[#d15cec] text-sm font-bold">
								{_user?.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="text-start">
							<p className="font-medium">{_user?.username.split(" ")[0]}</p>
							<p className="text-sm text-muted-foreground">{_user?.bio}</p>
						</div>
					</div>
				</TooltipTrigger>
				<TooltipContent>View profile</TooltipContent>
			</Tooltip>
		);
	} else if (variant === "lg") {
		return (
			<Card className="rounded-2xl shadow-non hover:shadow ">
				<CardContent className="p-2 flex items-center justify-between">
					<div
						onClick={() => router.push(`/profile/${_user.username}`)}
						className="flex-1 flex items-center gap-1 cursor-pointer"
					>
						<Avatar className="size-16  md:size-20">
							<AvatarImage src={_user?.imageUrl || ""} />
							<AvatarFallback className="bg-[#aa50ff] text-xl font-medium">
								{_user?.username[0].toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="leading-3">
							<p className="font-bold md:font-medium  md:text-xl">
								{_user?.username}
							</p>
							<p className="text-sm text-muted-foreground">
								@{_user?.username.toLowerCase().split(" ")[0]}
							</p>
							<p className="text-xs">
								<span className="text-primary font-medium">
									{_user.followers.length}
								</span>{" "}
								Followers
							</p>
						</div>
					</div>

					<div className="flex flex-col items-end gap-2">
						{_user._id === user?._id ? (
							<Button size="icon">
								<EditIcon />
							</Button>
						) : (
							<>
								<FollowBtn _user={_user} pathname={pathname} />
								<BlockBtn _user={_user} />
							</>
						)}
					</div>
				</CardContent>
			</Card>
		);
	}
	// return <div>Medium</div>;
}
