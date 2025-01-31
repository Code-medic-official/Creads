import UserCard from "@/components/cards/UserCard";
import ProfileFeeds from "@/components/ProfileFeeds";
import { getUserComments } from "@/lib/actions/comment.action";
import { getUserThreads } from "@/lib/actions/thread.actions";
import { getUser, getUserFollowings } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export default async function page({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;
	const clerkUser = await currentUser();

	const _user = await getUser(username ?? clerkUser!.username);
	const followings = await getUserFollowings(_user._id!);

	const feeds = await getUserThreads(_user._id!);
	const replies = await getUserComments(_user._id!);

	return (
		<div>
			<UserCard _user={_user} variant="profile" followings={followings} />

			<div className="mt-4">
				<ProfileFeeds feeds={feeds} replies={replies} />
			</div>
		</div>
	);
}
