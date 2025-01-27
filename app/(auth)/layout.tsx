import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import "../globals.css";
import React, { ReactNode } from "react";
import { poppinsFont } from "../(root)/layout";

export const metadata: Metadata = {
	title: "Onboarding",
	description: "Next js 15 Auth page sign up",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<ClerkProvider dynamic>
			<html lang="en">
				<body
					className={cn(
						"bg-background text-foreground h-screen flex items-center justify-center",
						poppinsFont.className
					)}
				>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
