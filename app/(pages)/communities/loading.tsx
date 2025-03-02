import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
	return (
		<div className="space-y-3">
			<Skeleton className="w-1/3 mx-auto h-7 rounded-full" />
			{[...Array(6)].map((n, i) => (
				<Skeleton key={i} className="w-full rounded-xl h-28" />
			))}
		</div>
	);
}
