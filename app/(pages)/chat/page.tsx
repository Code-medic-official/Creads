import ChatCard from "@/components/cards/ChatCard";
import { getActiveUser, getUser, getUserFriends } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";


export default async function page() {

	const user = await getActiveUser();

	const friends = await getUserFriends(user?.followers, user?._id);

	return (
		<div>
			<h2 className="text-xl font-medium mb-7">Chat With Friends</h2>

			<section className="space-y-3">
				{friends?.map((friend) => (
					<ChatCard key={friend._id} _user={friend} />
				))}
			</section>
		</div>
	);
}
