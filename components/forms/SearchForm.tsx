"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSearchQuery } from "@/lib/actions/util.actions";
import { LoaderPinwheel, Search } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SearchForm() {
	const isPending = false;
	// const [isPending, startTransition] = useTransition();

	const { register, handleSubmit, watch } = useForm();
	const q = watch("q");

	const searchHandler = () => {};

	useEffect(() => {
		const fetchSearchQuery = async () => await getSearchQuery(q);

		fetchSearchQuery();
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
