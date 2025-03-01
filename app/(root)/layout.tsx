import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";
import { getActiveUser } from "@/lib/actions/user.actions";
import { getFeedbacks } from "@/lib/actions/feedback.action";

export const poppinsFont = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Creads",
		default: "Creads",
	},
	description:
		"Social media app clone that is built for heroes by Victoruel; Alias Code medic",
	applicationName: "Creads",
	keywords: [
		"Creads",
		"Ruel-threads-clone",
		"Next.js Social Media App",
		"Social Networking Platform",
		"Social Media Website",
		"React Social Media",
		"Next.js App Development",
		"Real-Time Messaging App",
		"User Engagement Platform",
		"Next.js SEO Optimized",
		"Social Media Integration",
		"Next.js App Features",
		"Social Media Dashboard",
		"Online Community Platform",
		"Social Media App for Business",
		"Social Networking App for Developers",
		"Social Networking UI Design",
		"Next.js Real-Time Features",
		"Build Social Network with React",
		"Best Social Media App Framework",
		"Fast Social Media Website with Next.js",
		"Next.js Performance Optimization",
		"Responsive Social Media Design",
		"React Social Media UI Kit",
		"Next.js Social Features",
		"User Profile Management",
		"Social Media App Analytics",
		"Social Media App Security",
		"Modern Social Networking Solutions",
		"Customizable Social Media Platform",
		"Next.js App Deployment",
		"Interactive Social Media Features",
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
		// images: [
		// 	{
		// 		url: "/assets/logo.png",
		// 		width: 1200,
		// 		height: 630,
		// 		alt: "Creads - Social Media Redefined",
		// 	},
		// ],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Creads - Your Ultimate Social Media Experience | FYP Project",
		description:
			"Creads is a revolutionary social media platform designed to connect people through creativity, collaboration, and community. Explore our Final Year Project (FYP) to learn how we're redefining social interactions.",
		// images: ["/assets/logo.png"],
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

export default async function layout({ children }: { children: ReactNode }) {
	await getFeedbacks();
	await getActiveUser();

	return (
		<ClerkProvider afterSignOutUrl="/" dynamic>
			<html suppressHydrationWarning lang="en">
				<body
					className={cn("bg-background text-foreground", poppinsFont.className)}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						forcedTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						<ScrollArea className="h-screen">
							<ScrollBar />
							<main className="p-3 sm:p-5 md:p-7">{children}</main>
						</ScrollArea>
					</ThemeProvider>
					{/* <script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/> */}
				</body>
			</html>
		</ClerkProvider>
	);
}
