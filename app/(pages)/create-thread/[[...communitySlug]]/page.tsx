import ThreadForm from "@/components/forms/ThreadForm";
import { getCommunity } from "@/lib/actions/community.actions";
import { getActiveUser } from "@/lib/actions/user.actions";

export const dynamic = "force-dynamic";

export default async function page({params}: {params: Promise<{communitySlug: string[]}>}) {
	const user = await getActiveUser();
	const {communitySlug} = await params
	const community = await getCommunity(communitySlug[0])


	return (
		<div>
			<h2 className="font-semibold text-xl mb-3">CreateThread</h2>

			<ThreadForm userId={user?._id} community={community} />
		</div>
	);
}
