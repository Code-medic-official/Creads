"use client";

import { iMessage } from "@/lib/database/models/message.model";
import React, { useEffect, useState } from "react";
import MessageCard from "./cards/MessageCard";
import { getChatMessages } from "@/lib/actions/message.actions";

export default function MsgFeed({
	_messages,
	userId,
	friendId,
}: {
	_messages: iMessage[];
	userId: string;
	friendId: string;
}) {
	const [messages, setMessages] = useState<iMessage[]>(_messages);

	const fetchMessages = async () => {
		setMessages(await getChatMessages(userId, friendId));
	};

	useEffect(() => {
		const interval = setInterval(fetchMessages, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="py-10 space-y-3 min-h-[90vh]">
			{messages?.map((msg) => (
				<MessageCard key={msg._id} msg={msg} userId={userId} />
			))}
		</section>
	);
}
