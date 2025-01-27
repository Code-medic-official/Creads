"use client";

import { iUser } from "@/lib/database/models/user.model";
import { messageSchema } from "@/lib/schemas/message";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Loader, Send } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { createMessage } from "@/lib/actions/message.actions";
import { useUser } from "@clerk/nextjs";

export default function ChatForm({
	friend,
	refMessageId,
	from
}: {
	friend: iUser;
	refMessageId?: string;
	from: iUser
}) {
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();

	const form = useForm<z.infer<typeof messageSchema>>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			body: "",
			from: from?._id,
			to: friend._id,
			refMessage: refMessageId ?? null,
		},
	});

	const sendMsgHandler = async (data: z.infer<typeof messageSchema>) => {
		startTransition(() => createMessage(data, pathname));

		form.reset();
	};

	return (
		<Form {...form}>
			<form
				className="flex items-center gap-x-2 "
				onSubmit={form.handleSubmit(sendMsgHandler, (err) =>
					console.error(err)
				)}
			>
				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Input
									{...field}
									placeholder="Message..."
									className="rounded-xl"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{isPending ? (
					<Button size="icon" disabled={isPending} className="rounded-xl">
						<Loader className="animate-spin" />
					</Button>
				) : (
					<Button size="icon" disabled={isPending} className="rounded-xl">
						<Send />
					</Button>
				)}
			</form>
		</Form>
	);
}
