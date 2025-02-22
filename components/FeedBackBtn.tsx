"use client";

import { Loader, MessageCircleHeart, SendHorizonal, Star } from "lucide-react";
import React, { useState, useTransition } from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalTrigger,
} from "./ui/animated-modal";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import toast from "react-hot-toast";
import { useMediaQuery } from "@uidotdev/usehooks";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";

export default function FeedBackBtn() {
	const isSmScreen = useMediaQuery("(max-width: 425px)");

	if (isSmScreen) {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<HoverBorderGradient
						containerClassName="rounded-full"
						as="div"
						className="text-primary font-medium bg-background flex items-center space-x-2 fixed bottom-5 right-5"
					>
						<MessageCircleHeart />
						<span>Feedback</span>
					</HoverBorderGradient>

				</DrawerTrigger>

				<DrawerContent className="p-3">
					<div className="hidden">
						<DrawerTitle>Feedback form</DrawerTitle>
						<DrawerDescription>Help make the app grow!</DrawerDescription>
					</div>

					<FeedBackForm />
				</DrawerContent>
			</Drawer>
		);
	} else {
		return (
			<Modal>
				<ModalTrigger>
					<HoverBorderGradient
						containerClassName="rounded-full"
						as="div"
						className="text-primary bg-background flex items-center space-x-2 fixed bottom-5 right-5"
					>
						<MessageCircleHeart />
						<span>Feedback</span>
					</HoverBorderGradient>
				</ModalTrigger>

				<ModalBody>
					<ModalContent>
						<FeedBackForm />
					</ModalContent>
				</ModalBody>
			</Modal>
		);
	}
}

const FeedBackForm = () => {
	const [rating, setRating] = useState<number>(0);
	const [feedback, setFeedback] = useState<string>("");
	const [isPending, startTransition] = useTransition();

	const sendFeedBackHandler = async () => {
		startTransition(() => console.log(rating, feedback));

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
