import CommunityCard from "@/components/cards/CommunityCard";
import ProfileFeeds from "@/components/ProfileFeeds";
import { getCommunityComments } from "@/lib/actions/comment.action";
import { getCommunity } from "@/lib/actions/community.actions";
import { getCommunityThreads } from "@/lib/actions/thread.actions";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const community = await getCommunity(slug);

	const feeds = await getCommunityThreads(community._id!);
	const replies = await getCommunityComments(community._id!);

	console.log(replies)

	return (
		<div>
			<section>
				<CommunityCard community={community} variant="lg" isMember />
			</section>

			<section className="mt-4" >
				<ProfileFeeds feeds={feeds} replies={replies} />
			</section>
		</div>
	);
}
