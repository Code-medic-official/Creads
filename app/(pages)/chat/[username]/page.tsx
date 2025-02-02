import ChatCard from "@/components/cards/ChatCard";
import ChatForm from "@/components/forms/ChatForm";
import MessageCard from "@/components/cards/MessageCard";
import { Button } from "@/components/ui/button";
import { getChatMessages } from "@/lib/actions/message.actions";
import { getActiveUser, getUser } from "@/lib/actions/user.actions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const revalidate = 3;

export default async function page({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;

	const user = await getActiveUser();

	const friend = await getUser(username);
	const messages = await getChatMessages(user._id!, friend._id!);

	return (
		<div className="relative">
			<section className="-mt-3 sticky top-[3.6rem] z-10">
				<ChatCard _user={friend} variant="header" />
			</section>
			<section className="py-10 space-y-3 min-h-[90vh]">
				{messages?.map((msg) => (
					<MessageCard key={msg._id} msg={msg} />
				))}
			</section>
			<section className="sticky bottom-1">
				<Link href="/chat/" className="absolute -top-10 right-0">
					<Button
						size="icon"
						variant="outline"
						className=" text-muted-foreground hover:text-primary bg-background/40 backdrop-blur-md"
					>
						<ChevronLeft />
					</Button>
				</Link>
				<ChatForm from={user} friend={friend} />
			</section>
		</div>
	);
}
