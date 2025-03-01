"use client";

import { iCommunity } from "@/lib/database/models/community.model";
import { TabsContent } from "@radix-ui/react-tabs";
import CommunityCard from "./cards/CommunityCard";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { iUser } from "@/lib/database/models/user.model";
import UserCard from "./cards/UserCard";

export default function RightPannel({
	userCommunities,
	otherCommunities,
	suggestedAccounts,
}: {
	userCommunities: iCommunity[];
	otherCommunities: iCommunity[];
	suggestedAccounts: iUser[];
}) {
	return (
		<div className="bg-secondary p-2 h-[calc(100vh-3.5rem)] w-full sticky top-14">
			<Tabs defaultValue="Communities">
				<TabsList className="mb-3">
					<TabsTrigger value="Communities">Communities</TabsTrigger>
					<TabsTrigger value="Suggestions">Suggestions</TabsTrigger>
				</TabsList>

				<TabsContent value="Communities">
					<section className="mb-3">
						<Label>Your Communities</Label>

						{userCommunities ? (
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
									<UserCard key={i} _user={user} variant="lg" />
							  ))
							: [...Array(3)].map((n, i) => (
									<Skeleton key={i} className="w-full rounded-xl h-14 mb-2" />
							  ))}
					</section>
				</TabsContent>
			</Tabs>
		</div>
	);
}
