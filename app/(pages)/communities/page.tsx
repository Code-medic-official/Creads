import ThreadCard from "@/components/cards/ThreadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Void from "@/components/Void";
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
		(community): string => community._id!
	);
	const otherCommunitiesIds = (await getOtherCommunities(user._id!)).map(
		(community): string => community._id!
	);

	const memberCommunityThreads = await getCommunitiesThreads(
		userCommunitiesIds
	);
	const otherCommunityThreads = await getCommunitiesThreads(
		otherCommunitiesIds
	);

	return (
		<div>
			<Tabs defaultValue="Member">
				<TabsList className="sticky top-[3.7rem]" >
					<TabsTrigger value="Member">Member</TabsTrigger>
					<TabsTrigger value="Others">Others</TabsTrigger>
				</TabsList>

				<TabsContent value="Member" className="space-y-3">
					{memberCommunityThreads?.length > 0 ? (
						memberCommunityThreads?.map((thread, i) => (
							<ThreadCard key={i} thread={thread} />
						))
					) : (
						<Void msg="Looks like you're not part of any community yet😢. Please considure joining one to see their Posts🤗" />
					)}
				</TabsContent>
				<TabsContent value="Others" className="space-y-3">
					{otherCommunityThreads?.length > 0 ? (
						otherCommunityThreads?.map((thread, i) => (
							<ThreadCard key={i} thread={thread} />
						))
					) : (
						<Void msg="It's feeling quite out here🦗😂" />
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
