import ThreadCard from "@/components/cards/ThreadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Void from "@/components/Void";
import { getCommunities } from "@/lib/actions/community.actions";
import {
	getFollowingsTreads,
	getFriendThreads,
	getThreads,
} from "@/lib/actions/thread.actions";
import {
	getActiveUser,
	getUserFollowings,
	getUserFriends,
	getUsers,
} from "@/lib/actions/user.actions";
import { iThread } from "@/lib/database/models/thread.model";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "FYP",
	description:
		"Creads is a revolutionary social media platform designed to connect people through creativity, collaboration, and community. Explore our Final Year Project (FYP) to learn how we're redefining social interactions.",
	keywords: [
		"Creads",
		"social media app",
		"FYP project",
		"creative social network",
		"community building",
		"social media platform",
		"Next.js social media app",
		"Final Year Project",
		"social media innovation",
	],
};

export default async function page() {
	const user = await getActiveUser();
	const users = await getUsers();
	const communities = await getCommunities();

	if (users && communities) console.log("users & communities fetched");

	const threads: iThread[] = await getThreads();
	const userFollowings: string[] = (await (
		await getUserFollowings(user?._id)
	).map((_user) => _user?._id)) as string[];
	const followingsThreads: iThread[] = await getFollowingsTreads(
		userFollowings
	);

	const UserFriends: string[] = (
		await getUserFriends(user.followers as string[], user?._id)
	).map((_user) => _user?._id) as string[];
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
				{followingsThreads.length > 0 ? (
					followingsThreads?.map((thread, i) => (
						<ThreadCard key={i} thread={thread} />
					))
				) : (
					<Void msg="Follow people to see their threads🤗" />
				)}
			</TabsContent>

			<TabsContent value="Friends" className="space-y-3">
				{friendThreads.length > 0 ? (
					friendThreads?.map((thread, i) => (
						<ThreadCard key={i} thread={thread} />
					))
				) : (
					<Void msg="You make friends by following each other👯." />
				)}
			</TabsContent>
		</Tabs>
	);
}
