import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { ReactNode } from "react";
import { poppinsFont } from "../(root)/layout";
import "../globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
	title: "Onboarding",
	description: "Next js 15 Auth page sign up",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider afterSignOutUrl="/" dynamic>
			<html lang="en">
				<body
					className={cn(
						"bg-background text-foreground h-screen flex items-center justify-center",
						poppinsFont.className
					)}
				>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
