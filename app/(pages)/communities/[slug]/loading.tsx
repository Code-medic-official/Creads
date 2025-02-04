import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
	return (
		<div>
			<section className="flex gap-x-2">
				<Skeleton className="size-20 sm:size-24 md:size-32 rounded-e-xl" />
				<div className="space-y-1">
					<Skeleton className="h-4 w-24 rounded-xl" />
					<Skeleton className="h-4 w-28 rounded-xl" />
					<Skeleton className="h-4 w-20 rounded-xl" />
				</div>
			</section>

			<Skeleton className="w-1/3 mt-4 h-6 mx-auto rounded-xl " />

			<section className="mt-3 space-y-2">
				{[...Array(10)].map((v, i) => (
					<Skeleton key={i} className="w-full rounded-xl h-28" />
				))}
			</section>
		</div>
	);
}
