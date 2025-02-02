import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { useRouter } from "next/navigation";

export default function SearchDialog() {
	const [q, setQ] = useState<string>();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const placeholders = [
		"What's the first rule of Fight Club?",
		"Who is Tyler Durden?",
		"Where is Andrew Laeddis Hiding?",
		"Write a Javascript method to reverse a string",
		"How to assemble your own PC?",
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setQ(e.target.value);
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push(`/search/${encodeURIComponent(q)}`);
    // Close dialog after 1 second
		setTimeout(() => setIsOpen(false), 800);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					// onClick={() => router.push("/search")}
					className="rounded-xl text-primary"
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
				/>
			</DialogContent>
		</Dialog>
	);
}
