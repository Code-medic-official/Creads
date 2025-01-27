import { z } from "zod";

export const commentSchema = z.object({
	body: z.string().max(300),
	thread: z.string(),
	refComment: z.string().nullable(),
	user: z.string(),
});
