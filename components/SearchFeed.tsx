import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { iComment } from "@/lib/database/models/comment.model";
import { iCommunity } from "@/lib/database/models/community.model";
import { iThread } from "@/lib/database/models/thread.model";
import { iUser } from "@/lib/database/models/user.model";
import ThreadCard from "./cards/ThreadCard";
import UserCard from "./cards/UserCard";
import ReplyCard from "./ReplyCard";
import { Badge } from "./ui/badge";
import {
	BookText,
	MessageSquareQuote,
	UserCircle,
	UsersIcon,
} from "lucide-react";
import CommunityCard from "./cards/CommunityCard";
import Void from "./Void";

export default function SearchFeed({
	results,
}: {
	results: {
		accountResults: iUser[];
		replyResults: iComment[];
		threadResults: iThread[];
		communityResults: iCommunity[];
	};
}) {
	const threadResults: iThread[] = results?.threadResults ?? [];
	const replyResults: iComment[] = results?.replyResults ?? [];
	const accountResults: iUser[] = results?.accountResults ?? [];
	const communityResults: iCommunity[] = results?.communityResults ?? [];

	return (
		<Tabs defaultValue="Threads">
			<TabsList className="sticky top-[3.6rem] z-30">
				<TabsTrigger
					value="Threads"
					className="collapsible-tab px-1 rounded-xl"
				>
					<div className="flex items-center">
						<BookText size={18} />
						<span className="hidden sm:text-xs lg:text-sm">Threads</span>
						<Badge variant="secondary" className="text-primary text-xs ml-1">
							{threadResults.length}
						</Badge>
					</div>
				</TabsTrigger>
				<TabsTrigger
					value="Replies"
					className="px-1 rounded-xl collapsible-tab"
				>
					<div className="flex items-center">
						<MessageSquareQuote size={20} />
						<span className="hidden sm:text-xs lg:text-sm">Replies</span>
						<Badge variant="secondary" className="text-primary text-xs ml-1">
							{replyResults.length}
						</Badge>
					</div>
				</TabsTrigger>
				<TabsTrigger
					value="Accounts"
					className="px-1 rounded-xl collapsible-tab"
				>
					<div className="flex items-center">
						<UserCircle size={20} />
						<span className="hidden sm:text-xs lg:text-sm">Accounts</span>
						<Badge variant="secondary" className="text-primary text-xs ml-1">
							{accountResults.length}
						</Badge>
					</div>
				</TabsTrigger>
				<TabsTrigger
					value="Communities"
					className="px-1 rounded-xl collapsible-tab"
				>
					<div className="flex items-center">
						<UsersIcon size={18} />
						<span className="hidden sm:text-xs lg:text-sm">Communities</span>
						<Badge variant="secondary" className="text-primary text-xs ml-1">
							{communityResults.length}
						</Badge>
					</div>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="Threads" className="space-y-3">
				{threadResults?.length > 0 ? (
					threadResults?.map((thread, i) => {
						// console.log(thread);
						return <ThreadCard key={i} thread={thread} />;
					})
				) : (
					<Void msg="Sorry, no Thread results match your search😢" />
				)}
		</TabsContent>

			<TabsContent value="Accounts" className="space-y-3">
				{accountResults?.length > 0 ? (
					accountResults?.map((user, i) => (
						<UserCard key={i} _user={user} variant="lg" />
					))
				) : (
					<Void msg="Sorry, no Account results match your search😢" />
				)}
			</TabsContent>

			<TabsContent value="Replies" className="space-y-4">
				{replyResults?.length > 0 ? (
					replyResults?.map((comment, i) => (
						<ReplyCard key={i} reply={comment} />
					))
				) : (
					<Void msg="Sorry, no Replies results match your search😢" />
				)}
			</TabsContent>

			<TabsContent value="Communities" className="space-y-4">
				{communityResults?.length > 0 ? (
					communityResults?.map((community, i) => (
						<CommunityCard
							key={i}
							community={community}
							variant="sm"
							isMember
						/>
					))
				) : (
					<Void msg="Sorry, no Communities results match your search😢" />
				)}
			</TabsContent>
		</Tabs>
	);
}
