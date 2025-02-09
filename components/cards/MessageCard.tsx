import { iMessage, MsgState } from "@/lib/database/models/message.model";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";
import moment from "moment";
import { Card, CardContent } from "../ui/card";

export default function MessageCard({
	msg,
	userId,
}: {
	msg: iMessage;
	userId: string;
}) {
	return (
		<div className={cn("flex", userId === msg.from && "flex-row-reverse")}>
			<Card
				className={cn(
					"rounded-2xl  w-fit border-none shadow-none",
					userId === msg.from
						? "rounded-br-sm bg-primary text-primary-foreground"
						: "rounded-bl-sm bg-secondary"
				)}
			>
				<CardContent className="p-3 pb-1">
					<p className="text-sm mb-3">{msg.body}</p>

					<div className="flex justify-between gap-x-5">
						<p
							className={cn(
								"text-xs",
								userId === msg.from
									? "text-secondary"
									: "text-muted-foreground  "
							)}
						>
							{moment(msg.createdAt).fromNow()}
						</p>
						<div>
							{msg.state === MsgState.RECIEVED ? (
								<CheckCheck stroke="#bbb" />
							) : msg.state === MsgState.READ ? (
								<CheckCheck stroke="purple" />
							) : (
								<Check />
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
