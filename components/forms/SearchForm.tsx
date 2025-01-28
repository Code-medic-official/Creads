"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { iComment } from "@/lib/database/models/comment.model";
import { iThread } from "@/lib/database/models/thread.model";
import { iUser } from "@/lib/database/models/user.model";
import { LoaderPinwheel, Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SearchForm({
	qChange,
}: {
	qChange: (
		q: string
	) => Promise<{
		accountResults: iUser[];
		replyResults: iComment[];
		threadResults: iThread[];
	}>;
}) {
	const isPending = false;
	// const [isPending, startTransition] = useTransition();

	const { register, handleSubmit, watch } = useForm();
	const q = watch("q");

	const searchHandler = () => {};

	useEffect(() => {
		qChange(q);
	}, [q]);

	return (
		<form
			onSubmit={handleSubmit(searchHandler, (err) => console.error(err))}
			className="flex items-center gap-x-2"
		>
			<Input
				placeholder="Type to search..."
				type="search"
				{...register("q")}
				className="rounded-xl"
			/>
			<Button disabled={isPending} className="size-8 rounded-xl">
				{isPending ? <LoaderPinwheel className="animate-spin" /> : <Search />}{" "}
			</Button>
		</form>
	);
}
