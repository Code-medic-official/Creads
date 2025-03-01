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
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { dark } from "@clerk/themes";
import { iCommunity } from "@/lib/database/models/community.model";
import { iUser } from "@/lib/database/models/user.model";

export default function Navbar({
	userCommunities,
	otherCommunities,
	suggestedAccounts,
}: {
	userCommunities: iCommunity[];
	otherCommunities: iCommunity[];
	suggestedAccounts: iUser[];
}) {
	const { online } = useNetworkState();
	const { theme, systemTheme } = useTheme();

	const [clerkTheme, setClerkTheme] = useState<typeof dark>();

	if (!online) toast.error("Offline🌐 Brokie❗🤣", { id: "asdf42" });

	useEffect(() => {
		if (theme === "dark") {
			setClerkTheme(dark);
		} else {
			setClerkTheme(undefined);
		}
	}, [theme, systemTheme]);

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
				<RightPannelSheet
					userCommunities={userCommunities}
					otherCommunities={otherCommunities}
					suggestedAccounts={suggestedAccounts}
				/>
				<SearchDialog />

				<SignedIn>
					<UserButton appearance={{ baseTheme: clerkTheme }} />
				</SignedIn>
			</div>
		</nav>
	);
}
