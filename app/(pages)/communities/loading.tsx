import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function loading() {
	return (
		<div className="space-y-3">
      <div className="flex items-center justify-between" >

			<Skeleton className="w-1/3 h-7 rounded-full" />
			<Skeleton className="w-28 h-7 rounded-full" />
      </div>
			{[1, 2, 3, 4, 5, 6].map((n) => (
				<Skeleton key={n} className="w-full rounded-xl h-28" />
			))}
		</div>
	);
}
