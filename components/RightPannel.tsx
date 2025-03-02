"use client";

import { iCommunity } from "@/lib/database/models/community.model";
import { TabsContent } from "@radix-ui/react-tabs";
import CommunityCard from "./cards/CommunityCard";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { iUser } from "@/lib/database/models/user.model";
import UserCard from "./cards/UserCard";
import { Button } from "./ui/button";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Void from "./Void";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

export default function RightPannel({
	userCommunities,
	otherCommunities,
	suggestedAccounts,
}: {
	userCommunities: iCommunity[];
	otherCommunities: iCommunity[];
	suggestedAccounts: iUser[];
}) {
	const { theme } = useTheme();

	return (
		<div className="bg-secondary p-2 h-[calc(100vh-3.5rem)] w-full sticky top-14">
			<ScrollArea className="h-[calc(100vh-5rem)]">
				<Tabs defaultValue="Communities">
					<TabsList className="mb-3 sticky top-0 z-20">
						<TabsTrigger value="Communities">Communities</TabsTrigger>
						<TabsTrigger value="Suggestions">Suggestions</TabsTrigger>
					</TabsList>

					<TabsContent value="Communities" className="space-y-3">
						<section>
							<Label className="block mb-2">Panel: </Label>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										// size="lg"
										className="text-primary w-fit animate-shimmer border border-secondary dark:border-slate-800 bg-[linear-gradient(110deg,#d6d6d6,45%,#fffeff,55%,#d6d6d6)] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
									>
										<OrganizationSwitcher
											appearance={{
												baseTheme: theme === "dark" ? dark : undefined,
											}}
										/>
									</Button>
								</TooltipTrigger>

								<TooltipContent>
									Click to manage all community actiivities🌟{" "}
								</TooltipContent>
							</Tooltip>
						</section>

						<section>
							<Label>Your Communities</Label>

							{userCommunities ? (
								userCommunities.length > 0 ? (
									<div className="space-y-2">
										{userCommunities?.map((community) => (
											<CommunityCard
												key={community._id}
												variant="sm"
												community={community}
											/>
										))}
									</div>
								) : (
									<Void msg="You’re not in any community yet!😭" />
								)
							) : (
								[...Array(3)].map((n, i) => (
									<Skeleton key={i} className="w-full rounded-xl h-14 mb-2" />
								))
							)}
						</section>

						<section>
							<Label>Others</Label>

							{otherCommunities ? (
								<div className="space-y-2">
									{otherCommunities?.map((community) => (
										<CommunityCard
											key={community._id}
											variant="sm"
											community={community}
										/>
									))}
								</div>
							) : (
								[...Array(5)].map((n, i) => (
									<Skeleton key={i} className="w-full rounded-xl h-14 mb-2" />
								))
							)}
						</section>
					</TabsContent>
					<TabsContent value="Suggestions">
						<h2 className="mb-3">Suggested Accounts</h2>

						<section className="space-y-2">
							{suggestedAccounts.length > 0
								? suggestedAccounts.map((user, i) => (
										<UserCard key={i} _user={user} variant="simple-card" />
								  ))
								: [...Array(3)].map((n, i) => (
										<Skeleton key={i} className="w-full rounded-xl h-14 mb-2" />
								  ))}
						</section>
					</TabsContent>
				</Tabs>

				<ScrollBar className="hidden" />
			</ScrollArea>
		</div>
	);
}
