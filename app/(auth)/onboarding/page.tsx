import UserForm from "@/components/forms/UserForm";
import { getActiveUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function page() {
	const user = await getActiveUser();

	// if (user.onboarded) redirect("/feeds");

	return (
		<div>
			<h1 className="font-semibold text-xl mb-5 ">Onboarding</h1>
			<h3>Complete your profile to Use Threads</h3>
			<UserForm user={user} />
		</div>
	);
}
