"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { useNetworkState } from "@uidotdev/usehooks";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import RightPannelSheet from "./RightPannelSheet";
import SearchDialog from "./SearchDialog";
import ThemeToggle from "./themeToggle";
import GithubBtn from "./GithubBtn";

export default function Navbar() {
	const { online } = useNetworkState();

	if (!online) toast.error("Offline🌐 Brokie❗🤣", { id: "asdf42" });

	return (
		<nav className="sticky top-0 glass-secondary px-2 sm:px-5 py-2 w-screen h-14 flex items-center justify-between z-30">
			<Link href="/" className="flex items-center gap-x-1">
				<Image
					src="/assets/logo.jpg"
					alt="Logo"
					width={40}
					height={40}
					priority
					className="rounded-xl"
				/>
				<p className="text-xl font-medium hidden sm:block">Creads</p>
			</Link>

			<GithubBtn />

			<div className="flex items-center gap-x-1 sm:gap-x-2">
				<ThemeToggle />
				<RightPannelSheet />
				<SearchDialog />

				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</nav>
	);
}
