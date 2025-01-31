"use client";

import {
	getOtherCommunities,
	getUserCommunities,
} from "@/lib/actions/community.actions";
import { getActiveUser } from "@/lib/actions/user.actions";
import { iUser } from "@/lib/database/models/user.model";
import { TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import CommunityCard from "./cards/CommunityCard";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { iCommunity } from "@/lib/database/models/community.model";

export default function RightPannel() {
	const [user, setUser] = useState<iUser>();
	const [userCommunities, setUserCommunities] = useState<iCommunity[]>();
	const [otherCommunities, setOtherCommunities] = useState<iCommunity[]>();

	useEffect(() => {
		const fetchUser = async (): Promise<void> => setUser(await getActiveUser());

		const fetchUserCommunities = async (): Promise<void> =>
			setUserCommunities(await getUserCommunities(user?._id));

		const fetchOtherCommunities = async (): Promise<void> =>
			setOtherCommunities(await getOtherCommunities(user?._id));

		fetchUser();
		fetchUserCommunities();
		fetchOtherCommunities();
	}, [user?._id]);

	return (
		<div className="bg-secondary p-2 h-[calc(100vh-3.5rem)] w-full sticky top-14">
			<Tabs defaultValue="Communities">
				<TabsList className="mb-3">
					<TabsTrigger value="Communities">Communities</TabsTrigger>
					<TabsTrigger value="Activities">Activities</TabsTrigger>
				</TabsList>

				<TabsContent value="Communities">
					<section className="mb-3">
						<Label>You Communities</Label>
						{userCommunities?.map((community) => (
							<CommunityCard
								key={community._id}
								variant="sm"
								community={community}
								isMember
							/>
						))}
					</section>

					<section>
						<Label>Others</Label>

						{otherCommunities?.map((community) => (
							<CommunityCard
								key={community._id}
								variant="sm"
								community={community}
								isMember={false}
							/>
						))}
					</section>
				</TabsContent>
				<TabsContent value="Activities">
					<h2>Activities</h2>
				</TabsContent>
			</Tabs>
		</div>
	);
}
