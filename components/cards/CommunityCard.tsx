"use client";

import { iCommunity } from "@/lib/database/models/community.model";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { PlusCircle, Users2 } from "lucide-react";
import { OrganizationProfile, OrganizationSwitcher } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function CommunityCard({
	variant,
	community,
	isMember,
}: {
	variant: "sm" | "lg" | "xs";
	community: iCommunity;
	isMember: boolean;
}) {
	const router = useRouter();
	const isMdDevice = useMediaQuery("min-width: 768px");
	const isSmDevice = useMediaQuery("min-width: 640px");

	if (variant === "xs") {
		return (
			<Card className="w-fit">
				<Link href={`/communities/${community.slug}`}>
					<CardContent className="p-2 flex items-center gap-x-2">
						<Image
							src={community.imageUrl}
							width={28}
							height={28}
							quality={100}
							alt="Community image"
							priority
							className="rounded-lg object-cover size-7"
						/>
						<p className="text-sm font-medium">{community.name}</p>

						<div className="text-primary flex items-center gap-x-1">
							<Users2 size={20} />
							<span className="font-medium">{community.members!.length}</span>

							{/* {isMember || <Button size="sm">Join</Button>} */}
						</div>
					</CardContent>
				</Link>
			</Card>
		);
	} else if (variant === "sm") {
		return (
			<Card>
				<Link href={`/communities/${community.slug}`}>
					<CardContent className="p-2 flex items-center gap-x-2">
						<Image
							src={community.imageUrl}
							width={56}
							height={56}
							quality={100}
							alt="Community image"
							priority
							className="rounded-lg object-cover size-14"
						/>
						<div>
							<p className="text-sm font-medium">{community.name}</p>

							{isMember || <Button size="sm">Join</Button>}
						</div>
					</CardContent>
				</Link>
			</Card>
		);
	} else if (variant === "lg") {
		return (
			<div className="flex gap-x-2 relative">
				<div className="flex-1 flex gap-x-2">
					<Image
						src={community.imageUrl}
						width={isMdDevice ? 128 : isSmDevice ? 96 : 80}
						height={isMdDevice ? 128 : isSmDevice ? 96 : 80}
						quality={100}
						alt="Community image"
						priority
						className="rounded-lg object-cover size-20 sm:size-24 md:size-32"
					/>
					<div className="text-xs sm:text-sm text-muted-foreground">
						<div className="flex items-center gap-x-2" >
							<p className="font-bold text-base md:text-xl text-foreground">{community.name}</p>
							<div className="text-primary flex items-center gap-x-1">
								<Users2 size={20} />
								<span className="font-medium">{community.members!.length}</span>
							</div>
						</div>
						<p>{community.bio}</p>
						<p className="text-sm">
							Creator:{" "}
							<Link
								href={`/profile/${community.creator.username}`}
								className="font-medium hover:text-primary text-foreground"
							>
								@{community.creator.username}
							</Link>
						</p>
						<p className="text-xs text-muted-foreground">
							Since:{" "}
							<span className="font-medium">
								{moment(community.createdAt).format("h:ma - MMM D,YYYY")}
							</span>
						</p>
					</div>
				</div>

				<div>
					<div className="absolute top-0 right-0">
						<OrganizationSwitcher />
					</div>
					{isMember && (
						<Button
							onClick={() => router.push(`/create-thread/${community.slug}`)}
							className="p-0 size-8 rounded-xl absolute bottom-0 right-0 "
						>
							<PlusCircle size={20} />
						</Button>
					)}
				</div>
			</div>
		);
	}
}
