import { z } from "zod";
import { ThreadPrivacy } from "../database/models/thread.model";

export const threadSchema = z.object({
	caption: z.string().min(3).max(500),
	user: z.string(),
	community: z.string().nullable(),
	image: z.string().optional(),
	privacy: z.nativeEnum(ThreadPrivacy).default(ThreadPrivacy.PUBLIC),
});
