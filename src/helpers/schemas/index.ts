import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    token: z.string(),
    role: z.nativeEnum(UserRole),
});

export const imo = z
    .number()
    .min(1000000, "IMO ледокола должно содержать 7 символов")
    .max(9999999, "IMO ледокола должно содержать 7 символов");
