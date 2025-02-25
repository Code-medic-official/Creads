import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/glowing-stars";
import { TECH_STACKS } from "@/constants";
import { ArrowRight, Boxes } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function TechCarousel() {
	return (
		<>
			<h3 className="mb-3 text-xl sm:text-2xl md:text-4xl font-medium flex items-center gap-x-1">
				<Boxes />
				<span>Tech Stack</span>
			</h3>

			<Carousel
				// plugins={[Autoplay({ delay: 3500 })]}
				className="w-[97vw] md:w-[95vw]"
			>
				<CarouselContent>
					{TECH_STACKS.map((stack, i) => (
						<CarouselItem
							key={i}
							className="pl-5 basis-[90%] sm:basis-[45%] min-[950px]:basis-[30%] min-[1450px]:basis-[22%] relative"
						>
							<Image
								src={stack.icon}
								priority
								width={30}
								height={30}
								alt="Stack-icon"
								className="roudend-full absolute top-3 left-8"
							/>
							<GlowingStarsBackgroundCard>
								<GlowingStarsTitle>{stack.title}</GlowingStarsTitle>
								<div className="flex justify-between items-end">
									<GlowingStarsDescription>
										{stack.description}
									</GlowingStarsDescription>
									<Link href={stack.link}>
										<Button size="icon" variant="secondary">
											<ArrowRight />
										</Button>
									</Link>
								</div>
							</GlowingStarsBackgroundCard>
						</CarouselItem>
					))}
				</CarouselContent>

				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</>
	);
}
