"use client";

import { iUser } from "@/lib/database/models/user.model";
import { useAuth } from "@clerk/nextjs";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useState } from "react";
import UserCard from "./cards/UserCard";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Void from "./Void";

export default function PopularityList({
	userId,
	variant,
	followers,
	following,
	blockList,
}: {
	userId: string;
	variant: "FOLLOWING" | "FOLLOWERS";
	followers: iUser[];
	following: iUser[];
	blockList: iUser[];
}) {
	const isGtSmScreen = useMediaQuery("(min-width: 640px)");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	if (isGtSmScreen) {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					{variant === "FOLLOWING" ? (
						<Button
							size="sm"
							onClick={() => setIsOpen(true)}
							variant="ghost"
							className="p-1 text-muted-foreground "
						>
							<span className="font-semibold text-foreground">
								{following.length}
							</span>
							<span>Following</span>
						</Button>
					) : (
						<Button
							size="sm"
							onClick={() => setIsOpen(true)}
							variant="ghost"
							className="p-1 text-muted-foreground "
						>
							<span className="font-semibold text-foreground">
								{followers.length}
							</span>
							<span>Followers</span>
						</Button>
					)}
				</DialogTrigger>

				<DialogContent>
					<div className="hidden">
						<DialogTitle>Popularity Lists</DialogTitle>
					</div>
					<ListContent
						userId={userId}
						blockList={blockList}
						followers={followers}
						following={following}
						variant={variant}
					/>
				</DialogContent>
			</Dialog>
		);
	} else {
		return (
			<Drawer open={isOpen} onOpenChange={setIsOpen}>
				<DrawerTrigger asChild>
					{variant === "FOLLOWING" ? (
						<Button
							size="sm"
							variant="ghost"
							onClick={() => setIsOpen(true)}
							className="p-1 text-muted-foreground"
						>
							<span className="font-semibold text-foreground">
								{following.length}
							</span>
							<span>Following</span>
						</Button>
					) : (
						<Button
							size="sm"
							onClick={() => setIsOpen(true)}
							variant="ghost"
							className="p-1 text-muted-foreground "
						>
							<span className="font-semibold text-foreground">
								{followers.length}
							</span>
							<span>Followers</span>
						</Button>
					)}
				</DrawerTrigger>
				<DrawerContent className="p-3">
					<div className="hidden">
						<DrawerTitle>Popularity Lists</DrawerTitle>
					</div>
					<ListContent
						userId={userId}
						blockList={blockList}
						followers={followers}
						following={following}
						variant={variant}
					/>
				</DrawerContent>
			</Drawer>
		);
	}
}

const ListContent = ({
	userId,
	variant,
	followers,
	following,
	blockList,
}: {
	userId: string;

	variant: "FOLLOWING" | "FOLLOWERS";
	followers: iUser[];
	following: iUser[];
	blockList: iUser[];
}) => {
	const { userId: userClkId } = useAuth();
	return (
		<Tabs defaultValue={variant}>
			<TabsList className="my-3 sticky top-2">
				<TabsTrigger value="FOLLOWERS">
					<div className="flex items-center">
						<span className="text-xs sm:text-sm md:text-base">Followers</span>
						<Badge variant="secondary" className="text-primary text-xs ml-1">
							{followers?.length}
						</Badge>
					</div>
				</TabsTrigger>
				<TabsTrigger value="FOLLOWING">
					<div className="flex items-center">
						<span className="text-xs sm:text-sm md:text-base">Following</span>
						<Badge variant="secondary" className="text-primary text-xs ml-1">
							{following?.length}
						</Badge>
					</div>
				</TabsTrigger>
				{userClkId === userId && (
					<TabsTrigger value="BLOCKED">
						<div className="flex items-center">
							<span className="text-xs sm:text-sm md:text-base">Blocked</span>
							<Badge variant="secondary" className="text-primary text-xs ml-1">
								{blockList?.length}
							</Badge>
						</div>
					</TabsTrigger>
				)}
			</TabsList>

			<TabsContent value="FOLLOWERS" className="space-y-2">
				{followers?.length > 0 ? (
					followers.map((user) => (
						<UserCard key={user._id} _user={user} variant="lg" />
					))
				) : (
					<Void msg="No followers yet😢" />
				)}
			</TabsContent>

			<TabsContent value="FOLLOWING" className="space-y-2">
				{following?.length > 0 ? (
					following.map((user) => (
						<UserCard key={user._id} _user={user} variant="lg" />
					))
				) : (
					<Void msg="U gotta follow more people👀 Don't be selfish🤣" />
				)}
			</TabsContent>

			<TabsContent value="BLOCKED" className="space-y-2">
				{blockList?.length > 0 ? (
					blockList.map((user) => (
						<UserCard key={user._id} _user={user} variant="lg" />
					))
				) : (
					<Void msg="You have have no enemies, YET❗Keep up😉" />
				)}
			</TabsContent>
		</Tabs>
	);
};
