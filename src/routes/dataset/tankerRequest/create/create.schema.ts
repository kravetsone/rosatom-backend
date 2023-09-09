import { imo } from "@helpers";
import { IceClass } from "@prisma/client";
import z from "zod";

const body = z.object({
    startPoint: z.string(),
    endPoint: z.string(),
    startDateTime: z.string(),
    endDateTime: z.string(),
    imo,
    name: z
        .string()
        .trim()
        .min(
            3,
            "Название ледокола не может содержать в себе менее чем 3 символа",
        ),
    iceClass: z.nativeEnum(IceClass),
    speed: z.number(),
});
const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        startPoint: z.string(),
        endPoint: z.string(),
        startDateTime: z.string(),
        endDateTime: z.string(),
        tanker: z.object({
            imo: z.number(),
            name: z.string(),
            iceClass: z.nativeEnum(IceClass),
            speed: z.number(),
        }),
    })
    .describe("Ответ");

export const schema = {
    description: "Создание заявки ледокола администратором",
    tags: ["tankerRequest"],
    body,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
