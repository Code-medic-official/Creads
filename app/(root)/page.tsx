"use client";

import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TypewriterEffectSmooth } from "@/components/ui/typewritter-effects";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Stars } from "lucide-react";
import Link from "next/link";
import { SparklesCore } from "../../components/ui/sparkles";
import { FloatingNav } from "../../components/ui/floating-navbar";
import Image from "next/image";
import { HOME_NAV } from "@/constants";

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

			<FloatingNav navItems={HOME_NAV} />
			<section className="h-[35rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
				<h1 className="flex items-baseline gap-x-2 md:text-7xl text-6xl lg:text-9xl font-bold text-center text-foreground relative z-20">
					<Image
						src="/assets/logo.jpg"
						alt="Logo"
						width={100}
						height={100}
						priority
						className="rounded-xl lg:rounded-[2rem] size-14 lg:size-24"
					/>
					<span>Creads</span>
				</h1>
				<div className="w-[40rem] h-40 relative">
					{/* Gradients */}
					<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
					<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
					<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
					<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

					{/* Core component */}
					<SparklesCore
						background="transparent"
						minSize={0.4}
						maxSize={1}
						particleDensity={1200}
						className="w-full h-full"
						particleColor="#FFFFFF"
					/>

					{/* Radial Gradient to prevent sharp edges */}
					<div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
				</div>
			</section>
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
