import { PanelRight } from "lucide-react";
import RightPannel from "./RightPannel";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Suspense } from "react";

export default function RightPannelSheet() {
	return (
		<Sheet>
			<Tooltip>
				<TooltipTrigger asChild>
					<SheetTrigger className="sm:hidden" asChild>
						<Button size="icon" variant="outline">
							<PanelRight />
						</Button>
					</SheetTrigger>
				</TooltipTrigger>
				<TooltipContent>Open communites</TooltipContent>
			</Tooltip>

			<SheetContent side="right" className="bg-secondary p-0">
				<SheetTitle className="hidden">Suggested Communities</SheetTitle>
					<RightPannel />
			</SheetContent>
		</Sheet>
	);
}
