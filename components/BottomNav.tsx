"use client";

import { LEFT_PANNEL_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BottomNav() {
	const pathname = usePathname();

	if (pathname.match("^/chat/.*")) return;

	return (
		<div className="block sm:hidden sticky bottom-1 w-[90%] mx-auto rounded-3xl border bg-secondary/15 backdrop-blur-lg p-2">
			<div className="flex gap-x-1 justify-between">
				{LEFT_PANNEL_LINKS.map((link, i) => {
					const isActive: boolean =
						pathname.split("/")[1] === link.path.split("/")[1];
					return (
						<Link
							key={i}
							href={link.path}
							className={cn(
								"flex flex-col items-center gap-x-2 p-2 rounded-2xl",
								isActive && "bg-primary text-primary-foreground"
							)}
						>
							{link.icon}
							<p className="font-medium hidden sm:block text-xs">
								{link.label.split(" ")[0]}
							</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
