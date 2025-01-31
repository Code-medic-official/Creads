import ThreadCard from "@/components/cards/ThreadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	getOtherCommunities,
	getUserCommunities,
} from "@/lib/actions/community.actions";
import { getCommunitiesThreads } from "@/lib/actions/thread.actions";
import { getActiveUser } from "@/lib/actions/user.actions";
import { OrganizationSwitcher } from "@clerk/nextjs";
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

	return (
		<div>
			<Tabs defaultValue="Member">
				<div className="flex items-center justify-between sticky top-[3.6rem] z-20">
					<TabsList className="mx-0">
						<TabsTrigger value="Member">Member</TabsTrigger>
						<TabsTrigger value="Others">Others</TabsTrigger>
					</TabsList>

					<div className="border rounded-xl shadow bg-secondary/15 backdrop-blur-md">
						<OrganizationSwitcher />
					</div>
				</div>

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
