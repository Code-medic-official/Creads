import SearchFeed from "@/components/SearchFeed";
import { getSearchResults } from "@/lib/actions/util.actions";
import { Search } from "lucide-react";

// ⚠️ Add this to force dynamic rendering
export const dynamic = "force-dynamic";

export default async function SearchPage({
	params,
}: {
	params: Promise<{ q: string }>;
}) {
	const { q } = await params;
	const results = await getSearchResults(decodeURIComponent(q));

	return (
		<div>
			<h2 className="text-muted-foreground text-sm md:text-base flex items-center gap-x-1">
				<Search />
				<p>
					<span>Results for: </span>
					<span className="font-medium text-base md:text-xl">
						{`"${decodeURIComponent(q)}"`}
					</span>
				</p>
			</h2>
			{!!results || <p>Loadin...</p>}
			<section className="mt-3">
				<SearchFeed results={results} />
			</section>
		</div>
	);
}
