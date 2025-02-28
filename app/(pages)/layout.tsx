import BottomNav from "@/components/BottomNav";
import LeftPannel from "@/components/LeftPannel";
import Navbar from "@/components/Navbar";
import RightPannel from "@/components/RightPannel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getActiveUser } from "@/lib/actions/user.actions";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import StoreProvider from "../(root)/StoreProvider";
import "../globals.css";
import {
	getCommunities,
	getOtherCommunities,
	getUserCommunities,
} from "@/lib/actions/community.actions";

const poppinsFont = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Creads",
		default: "Creads",
	},
	description:
		"Social media pages that you will use to interact with the world",
	keywords: [
		"creads",
		"Code Medic",
		"Code medic official",
		"next js social media app",
		"social networking platform",
		"real-time messaging",
		"user profiles",
		"social media engagement",
		"content sharing",
		"social media trends",
		"community building",
		"social media analytics",
		"user-generated content",
		"social media marketing",
		"social media SEO",
		"social media integration",
		"responsive social media app",
		"modern social media platform",
		"social media for creators",
		"social media for businesses",
		"social media privacy",
		"social media security",
		"social media customization",
		"social media notifications",
		"social media feed",
		"social media discovery",
		"social media collaboration",
		"social media influencers",
		"social media monetization",
		"social media API integration",
		"social media performance",
		"social media scalability",
		"social media user experience",
		"social media app development",
		"next js SEO optimization",
		"social media best practices",
		"social media growth hacks",
		"social media content strategy",
		"social media branding",
		"social media audience targeting",
		"social media algorithm",
		"social media trends 2023",
		"social media innovation",
		"social media for startups",
		"social media for developers",
		"social media for designers",
		"social media for photographers",
		"social media for writers",
		"social media for gamers",
		"social media for educators",
		"social media for students",
		"social media for professionals",
		"social media for entrepreneurs",
	],
	authors: [
		{ name: "Victoruel" },
		{ name: "Code Medic", url: "https://youtube.com/@codemedic" },
	],
	openGraph: {
		title: "Creads - Your Ultimate Social Media Experience | FYP Project",
		description:
			"Creads is a revolutionary social media platform designed to connect people through creativity, collaboration, and community. Explore our Final Year Project (FYP) to learn how we're redefining social interactions.",
		url: "https://creads.vercel.app",
		siteName: "Creads",
		images: [
			{
				url: "/assets/logo.png",
				width: 1200,
				height: 630,
				alt: "Creads - Social Media Redefined",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Creads - Your Ultimate Social Media Experience | FYP Project",
		description:
			"Creads is a revolutionary social media platform designed to connect people through creativity, collaboration, and community. Explore our Final Year Project (FYP) to learn how we're redefining social interactions.",
		images: ["/assets/logo.png"],
		site: "@creadsapp",
		creator: "@ruelTieni",
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: "/favicon.ico",
	},
	themeColor: "#893af2",
	metadataBase: new URL("https://creads.vercel.app"),
	alternates: {
		canonical: "https://creads.vercel.app",
		languages: {
			"en-US": "https://creads.vercel.app",
		},
	},
	other: {
		"canvas:version": "1.0.0", // Custom canvas prop for dynamic rendering
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "SoftwareApplication",
	name: "Creads",
	description:
		"A revolutionary social media platform for creative collaboration.",
	applicationCategory: "SocialMedia",
	operatingSystem: "Web, iOS, Android",
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "USD",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getActiveUser();
	const communities = await getCommunities();

	if (communities) console.log("Communities Fetched");
	const userCommunities = await getUserCommunities(user._id!);
	const otherCommunities = await getOtherCommunities(user._id!);

	// ! Ensure User is onboarded
	if (user && !user?.onboarded) redirect("/onboarding");

	return (
		<ClerkProvider afterSignOutUrl="/" dynamic>
			<StoreProvider>
				<html suppressHydrationWarning lang="en">
					<TooltipProvider>
						<body
							className={`${poppinsFont.className} antialiased bg-background text-foreground`}
						>
							<ThemeProvider
								attribute="class"
								defaultTheme="system"
								enableSystem
								disableTransitionOnChange
							>
								<Toaster />
								<ScrollArea className="h-screen">
									<Navbar
										userCommunities={userCommunities}
										otherCommunities={otherCommunities}
									/>
									<main className="flex">
										<section>
											<LeftPannel />
										</section>
										<section className="flex-1 p-3 min-h-[calc(100vh-3.5rem)]">
											{children}
										</section>
										<section className="hidden sm:block  sm:flex-[.4] ">
											<RightPannel
												userCommunities={userCommunities}
												otherCommunities={otherCommunities}
											/>
										</section>
									</main>
									<BottomNav />
								</ScrollArea>
							</ThemeProvider>
						</body>
					</TooltipProvider>
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
					/>
				</html>
			</StoreProvider>
		</ClerkProvider>
	);
}
