"use client";

import Feedback from "@/components/FeedBack";
import GithubBtn from "@/components/GithubBtn";
import { Tabs } from "@/components/ui/aceTabs";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
	GlowingStarsBackgroundCard,
	GlowingStarsDescription,
	GlowingStarsTitle,
} from "@/components/ui/glowing-stars";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { LinkPreview } from "@/components/ui/link-preview";
import { SparklesCore } from "@/components/ui/sparkles";
import { DEMO_PAGES, TECH_STACKS } from "@/constants";
import { getFeedbacks } from "@/lib/actions/feedback.action";
import { getActiveUser } from "@/lib/actions/user.actions";
import { iFeedback } from "@/lib/database/models/feedback.model";
import { iUser } from "@/lib/database/models/user.model";
import devLogo from "@/public/assets/CM_logo.png";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";
import {
	ArrowRight,
	Boxes,
	Code2,
	Component,
	MessageCircleHeartIcon,
	Stars,
	TreePine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
	const [user, setUser] = useState<iUser>();
	const [feedbacks, setFeedbacks] = useState<[iFeedback]>([]);

	useEffect(() => {
		const fetchData = async () => {
			setUser(await getActiveUser());
			setFeedbacks(await getFeedbacks());
		};

		fetchData();
	}, []);

	return (
		<>
			{/* Hero Navbar */}
			<section className="w-[98vw] mx-auto sticky top-2 z-50 px-3 py-2 rounded-xl bg-secondary/45 backdrop-blur-md flex items-center justify-between shadow-md">
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
				<div className="flex items-center gap-x-3">
					<div className="hidden sm:block">
						<SignUpButton>
							<Button>Sign up</Button>
						</SignUpButton>
					</div>

					<SignInButton>
						<Button>Sign in</Button>
					</SignInButton>
					<button className="p-[3px] relative rounded-full overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />

						<Link
							href="/feeds"
							className="flex items-center gap-x-1 p-2 md:px-8 md:py-2  bg-background rounded-full  relative group transition duration-200 text-white hover:bg-transparent"
						>
							<Stars />
							<span className="hidden md:inline">Get started</span>
						</Link>
					</button>
				</div>
			</section>

			{/* Hero 1 */}
			<section className="h-[35rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md z-0">
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
					<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
					<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
					<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
					<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

					<SparklesCore
						background="transparent"
						minSize={0.4}
						maxSize={1}
						particleDensity={1200}
						className="w-full h-full"
						particleColor={"#FFFFFF"}
					/>

					<div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
				</div>
			</section>

			{/* Hero 2 */}
			<section className="-mt-28">
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
			</section>

			{/* Screen shot */}
			<section>
				<ContainerScroll
					titleComponent={
						<>
							<h1 className="text-4xl font-semibold text-black dark:text-white">
								Unleash the power of <br />
								<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
									Your Voice
								</span>
							</h1>
						</>
					}
				>
					<Image
						src={null}
						alt="hero"
						height={720}
						width={1400}
						className="mx-auto rounded-2xl object-cover h-full object-left-top"
						draggable={false}
					/>
				</ContainerScroll>
			</section>

			{/* Page Tabs */}
			<section className="-mt-36">
				<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
					<h3 className="mb-3 text-xl sm:text-2xl md:text-4xl font-medium flex items-center gap-x-1">
						<Component />
						<span>Pages</span>
					</h3>
					<Tabs tabs={DEMO_PAGES} />
				</div>
			</section>

			{/* Teck stack Carousel */}
			<section>
				<h3 className="mb-3 text-xl sm:text-2xl md:text-4xl font-medium flex items-center gap-x-1">
					<Boxes />
					<span>Tech Stack</span>
				</h3>

				<Carousel
					plugins={[Autoplay({ delay: 3500 })]}
					className="w-[97vw] md:w-[95vw]"
				>
					<CarouselContent>
						{TECH_STACKS.map((stack, i) => (
							<CarouselItem
								key={i}
								className="pl-5 basis-[90%] sm:basis-[45%] min-[950px]:basis-[30%] min-[1450px]:basis-[22%] relative"
							>
								<Image
									src={stack.icon}
									priority
									width={30}
									height={30}
									alt="Stack-icon"
									className="roudend-full absolute top-3 left-8"
								/>
								<GlowingStarsBackgroundCard>
									<GlowingStarsTitle>{stack.title}</GlowingStarsTitle>
									<div className="flex justify-between items-end">
										<GlowingStarsDescription>
											{stack.description}
										</GlowingStarsDescription>
										<Link href={stack.link}>
											<Button size="icon" variant="secondary">
												<ArrowRight />
											</Button>
										</Link>
									</div>
								</GlowingStarsBackgroundCard>
							</CarouselItem>
						))}
					</CarouselContent>

					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</section>

			{/* Developer Section */}
			<section className="mt-10">
				<h3 className="mb-3 text-xl sm:text-2xl md:text-4xl font-medium flex items-center gap-x-1">
					<Code2 />
					<span>Developer</span>
				</h3>

				<div className="p-4">
					<h4 className="text-2xl sm:text-3xl md:text-4xl text-center mb-4 font-semibold ">
						Code Medic🧑‍💻
					</h4>
					<div className="w-full flex flex-col sm:flex-row items-center gap-4 justify-center">
						<Image
							src={devLogo}
							alt="dev-Logo"
							className="object-cover size-10/12 sm:size-1/3 md:size-1/4 rounded-3xl"
						/>

						<div className="space-y-3">
							<LinkPreview
								url="https://github.com/Code-medic-official"
								// target="_blank"
								className="flex items-center gap-x-2"
							>
								<Image
									src="/assets/github.png"
									width={25}
									height={25}
									priority
									alt="github logo"
									className="object-cover text-white"
								/>
								<span className="font-medium">Code Medic Official✨</span>
							</LinkPreview>
							<LinkPreview
								url="https://github.com/Code-medic-official"
								// target="_blank"
								className="flex items-center gap-x-2"
							>
								<Image
									src="/assets/gmail.png"
									width={25}
									height={25}
									priority
									alt="gmail logo"
									className="object-cover text-white"
								/>
								<span className="font-medium">Codemedic2@gmail.com</span>
							</LinkPreview>
							<LinkPreview
								url="https://youtube.com/@codemedic"
								// target="_blank"
								className="flex items-center gap-x-2"
							>
								<Image
									src="/assets/youtube.png"
									width={25}
									height={25}
									priority
									alt="github logo"
									className="object-cover text-white"
								/>
								<span className="font-medium">Code Medic 📽️</span>
							</LinkPreview>
							<LinkPreview
								url="https://www.instagram.com/code_medic"
								// target="_blank"
								className="flex items-center gap-x-2"
							>
								<Image
									src="/assets/instagram.png"
									width={25}
									height={25}
									priority
									alt="instagram logo"
									className="object-cover text-white"
								/>
								<span className="font-medium">Code Medic 📸</span>
							</LinkPreview>
							<LinkPreview
								url="https://twitter.com/rueltieni"
								// target="_blank"
								className="flex items-center gap-x-2"
							>
								<Image
									src="/assets/twitter.png"
									width={25}
									height={25}
									priority
									alt="twitter logo"
									className="object-cover text-white"
								/>
								<span className="font-medium">Victoruel 🐦</span>
							</LinkPreview>
							<LinkPreview
								url="https://linktr.ee/codemedic"
								// target="_blank"
								className="flex items-center gap-x-2"
							>
								<TreePine size={30} fill="#40d45c" stroke="#40ff5c" />
								<span className="font-medium">Link Tree 🎄</span>
							</LinkPreview>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials (uncomment after we have some more contents */}
			<section className="mt-10">
				<h3 className="mb-3 text-xl sm:text-2xl md:text-4xl font-medium flex items-center gap-x-1">
					<MessageCircleHeartIcon />
					<span>Testimonials</span>
				</h3>

				<AnimatedTestimonials testimonials={feedbacks} autoplay />
			</section>

			<Feedback user={user} />
		</>
	);
}
