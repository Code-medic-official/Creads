"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { upsertUser } from "@/lib/actions/user.actions";
import { iUser } from "@/lib/database/models/user.model";
import { userSchema } from "@/lib/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, User } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Textarea } from "../ui/textarea";

export default function UserForm({
	user,
}: Readonly<{
	user?: iUser | undefined;
}>) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			bio: "",
			age: "",
			onboarded: true,
		},
	});

	const updateUserHandler = (
		data: z.infer<typeof userSchema>
	): Promise<void> => {
		startTransition(async () => await upsertUser({ ...user, ...data }));

		form.reset();

		toast.success("Onboarding Successfull");
		redirect("/feeds");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(updateUserHandler)}
				className="w-full mx-auto border rounded-md p-3 space-y-3"
			>
				<h3 className="text-center font-semibold text-xl">User Form</h3>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Bio:</FormLabel>

							<FormControl>
								<Textarea
									{...field}
									placeholder={user.bio ?? "your bio..."}
								></Textarea>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Age:</FormLabel>

							<FormControl>
								<Input type="number" {...field} placeholder="Age" />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				{isPending ? (
					<Button
						disabled={isPending}
						className="rounded-lg space-x-1 flex items-center justify-center gap-1 w-2/3 mx-auto"
					>
						Onboarding <Loader size={20} className="animate-spin" />
					</Button>
				) : (
					<Button
						disabled={isPending}
						className="rounded-xl space-x-1 flex items-center justify-center gap-1 w-2/3 mx-auto"
					>
						Submit <User size={20} />
					</Button>
				)}
			</form>
		</Form>
	);
}
