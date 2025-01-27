"use client"

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { iThread } from "@/lib/database/models/thread.model";
import { iUser } from "@/lib/database/models/user.model";
import { iComment } from "@/lib/database/models/comment.model";
import ThreadCard from "./cards/ThreadCard";
import UserCard from "./cards/UserCard";
import ReplyCard from "./ReplyCard";

export default function SearchFeed({ results }) {
	const threadResults: iThread[] = results?.threadResults;
	const accountResults: iUser[] = results?.accountResults;
	const replyResults: iComment[] = results?.replyResults;


  console.log(results)

	return (
		<Tabs defaultValue="Threads">
			<TabsList className=" sticky top-[3.6rem]">
				<TabsTrigger value="Threads">Threads</TabsTrigger>
				<TabsTrigger value="Accounts">Accounts</TabsTrigger>
				<TabsTrigger value="Replies">Replies</TabsTrigger>
				<TabsTrigger value="Communities">Communities</TabsTrigger>
			</TabsList>

			<TabsContent value="Threads" className="space-y-3">
				{threadResults?.map((thread, i) => {
					console.log(thread);
					return <ThreadCard key={i} thread={thread} />;
				})}
			</TabsContent>

			<TabsContent value="Accounts" className="space-y-3">
				{accountResults?.map((user, i) => (
					<UserCard key={i} _user={user} variant="lg" />
				))}
			</TabsContent>

			<TabsContent value="Replies" className="space-y-4">
				{replyResults?.map((comment, i) => (
					<ReplyCard key={i} reply={comment} />
				))}
			</TabsContent>
		</Tabs>
	);
}
