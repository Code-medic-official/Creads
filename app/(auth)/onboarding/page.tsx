import UserForm from "@/components/forms/UserForm";
import { getActiveUser, getUser } from "@/lib/actions/user.actions";
import { currentUser, User } from "@clerk/nextjs/server";
import React from "react";

export default async function Onboarding() {
	const clerkUser = (await currentUser()) as User;

	const user = await getActiveUser();

	return (
		<div>
			<h1 className="font-semibold text-xl mb-5 ">Onboarding</h1>
			<h3>Complete your profile to Use Threads</h3>
			<UserForm user={user} />
		</div>
	);
}
