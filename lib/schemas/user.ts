import { z } from "zod";

export const userSchema = z.object({
	age: z.coerce.number().min(5, "You must be above 5 yrs old to use Creads!"),
	bio: z.string().min(2).max(300),
	onboarded: z.boolean().default(true),
});
