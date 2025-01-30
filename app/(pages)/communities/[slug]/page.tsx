import { getCommunity } from "@/lib/actions/community.actions";
import React from "react";

export const dynamic = "force-dynamic";

export default async function page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const community = await getCommunity(slug);

	console.log(community);

	return <div>page</div>;
}
