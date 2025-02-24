import { iMessage } from "@/lib/database/models/message.model";
import { iUser } from "@/lib/database/models/user.model";
import moment from "moment";
import Link from "next/link";
import OnlineBadge from "../OnlineBadge";
import { Card, CardContent } from "../ui/card";
import UserCard from "./UserCard";

export default async function ChatCard({
	_user,
	lastMsg,
	variant = "default",
}: {
	_user: iUser;
	lastMsg?: iMessage;
	variant?: "default" | "header";
}) {
	if (variant === "default") {
		return (
			<Link href={`/chat/${_user.username}`} className="block">
				<Card className="cursor-pointer  rounded-xl border-none bg-secondary transition-all duration-100 ease-in hover:shadow-md hover:bg-primary/40">
					<CardContent className="p-2">
						<div className="flex items-center justify-between">
							<UserCard _user={_user} variant="sm" />

							<OnlineBadge />
						</div>

						<div className=" ml-12 text-sm font-medium text-muted-foreground">
							{lastMsg ? (
								<p>
									<span>{lastMsg.body}</span>
									<span>{moment(lastMsg.createdAt).fromNow(true)}</span>
								</p>
							) : (
								<p>Start chatting with buddies💭</p>
							)}
						</div>
					</CardContent>
				</Card>
			</Link>
		);
	} else if (variant === "header") {
		return (
			<Card className="rounded-xl border bg-secondary/40 backdrop-blur-lg shadow-none">
				<CardContent className="p-2 flex gap-x-2 relative">
					<div className="flex-1">
						<div className="">
							<UserCard _user={_user} variant="md" />

							<div className="absolute top-1 right-2">
								<OnlineBadge />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}
}
