"use client";

import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TypewriterEffectSmooth } from "@/components/ui/typewritter-effects";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Stars } from "lucide-react";
import Link from "next/link";

export default function Home() {
	const words = [
		{ text: "Your" },
		{ text: "new" },
		{ text: "Social" },
		{ text: "media" },
		{ text: "Creads", className: "text-primary" },
	];

	return (
		<div className="text-xl">
			<TypewriterEffectSmooth
				words={words}
				cursorClassName="bg-primary"
				className="text-6xl"
			/>

			<SignUpButton>
				<Button>Sign up</Button>
			</SignUpButton>

			<SignInButton>
				<Button>Sign in</Button>
			</SignInButton>

			<HoverBorderGradient
				containerClassName="rounded-full"
				as="button"
				className="text-primary bg-background border-primary "
			>
				<Link href="/feeds" className="flex items-center gap-x-1">
					<Stars />
					<span>Get started</span>
				</Link>
			</HoverBorderGradient>
		</div>
	);
}
