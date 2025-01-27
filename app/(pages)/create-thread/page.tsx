import ThreadForm from "@/components/forms/ThreadForm";
import { getActiveUser, getUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function CreateThread({}) {
	const clerkUser = await currentUser();

	const user = await getActiveUser();

	return (
		<div>
			<h2 className="font-semibold text-xl mb-3">CreateThread</h2>

			<ThreadForm userId={user?._id} />
		</div>
	);
}
