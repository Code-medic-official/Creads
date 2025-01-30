import {
	createCommunity,
	delelteCommunity,
	getCommunity,
	upsertCommunity,
} from "@/lib/actions/community.actions";
import { getUser } from "@/lib/actions/user.actions";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export const POST = async (req: Request) => {
	const payload = await req.json();
	const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET!);
	const header = await headers();

	const svixId = header.get("svix-id");
	const svixSignature = header.get("svix-signature");
	const svixTimeStamp = header.get("svix-timestamp");

	if (!svixId || !svixSignature || !svixTimeStamp)
		return NextResponse.json({ msg: "Unauthorised" }, { status: 401 });

	let evt: WebhookEvent;

	try {
		evt = wh.verify(JSON.stringify(payload), {
			"svix-id": svixId,
			"svix-signature": svixSignature,
			"svix-timestamp": svixTimeStamp,
		}) as WebhookEvent;
	} catch (error: any) {
		console.error("Webhook verification failed:", error);
		return NextResponse.json({ message: error }, { status: 400 });
	}

	// ? Organisation created ✅
	if (evt.type === "organization.created") {
		const {
			created_by: creator,
			id: clerkId,
			image_url: imageUrl,
			name,
			slug,
		} = evt.data;

		try {
			await createCommunity({
				clerkId,
				name,
				slug,
				imageUrl,
				creator,
			});

			return NextResponse.json(
				{ msg: "Organisation Created" },
				{ status: 201 }
			);
		} catch (error: any) {
			return NextResponse.json({ err: "Organisation failed to create" }, { status: 500 });
		}
	}

	// ? Member Joins organization
	if (evt.type === "organizationMembership.created") {
		try {
			const {
				organization: { slug },
				public_user_data: { user_id: clerkId },
			} = evt.data;

			// Fetch community and the new member from mongo DB
			const community = await getCommunity(slug);
			const user = await getUser(undefined, clerkId);

			const membersList: string[] = community.members!.map(
				(member) => member._id
			);

			await upsertCommunity(
				{
					...community,
					members: [...membersList, user._id],
				},
				`/communities/${slug}`,
				slug
			);

			return NextResponse.json({ message: "Member Joined" }, { status: 201 });
		} catch (error: any) {
			return NextResponse.json({ err: "Member could not join" }, { status: 500 });
		}
	}

	// ? Member leaves or removed from organisation
	if (evt.type === "organizationMembership.deleted") {
		try {
			const {
				organization: { slug },
				public_user_data: { user_id },
			} = evt.data;

			// Fetch community and the new member from mongo DB
			const community = await getCommunity(slug);
			const user = await getUser(user_id);

			const membersList: string[] = community.members!.map(
				(member) => member._id
			);

			await upsertCommunity(
				{
					...community,
					members: membersList.filter((memberId) => memberId !== user._id),
				},
				`/communities/${slug}`,
				slug
			);

			return NextResponse.json({ message: "Member Removed" }, { status: 201 });
		} catch (error: any) {
			return NextResponse.json({ err: error }, { status: 500 });
		}
	}

	// ? Organisation gets updated.
	if (evt.type === "organization.updated") {
		try {
			const { id, image_url: imageUrl, name, slug } = evt?.data;
			console.log("updated", evt?.data);

			const community = await getCommunity(undefined, id);

			await upsertCommunity(
				{ ...community, name, imageUrl, slug },
				`/communities/${slug}`,
				undefined,
				id
			);

			return NextResponse.json(
				{ message: "Organisation Updated" },
				{ status: 201 }
			);
		} catch (error: any) {
			return NextResponse.json({ err: error }, { status: 500 });
		}
	}

	// ? Organisation gets deleted
	if (evt.type === "organization.deleted") {
		try {
			const { id: clerkId } = evt.data;

			await delelteCommunity(clerkId as string, "/communities");

			return NextResponse.json(
				{ msg: "Organisation deleted." },
				{ status: 201 }
			);
		} catch (error: any) {
			return NextResponse.json({ err: error }, { status: 500 });
		}
	}


	// return NextResponse.json({ success: true }, { status: 200 });
};
