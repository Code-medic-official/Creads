"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import RightPannelSheet from "./RightPannelSheet";
import ThemeToggle from "./themeToggle";

export default function Navbar() {
	const router = useRouter();

	return (
		<nav className="sticky top-0 bg-secondary px-5 py-2 w-screen h-14 flex items-center justify-between z-30">
			<Link href="/" className="flex items-center gap-x-1">
				<Image
					src="/assets/logo.jpg"
					alt="Logo"
					width={40}
					height={40}
					className="rounded-lg"
				/>
				<p className="text-xl font-medium hidden sm:block">Creads</p>
			</Link>

			<div className="flex items-center gap-x-2">
				<ThemeToggle />
				<RightPannelSheet />
				<Button
					variant="outline"
					onClick={() => router.push("/search")}
					className="size-8 rounded-lg text-primary"
				>
					<Search width="12px" />
				</Button>

				<UserButton />
			</div>
		</nav>
	);
}
