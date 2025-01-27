import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import "../globals.css";

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
};

export default function layout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider dynamic>
			<html lang="en">
				<body className={cn(poppinsFont.className)}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
