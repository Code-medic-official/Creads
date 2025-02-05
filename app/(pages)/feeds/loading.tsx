import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
	return (
		<div>
			<Skeleton className="w-1/3 h-7 rounded-xl mx-auto mb-4" />

			<div className="space-y-2">
				{[...Array(10)].map((v, i) => (
					<Skeleton key={i} className="w-full h-28 rounded-xl" />
				))}
			</div>
		</div>
	);
}
