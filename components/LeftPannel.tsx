"use client";

import { LEFT_PANNEL_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
								"flex items-center md: gap-x-2 p-3 rounded-lg",
								isActive && "bg-primary text-primary-foreground"
							)}
						>
							{link.icon}
							<p className="font-semibold hidden md:block">{link.label}</p>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
