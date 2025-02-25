import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { Button } from "./ui/button";

export default function SearchDialog() {
	const [q, setQ] = useState<string>("");
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const [placeholders, setPlaceholders] = useState([
		"Top design trends on Creads 2025",
		"Find the best influencers on Creads",
		"Latest Creads platform updates and news",
		"Collaborate with top designers on Creads",
		"Brands that grew using Creads successfully",
	]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setQ(e.target.value);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		setPlaceholders([
			`🔎Searching for "${q}"...`,
			"🔃Filtering results...",
			"📅Sorting results...",
			"🌐Slow internet😭...",
			"📡Tying to access the server...",
		]);

		e.preventDefault();
		startTransition(() => {
			router.push(`/search/${encodeURIComponent(q)}`);
		});
	};

	useEffect(() => {
		if (!isPending) {
			setIsOpen(false);
			setPlaceholders([
				"Top design trends on Creads 2025",
				"Find the best influencers on Creads",
				"Latest Creads platform updates and news",
				"Collaborate with top designers on Creads",
				"Brands that grew using Creads successfully",
			]);
		}
	}, [isPending]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="text-primary inline-flex animate-shimmer items-center justify-center border border-secondary dark:border-slate-800 bg-[linear-gradient(110deg,#d6d6d6,45%,#fffeff,55%,#d6d6d6)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
				>
					<Search strokeWidth={3} size={24} />
				</Button>
			</DialogTrigger>

			<DialogContent className="top-[20%]">
				<DialogTitle className="text-primary flex items-center gap-x-1">
					<Search />
					<span>Global Search</span>
				</DialogTitle>
				<PlaceholdersAndVanishInput
					placeholders={placeholders}
					onChange={handleChange}
					onSubmit={onSubmit}
					isPending={isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
