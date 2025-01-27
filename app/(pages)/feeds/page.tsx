import ThreadCard from "@/components/cards/ThreadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	getFollowingsTreads,
	getFriendThreads,
	getThreads,
} from "@/lib/actions/thread.actions";
import {
	getActiveUser,
	getUser,
	getUserFollowings,
	getUserFriends,
	getUsers,
} from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function page() {
	const clerkUser = await currentUser();

	const user = await getActiveUser();
	const users = await getUsers();
	const threads: iThread[] = await getThreads();
	const userFollowings: string[] = await (
		await getUserFollowings(user?._id)
	).map((_user) => _user._id);
	const followingsThreads: iThread[] = await getFollowingsTreads(
		userFollowings
	);

	const UserFriends: string[] = (
		await getUserFriends(user?.followers, user?._id)
	).map((_user) => _user._id);
	const friendThreads = await getFriendThreads(UserFriends);

	return (
		<Tabs defaultValue="Fyp">
			<TabsList className=" sticky top-[3.6rem] ">
				<TabsTrigger value="Fyp">Fyp</TabsTrigger>
				<TabsTrigger value="Following">Following</TabsTrigger>
				<TabsTrigger value="Friends">Friends</TabsTrigger>
			</TabsList>

			<TabsContent value="Fyp" className="space-y-3">
				{threads?.map((thread, i) => (
					<ThreadCard key={i} thread={thread} />
				))}
			</TabsContent>

			<TabsContent value="Following" className="space-y-3">
				{followingsThreads?.map((thread, i) => (
					<ThreadCard key={i} thread={thread} />
				))}
			</TabsContent>

			<TabsContent value="Friends" className="space-y-3">
				{friendThreads?.map((thread, i) => (
					<ThreadCard key={i} thread={thread} />
				))}
			</TabsContent>
		</Tabs>
	);
}
