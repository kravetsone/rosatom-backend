import { IceClass } from "@prisma/client";
import z from "zod";

const querystring = z.object({
    page: z.string().transform(Number).refine(Boolean).default("1"),
    pageSize: z.string().transform(Number).refine(Boolean).default("100"),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        pageCount: z.number(),
        items: z.array(
            z.object({
                startPoint: z.string(),
                endPoint: z.string(),
                startTime: z.number(),
                endTime: z.number(),
                id: z.number(),
                tanker: z.object({
                    imo: z.number(),
                    name: z.string(),
                    speed: z.number(),
                    iceClass: z.nativeEnum(IceClass),
                }),
            }),
        ),
    })
    .describe("Список");

export const schema = {
    description: "Получение списка",
    tags: ["tankerRequest"],
    security: [{ bearerAuth: [] }],
    querystring,
    response: {
        200: response,
        401: userNotExists,
    },
};
