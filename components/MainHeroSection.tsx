"use client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Stars } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";

export default function MainHeroSection() {
	return (
		<HeroHighlight>
			<motion.h1
				initial={{
					opacity: 0,
					y: 20,
				}}
				animate={{
					opacity: 1,
					y: [20, -5, 0],
				}}
				transition={{
					duration: 0.5,
					ease: [0.4, 0.0, 0.2, 1],
				}}
				className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
			>
				Your new Social Platform🤩; a place where you can{" "}
				<Highlight className="text-black dark:text-white">
					Let Out All Your Hot Takes❤️‍🔥
				</Highlight>
				<div className="mt-10">
					<button className="mt-4 relative rounded-full overflow-hidden ">
						<div className="absolute inset-0 !bg-gradient-to-r !from-indigo-500 !to-purple-500 rounded-lg" />

						<Link
							href="/feeds"
							className="flex items-center gap-x-1 px-8 py-2 rounded-full  relative group transition duration-200 text-white bg-transparent"
						>
							<Stars />
							<span>Get started</span>
						</Link>
					</button>
				</div>
			</motion.h1>
		</HeroHighlight>
	);
}
