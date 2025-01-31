import ThreadCard from "@/components/cards/ThreadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	getOtherCommunities,
	getUserCommunities,
} from "@/lib/actions/community.actions";
import { getCommunitiesThreads } from "@/lib/actions/thread.actions";
import { getActiveUser } from "@/lib/actions/user.actions";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page() {
	const user = await getActiveUser();
	const userCommunitiesIds = (await getUserCommunities(user._id!)).map(
		(community) => community._id
	);
	const otherCommunitiesIds = (await getOtherCommunities(user._id!)).map(
		(community) => community._id
	);

	const memberCommunityThreads = await getCommunitiesThreads(
		userCommunitiesIds!
	);
	const otherCommunityThreads = await getCommunitiesThreads(
		otherCommunitiesIds!
	);

	console.log(otherCommunityThreads);

	return (
		<div>
			<Tabs defaultValue="Member">
				<TabsList>
					<TabsTrigger value="Member">Member</TabsTrigger>
					<TabsTrigger value="Others">Others</TabsTrigger>
				</TabsList>

				<TabsContent value="Member" className="space-y-3">
					{memberCommunityThreads?.map((thread, i) => (
						<ThreadCard key={i} thread={thread} />
					))}
				</TabsContent>
				<TabsContent value="Others" className="space-y-3">
					{otherCommunityThreads?.map((thread, i) => (
						<ThreadCard key={i} thread={thread} />
					))}
				</TabsContent>
			</Tabs>
		</div>
	);
}
