"use client";

import { iCommunity } from "@/lib/database/models/community.model";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useMediaQuery } from "@uidotdev/usehooks";
import { PlusCircle, Users2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useState, useEffect } from "react";
import { getActiveUser } from "@/lib/actions/user.actions";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

export default function CommunityCard({
	variant,
	community,
}: {
	variant: "sm" | "lg" | "xs";
	community: iCommunity;
}) {
	const [isMember, setIsMember] = useState<boolean>(false);

	const router = useRouter();
	const isMdDevice = useMediaQuery("min-width: 768px");
	const isSmDevice = useMediaQuery("min-width: 640px");
	const { theme } = useTheme();

	useEffect(() => {
		const checkActiveUser = async () => {
			const user = await getActiveUser();

			setIsMember(
				!!community.members?.find((member) => member._id === user?._id)
			);
		};

		checkActiveUser();
	}, [community]);

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
							<div className="text-primary flex items-center gap-x-1">
								<Users2 size={18} />
								<span className="font-medium text-sm">
									{community.members!.length}
								</span>
							</div>
							{/* {isMember || <Button size="sm">Join</Button>} */}
						</div>
					</CardContent>
				</Link>
			</Card>
		);
	} else if (variant === "lg") {
		return (
			<div>
				<div className="flex gap-x-2">
					<Image
						src={community.imageUrl}

						width={isMdDevice ? 128 : isSmDevice ? 96 : 80}
						height={isMdDevice ? 128 : isSmDevice ? 96 : 80}
						quality={100}
						alt="Community image"
						priority
						className="rounded-lg object-cover size-20 sm:size-24 md:size-32"
					/>
					<div className="flex-1 text-xs sm:text-sm text-muted-foreground relative leading-3">
						<div className="flex items-center gap-x-2">
							<p className="font-bold text-base md:text-xl text-foreground">
								{community.name}
							</p>
							<div className="text-primary flex items-center gap-x-1">
								<Users2 size={20} />
								<span className="font-medium">{community.members!.length}</span>
							</div>
						</div>

						<p className="text-sm">
							<span className="text-xs">Creator</span>:{" "}
							<Link
								href={`/profile/${community.creator.username}`}
								className="font-medium hover:text-primary text-foreground"
							>
								@{community.creator.username}
							</Link>
						</p>
						<div className="text-xs text-muted-foreground">
							Since:{" "}
							<span className="font-medium">
								{moment(community.createdAt).format("h:ma - MMM D,YYYY")}
							</span>
							<span className="absolute hidden md:block top-0 right-0">
								<OrganizationSwitcher appearance={{baseTheme: theme === "dark" ? dark : undefined}} />
							</span>
						</div>

						{/* Actions */}
						<div>
							<div className="absolute md:hidden block -bottom-2 -left-1">
								<OrganizationSwitcher  appearance={{baseTheme: theme === "dark" ? dark : undefined}} />
							</div>
							{isMember && (
								<Button
									onClick={() =>
										router.push(`/create-thread/${community.slug}`)
									}
									className="p-0 size-8 rounded-xl absolute bottom-0 right-0 "
								>
									<PlusCircle size={20} />
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
