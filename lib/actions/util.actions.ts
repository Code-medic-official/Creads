"use server";

import { iComment } from "../database/models/comment.model";
import { iCommunity } from "../database/models/community.model";
import { iThread } from "../database/models/thread.model";
import { iUser } from "../database/models/user.model";
import { getSearchComments } from "./comment.action";
import { getSearchCommunities } from "./community.actions";
import { getSearchThreads } from "./thread.actions";
import { getSearchUsers } from "./user.actions";

//? Server action to fetch search results
export const getSearchResults = async (q: string = "") => {
	const threadResults: iThread[] = await getSearchThreads(q);
	const accountResults: iUser[] = await getSearchUsers(q);
	const replyResults: iComment[] = await getSearchComments(q);
	const communityResults: iCommunity[] = await getSearchCommunities(q);
	return { threadResults, accountResults, replyResults, communityResults };
};
