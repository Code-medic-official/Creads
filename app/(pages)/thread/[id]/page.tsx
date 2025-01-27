import ThreadCard from "@/components/cards/ThreadCard";
import Comments from "@/components/Comments";
import { getThread } from "@/lib/actions/thread.actions";
import { iThread } from "@/lib/database/models/thread.model";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export default async function page({ params }: { params: { id: string } }) {
	const { id } = await params;

	const thread: iThread = await getThread(id);

	if (thread === null) {
		toast.error("Thread not found😢");
		redirect("/feeds");
	}

	return (
		<div>
			<ThreadCard thread={thread} />

			<div className="mt-4">
				<Comments threadId={id} />
			</div>
		</div>
	);
}
