"use server"

import { iComment } from "../database/models/comment.model";
import { iThread } from "../database/models/thread.model";
import { iUser } from "../database/models/user.model";
import { getSearchComments } from "./comment.action";
import { getSearchThreads } from "./thread.actions";
import { getSearchUsers } from "./user.actions";

// Server action to fetch search results
export const getSearchQuery = async (q: string) => {
	console.log("searching");
	const threadResults: iThread[] = await getSearchThreads(q);
	const accountResults: iUser[] = await getSearchUsers(q);
	const replyResults: iComment[] = await getSearchComments(q);
	return { accountResults, replyResults, threadResults };
};