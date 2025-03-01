import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { ReactNode } from "react";
import { poppinsFont } from "../(root)/layout";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
	title: {
		template: "%s | Creads",
		default: "Creads",
	},
	description:
		"Social media app clone that is built for heroes by Victoruel; Alias Code medic",
	applicationName: "Ruel-threads-clone",
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
    description: "Creads is a revolutionary social media platform designed to connect people through creativity, collaboration, and community. Explore our Final Year Project (FYP) to learn how we're redefining social interactions.",
    url: "https://creads.vercel.app",
    siteName: "Creads",
   
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creads - Your Ultimate Social Media Experience | FYP Project",
    description: "Creads is a revolutionary social media platform designed to connect people through creativity, collaboration, and community. Explore our Final Year Project (FYP) to learn how we're redefining social interactions.",
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

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider afterSignOutUrl="/" appearance={{ baseTheme: dark }} dynamic>
			<html suppressHydrationWarning lang="en">
				<body
					className={cn(
						"bg-background text-foreground ",
						poppinsFont.className
					)}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						forcedTheme="dark"
						disableTransitionOnChange
					>
						<main className="h-screen flex items-center justify-center">
							{children}
						</main>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
