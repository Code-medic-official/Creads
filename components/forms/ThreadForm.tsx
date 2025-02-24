"use client";

import { THREAD_PRIVACY } from "@/constants";
import { createThread } from "@/lib/actions/thread.actions";
import { iCommunity } from "@/lib/database/models/community.model";
import { iThread, ThreadPrivacy } from "@/lib/database/models/thread.model";
import { threadSchema } from "@/lib/schemas/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, Loader, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import CommunityCard from "../cards/CommunityCard";

export default function ThreadForm({
	variant = "CREATE",
	thread,
	userId,
	community = null,
}: {
	variant?: "CREATE" | "UPDATE";
	thread?: iThread;
	userId: string;
	community?: iCommunity | null;
	// isOpen: boolean;
	// setIsOpen: (prev?) => boolean;
}) {
	const [isPending, startTransition] = useTransition();

	const [img, setImg] = useState("");
	const router = useRouter();

	const fileBtn = useRef(null);

	const form = useForm<z.infer<typeof threadSchema>>({
		resolver: zodResolver(threadSchema),
		defaultValues: {
			caption: thread?.caption ?? "",
			image: thread?.image ?? img,
			privacy: thread?.privacy ?? ThreadPrivacy.PUBLIC,
			user: userId,
			community: community?._id,
		},
	});

	const createThreadHandler = async (
		data: z.infer<typeof threadSchema>
	): Promise<void> => {
		startTransition(async () => await createThread(data));

		form.reset();

		toast.success("Thread posted");
		router.push(community ? `/communities/${community.slug}` : "/feeds");
	};

	const updateThreadHandler = async (data) => {};

	const submitHandler = (data: z.infer<typeof threadSchema>) => {
		variant === "CREATE"
			? createThreadHandler(data)
			: updateThreadHandler(data);
	};

	return (
		<div>
			{community && (
				<div className="flex items-center gap-x-2">
					<p>Posting on:</p>
					<CommunityCard community={community} variant="xs" isMember />
				</div>
			)}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler, (err) =>
						console.error(err)
					)}
					className="space-y-3"
				>
					<FormField
						control={form.control}
						name="caption"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Caption:</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Hot take..."
										rows={5}
										className="rounded-xl"
									></Textarea>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* <div>
						<input
							type="file"
							accept="image/*"
							ref={fileBtn}
							value={img}
							onChange={(e) => setImg(e.target.value)}
							className="hidden"
						/>

						<div
							onClick={() => fileBtn.current.click()}
							className="cursor-pointer bg-secondary p-2 rounded-lg flex items-center gap-x-1 w-fit "
						>
							<Image />
							<Label>Select Image</Label>
						</div>
					</div> */}

					<FormField
						control={form.control}
						name="privacy"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Privacy</FormLabel>

								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Public" />
										</SelectTrigger>
									</FormControl>

									<SelectContent>
										{THREAD_PRIVACY.map((v) => (
											<SelectItem value={ThreadPrivacy[`${v}`]} key={v}>
												{v.toLowerCase()}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>

					{isPending ? (
						<Button disabled size="sm">
							Post
							<Loader className="animate-spin" />
						</Button>
					) : (
						<Button size="sm">
							Post
							<Upload />
						</Button>
					)}
				</form>
			</Form>
		</div>
	);
}
