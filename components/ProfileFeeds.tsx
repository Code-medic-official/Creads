import { iComment } from "@/lib/database/models/comment.model";
import { iThread } from "@/lib/database/models/thread.model";
import { BookText, Image, MessageSquareQuote } from "lucide-react";
import ThreadCard from "./cards/ThreadCard";
import ReplyCard from "./ReplyCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default async function ProfileFeeds({
	feeds,
	replies,
}: {
	feeds: iThread[];
	replies: iComment[];
}) {
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
