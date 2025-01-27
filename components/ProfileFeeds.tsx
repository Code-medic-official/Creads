import { getUserThreads } from "@/lib/actions/thread.actions";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ThreadCard from "./cards/ThreadCard";
import { iThread } from "@/lib/database/models/thread.model";
import { getUserComments } from "@/lib/actions/comment.action";
import ReplyCard from "./ReplyCard";
import { iComment } from "@/lib/database/models/comment.model";
import { BookText, Image, MessageSquareQuote } from "lucide-react";

export default async function ProfileFeeds({ userId }: { userId: string }) {
	const feeds = (await getUserThreads(userId)) as iThread[];
	const replies = (await getUserComments(userId)) as iComment[];

	return (
		<Tabs defaultValue="Threads">
			<TabsList className=" sticky top-[3.6rem] z-20">
				<TabsTrigger value="Threads">
					{" "}
					<BookText size={18} /> Threads
				</TabsTrigger>
				<TabsTrigger value="Replies">
					{" "}
					<MessageSquareQuote size={20} /> Replies
				</TabsTrigger>
				<TabsTrigger value="Media">
					{" "}
					<Image size={18} /> Media
				</TabsTrigger>
			</TabsList>

			<TabsContent value="Threads" className="space-y-3">
				{feeds.map((thread) => (
					<ThreadCard key={thread._id} thread={thread} />
				))}
			</TabsContent>

			<TabsContent value="Replies" className="space-y-5">
				{replies.map((reply) => (
					<ReplyCard key={reply._id} reply={reply} />
				))}
			</TabsContent>
		</Tabs>
	);
}
