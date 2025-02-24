"use client";

import { createFeedback } from "@/lib/actions/feedback.action";
import { iUser } from "@/lib/database/models/user.model";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Loader, MessageCircleHeart, SendHorizonal, Star } from "lucide-react";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger,
} from "./ui/animated-modal";
import { Button } from "./ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const dynamic = "force-dynamic";

export default function Feedback({ user }: { user: iUser }) {
	const isSmScreen = useMediaQuery("(max-width: 425px)");

	if (isSmScreen) {
		return (
			<Drawer>
				<DrawerTrigger>
					<FeedbackBtn />
				</DrawerTrigger>

				<DrawerContent className="p-3">
					<div className="hidden">
						<DrawerTitle>Feedback form</DrawerTitle>
						<DrawerDescription>Help make the app grow!</DrawerDescription>
					</div>

					<FeedBackForm user={user!} />
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Modal>
			<ModalTrigger>
				<FeedbackBtn />
			</ModalTrigger>

			<ModalBody>
				<ModalContent>
					<FeedBackForm user={user!} />
				</ModalContent>
			</ModalBody>
		</Modal>
	);
}

const FeedbackBtn = () => (
	<HoverBorderGradient
		containerClassName="rounded-full w-fit z-20"
		as="div"
		className="text-primary text-sm font-medium border border-primary shadow-sm bg-primary/15 backdrop-blur-md flex items-center gap-x-1 cursor-pointer fixed bottom-5 right-5 hover:bg-gradient-to-br from-purple-500 to-indigo-500 hover:scale-105 hover:text-background transition-all ease-in"
	>
		<MessageCircleHeart size={20} />
		<span>Feedback</span>
	</HoverBorderGradient>
);

const FeedBackForm = ({ user }: { user: iUser }) => {
	const [rating, setRating] = useState<number>(0);
	const [feedback, setFeedback] = useState<string>("");
	const [isPending, startTransition] = useTransition();
	// const router = useRouter();

	const sendFeedBackHandler = async () => {
		if (!user) {
			toast("Please sign in");
			redirect("/sign-in");
		}

		startTransition(
			async () =>
				await createFeedback({ body: feedback, rating, user: user._id! })
		);

		toast.success("Thanks for the Feedback🤗");
	};

	return (
		<div>
			<h3 className="mb-4 flex items-center gap-x-1 text-xl md:text-2xl font-medium text-primary">
				<MessageCircleHeart size={30} />
				<span>Feedback</span>
			</h3>
			<p className="text-sm text-muted-foreground">
				Help make the app better🤗
			</p>

			<Label className="mt-3">Ratings:</Label>
			<div className="flex items-center gap-x-3 w-fit mx-auto ">
				<Star
					size={27}
					fill={rating >= 1 ? "#fbce41" : "transparent"}
					stroke="#fbce41"
					onClick={() => setRating(1)}
					className="cursor-pointer"
				/>
				<Star
					size={27}
					fill={rating >= 2 ? "#fbce41" : "transparent"}
					stroke="#fbce41"
					onClick={() => setRating(2)}
					className="cursor-pointer"
				/>
				<Star
					size={27}
					fill={rating >= 3 ? "#fbce41" : "transparent"}
					stroke="#fbce41"
					onClick={() => setRating(3)}
					className="cursor-pointer"
				/>
				<Star
					size={27}
					fill={rating >= 4 ? "#fbce41" : "transparent"}
					stroke="#fbce41"
					onClick={() => setRating(4)}
					className="cursor-pointer"
				/>
				<Star
					size={27}
					fill={rating >= 5 ? "#fbce41" : "transparent"}
					stroke="#fbce41"
					onClick={() => setRating(5)}
					className="cursor-pointer"
				/>
			</div>

			<Textarea
				rows={5}
				placeholder="So, what do u think about the app?👀"
				onChange={(e) => setFeedback(e.target.value)}
				className="w-full mt-2"
			/>

			<Button
				size="sm"
				disabled={isPending}
				onClick={sendFeedBackHandler}
				className="w-1/3 mx-auto mt-4 flex items-center"
			>
				<span>Send</span>
				{isPending ? <Loader className="animate-spin" /> : <SendHorizonal />}
			</Button>
		</div>
	);
};
