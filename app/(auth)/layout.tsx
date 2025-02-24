import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { ReactNode } from "react";
import { poppinsFont } from "../(root)/layout";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
	title: "Onboarding",
	description: "Next js 15 Auth page sign up",
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
