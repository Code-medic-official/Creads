import { getThreadComments } from "@/lib/actions/comment.action";
import { getActiveUser } from "@/lib/actions/user.actions";
import { iThread } from "@/lib/database/models/thread.model";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import AvatarGroup from "../AvatarGroup";
import Engagement from "../Engagement";
import FollowBtn from "../FollowBtn";
import { Card, CardContent } from "../ui/card";
import UserCard from "./UserCard";

export default async function ThreadCard({ thread }: { thread: iThread }) {
	const user = await getActiveUser();
	const comments = await getThreadComments(thread._id);
	
	return (
		<Card className="bg-secondary hover:shadow-md">
			<CardContent className="p-3">
				<div className="flex items-center justify-between">
					<UserCard _user={thread.user} variant="sm" />

					{thread.user._id !== user?._id && <FollowBtn _user={thread.user} />}
				</div>

				<div className="mt-1 ml-3 pt-2 pl-4 border-l-2 border-l-muted-foreground/20">
					<Link
						href={`/thread/${thread._id}`}
						className="text-sm cursor-pointer pl-1"
					>
						{thread.caption}
					</Link>

					<div className="flex items-center justify-between">
						<Engagement item={thread} variant="THREAD" />

						<span className="text-xs text-muted-foreground">
							{moment(thread.createdAt).format("h:ma - MMM D,YYYY")}
						</span>
					</div>
				</div>

				<div className="flex items-center gap-x-1">
					<AvatarGroup items={comments} />
					{thread.community && (
						<>
							{" "}
							<Link
								href={`/communities/${thread.community.slug}`}
								className="font-medium text-xs text-muted-foreground hover:text-primary flex items-center gap-x-1"
							>
								-<p>{thread.community.name}</p>
								<Image
									src={thread.community.imageUrl}
									width={20}
									height={20}
									priority
									alt="community image"
									className="rounded-full object-cover size-5"
								/>
							</Link>
						</>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
