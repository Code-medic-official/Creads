"use server";

import SearchForm from "@/components/forms/SearchForm";
import SearchFeed from "@/components/SearchFeed";
import { getSearchComments } from "@/lib/actions/comment.action";
import { getSearchThreads } from "@/lib/actions/thread.actions";
import { getSearchUsers } from "@/lib/actions/user.actions";
import { iComment } from "@/lib/database/models/comment.model";
import { iThread } from "@/lib/database/models/thread.model";
import { iUser } from "@/lib/database/models/user.model";

export const getSearchQuery = async (q: string) => {
	console.log("searching");
	const threadResults: iThread[] = await getSearchThreads(q);
	const accountResults: iUser[] = await getSearchUsers(q);
	const replyResults: iComment[] = await getSearchComments(q);
	await page(null, { accountResults, replyResults, threadResults });
};

// export default async function page(props, {threadResults, accountResults, replyResults}) {
export default async function page(props, results) {

	console.log(props)
	// const threadResults: iThread[] = results?.threadResults;
	// const accountResults: iUser[] = results?.accountResults;
	// const replyResults: iComment[] = results?.replyResults;

	// console.log(results);

	return (
		<div>
			<SearchForm qChange={getSearchQuery} />
			{true && (
				<>
					<section className="mt-3">
						<SearchFeed results={results} />
					</section>
				</>
			)}
		</div>
	);
}
