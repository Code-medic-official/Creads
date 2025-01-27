import ThreadForm from "@/components/forms/ThreadForm";
import { getActiveUser } from "@/lib/actions/user.actions";

export default async function CreateThread({}) {

	const user = await getActiveUser();

	return (
		<div>
			<h2 className="font-semibold text-xl mb-3">CreateThread</h2>

			<ThreadForm userId={user?._id} />
		</div>
	);
}
