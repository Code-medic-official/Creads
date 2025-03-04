"use client";

import { setRefComment } from "@/Features/commentSlice";
import { createComment } from "@/lib/actions/comment.action";
import { iUser } from "@/lib/database/models/user.model";
import { refCommentSelector } from "@/lib/features/commentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { commentSchema } from "@/lib/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";

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
		startTransition(
			async () =>
				await createComment(
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
									{...field}
									className="rounded-2xl !h-5 border-none shadow-none !outline-none focus-visible:ring-0"
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
