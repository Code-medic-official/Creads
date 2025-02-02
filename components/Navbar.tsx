"use client";

import { OrganizationSwitcher, SignedIn, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import RightPannelSheet from "./RightPannelSheet";
import ThemeToggle from "./themeToggle";
import { useNetworkState } from "@uidotdev/usehooks";
import toast from "react-hot-toast";

export default function Navbar() {
	const router = useRouter();
	const { online } = useNetworkState();

	if (!online) toast.error("Offline🌐 Find Better Network❗");

	return (
		<nav className="sticky top-0 bg-secondary px-5 py-2 w-screen h-14 flex items-center justify-between z-30">
			<Link href="/" className="flex items-center gap-x-1">
				<Image
					src="/assets/logo.jpg"
					alt="Logo"
					width={40}
					height={40}
					priority
					className="rounded-lg"
				/>
				<p className="text-xl font-medium hidden sm:block">Creads</p>
			</Link>

			<div className="flex items-center gap-x-2">
				<ThemeToggle />
				<RightPannelSheet />
				<Button
					variant="outline"
					size="icon"
					onClick={() => router.push("/search")}
					className="rounded-xl text-primary"
				>
					<Search strokeWidth={3} size={24} />
				</Button>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</nav>
	);
}
