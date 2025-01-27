import ChatCard from "@/components/cards/ChatCard";
import ChatForm from "@/components/forms/ChatForm";

import { getChatMessages } from "@/lib/actions/message.actions";
import { getActiveUser, getUser } from "@/lib/actions/user.actions";
import React from "react";
import { ChevronLeft, Menu, MenuIcon, Scroll } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MessageCard from "@/components/cards/MessageCard";
import { currentUser } from "@clerk/nextjs/server";
import { pusherClient, pusherServer } from "@/lib/pusher";
import { iMessage } from "@/lib/database/models/message.model";

export default async function page({
	params,
}: {
	params: Promise<{ username: string }>;
}) {
	const { username } = await params;

	const user = await getActiveUser();

	const friend = await getUser(username);
	const messages = await getChatMessages(user?._id, friend._id);

	const refreshMessagesHandler = (newMsg: iMessage) => {
		console.log("refreshing");

		const existingMsg = messages.find((msg) => msg._id === newMsg._id);

		if (!existingMsg) messages.push(newMsg);
	};

	// Pusher
	// pusherClient.subscribe("user._id");
	// pusherClient.bind("message:new", refreshMessagesHandler);
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
