// "use server";

// import SearchForm from "@/components/forms/SearchForm";
// import SearchFeed from "@/components/SearchFeed";
// import { getSearchComments } from "@/lib/actions/comment.action";
// import { getSearchThreads } from "@/lib/actions/thread.actions";
// import { getSearchUsers } from "@/lib/actions/user.actions";
// import { iComment } from "@/lib/database/models/comment.model";
// import { iThread } from "@/lib/database/models/thread.model";
// import { iUser } from "@/lib/database/models/user.model";

// export const getSearchQuery = async (q: string) => {
// 	console.log("searching");
// 	const threadResults: iThread[] = await getSearchThreads(q);
// 	const accountResults: iUser[] = await getSearchUsers(q);
// 	const replyResults: iComment[] = await getSearchComments(q);
// 	await page(null, { accountResults, replyResults, threadResults });
// };

// export const dynamic = "force-dynamic";

// // export default async function page(props, {threadResults, accountResults, replyResults}) {
// export default async function page(props, results) {
// 	console.log(props);

// 	return (
// 		<div>
// 			<SearchForm qChange={getSearchQuery} />
// 			{true && (
// 				<>
// 					<section className="mt-3">
// 						<SearchFeed results={results} />
// 					</section>
// 				</>
// 			)}
// 		</div>
// 	);
// }

import SearchForm from "@/components/forms/SearchForm";
import SearchFeed from "@/components/SearchFeed";
import { getSearchQuery } from "@/lib/actions/util.actions";

// ⚠️ Add this to force dynamic rendering
export const dynamic = "force-dynamic";

// Page component
export default async function SearchPage({
	searchParams,
}: {
	searchParams: { q?: string };
}) {
	// Fetch search results based on the query parameter
	const results = searchParams.q ? await getSearchQuery(searchParams.q) : null;

	return (
		<div>
			<SearchForm />
			{results && (
				<section className="mt-3">
					<SearchFeed results={results} />
				</section>
			)}
		</div>
	);
}
