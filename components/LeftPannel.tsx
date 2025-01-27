"use client";

import { LEFT_PANNEL_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function LeftPannel() {
	const pathname = usePathname();

	return (
		<div className="hidden sticky top-14 sm:flex h-[calc(100vh-3.5rem)] bg-secondary p-3 flex-col items-center justify-between">
			<div className="flex flex-col gap-y-5 ">
				{LEFT_PANNEL_LINKS.map((link, i) => {
					const isActive: boolean =
						pathname.split("/")[1] === link.path.split("/")[1];
					return (
						<Link
							key={i}
							href={link.path}
							className={cn(
								"flex items-center gap-x-2 p-3 rounded-lg",
								isActive && "bg-primary text-primary-foreground"
							)}
						>
							{link.icon}
							<p className="font-semibold hidden md:block ">{link.label}</p>
						</Link>
					);
				})}
			</div>

			<SignedIn>
				<SignOutButton redirectUrl="/sign-in" >
					<Button
						variant={"outlineDestructive"}
						className="size-10 sm:w-full p-1"
					>
						<span className="font-semibold hidden md:block ">Logout</span>
						<LogOut size="1rem" />
					</Button>
				</SignOutButton>
			</SignedIn>
		</div>
	);
}
