"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { commentSchema } from "@/lib/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader, Send } from "lucide-react";
import toast from "react-hot-toast";
import { createComment } from "@/lib/actions/comment.action";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { refCommentSelector } from "@/lib/features/commentSlice";
import { setRefComment } from "@/Features/commentSlice";
import { iUser } from "@/lib/database/models/user.model";

export default function CommentForm({
	threadId,
	user,
}: {
	threadId: string;
	user: iUser;
}) {
	const [isPending, startTransition] = useTransition();
	// const [user, setUser] = useState<iUser>();

	const refComment = useAppSelector(refCommentSelector);
	const dispatch = useAppDispatch();
	const currentPath = usePathname();



	const form = useForm<z.infer<typeof commentSchema>>({
		resolver: zodResolver(commentSchema),
		defaultValues: {
			body: "",
			refComment: refComment?._id || null,
			thread: threadId,
			user: user._id,
		},
	});

	const createCommentHandler = async (
		data: z.infer<typeof commentSchema>
	): Promise<void> => {
		startTransition(() =>
			createComment(
				{ ...data, refComment: refComment?._id || null },
				currentPath
			)
		);

		dispatch(setRefComment(null));
		form.reset();
		toast.success("Comment posted");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(createCommentHandler, (err) =>
					console.error(err)
				)}
				className="flex items-center gap-x-2 border-y-2 bg-secondary"
			>
				<FormField
					control={form.control}
					name="body"
					render={({ field }) => (
						<FormItem className="flex-1 ">
							<FormControl>
								<Textarea
									// rows={0.5}
									{...field}
									className="rounded-2xl !h-5 border-none !outline-none focus-visible:ring-0"
									placeholder={
										refComment
											? `Replying to @${
													refComment.user.username.toLowerCase().split(" ")[0]
											  }...`
											: "Add comment..."
									}
								></Textarea>
							</FormControl>
						</FormItem>
					)}
				/>
				{isPending ? (
					<Button disabled size="icon">
						<Loader className="animate-spin" />
					</Button>
				) : (
					<Button size="icon">
						<Send />
					</Button>
				)}
			</form>
		</Form>
	);
}
