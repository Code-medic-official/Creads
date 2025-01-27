"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "./ui/sheet";
import { PanelRight, PanelRightClose } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export default function RightPannel() {
	return (
		<div className="bg-secondary p-3 h-[calc(100vh-3.5rem)] w-full sticky top-14">
			<Tabs defaultValue="Communities" >
				<TabsList>
					<TabsTrigger value="Communities" >Communities</TabsTrigger>
					<TabsTrigger value="Activities" >Activities</TabsTrigger>
				</TabsList>

				<TabsContent value="Communities">
					<h2>Communities</h2>
				</TabsContent>
				<TabsContent value="Activities">
					<h2>Activities</h2>
				</TabsContent>
			</Tabs>
		</div>
	);
}

export function RightPannelSheet() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetContent side="right" className="bg-secondary">
					<SheetTitle className="hidden">Suggested Communities</SheetTitle>
					<RightPannel />
				</SheetContent>
			</Sheet>

			<div className="sm:hidden">
				{isOpen ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="icon"
								variant="outline"
								onClick={() => setIsOpen(false)}
							>
								<PanelRightClose />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Close communites</TooltipContent>
					</Tooltip>
				) : (
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size="icon"
								variant="outline"
								onClick={() => setIsOpen(true)}
							>
								<PanelRight />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Open communites</TooltipContent>
					</Tooltip>
				)}
			</div>
		</>
	);
}
