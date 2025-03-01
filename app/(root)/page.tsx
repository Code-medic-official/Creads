import Feedback from "@/components/FeedBack";
import GithubBtn from "@/components/GithubBtn";
import { Tabs } from "@/components/ui/aceTabs";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

import MainHeroSection from "@/components/MainHeroSection";
import TechCarousel from "@/components/TechCarousel";
import { LinkPreview } from "@/components/ui/link-preview";
import { SparklesCore } from "@/components/ui/sparkles";
import { DEMO_PAGES } from "@/constants";
import { getFeedbacks } from "@/lib/actions/feedback.action";
import { getActiveUser } from "@/lib/actions/user.actions";
import devLogo from "@/public/assets/CM_logo.png";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import {
	Code2,
	Component,
	MessageCircleHeartIcon,
	Star,
	Stars,
	TreePine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
	const user = await getActiveUser();
	const feedbacks = await getFeedbacks();

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
				<MainHeroSection />
			</section>

			{/* Screen shot */}
			<section className="flex flex-col overflow-hidden" >
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
						src={"/assets/screenshots/feeds-page.png"}
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
				<TechCarousel />
			</section>

			{/* Developer Section */}
			<section className="mt-10">
				<h3 className="mb-3 text-xl sm:text-2xl md:text-4xl font-medium flex items-center gap-x-1">
					<Code2 />
					<span>Developer</span>
				</h3>

				<div className="p-4">
					<h4 className="text-2xl sm:text-3xl md:text-4xl text-center mb-4 font-semibold ">
						⚕️Code Medic💊
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
						{/* <span>
							<Star size={20} />
						</span> */}
				</h3>

				<AnimatedTestimonials testimonials={feedbacks} autoplay />
			</section>

			<Feedback user={user!} />
		</>
	);
}
