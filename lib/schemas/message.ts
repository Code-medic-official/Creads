import { z } from "zod";

export const messageSchema = z.object({
	body: z.string().max(1000).min(2, "Message should be at least 2 characters!"),
	from: z.string(),
	to: z.string(),
	refMessage: z.string().nullable(),
});
