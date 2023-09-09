import z from "zod";

const querystring = z.object({
    page: z.string().transform(Number).refine(Boolean).default("1"),
    pageSize: z.string().transform(Number).refine(Boolean).default("30"),
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
                id: z.number(),
                date: z.string(),
                iceCohesion: z.number(),
            }),
        ),
    })
    .describe("Список");

export const schema = {
    description: "Получение списка",
    tags: ["dayIceCohesion"],
    security: [{ bearerAuth: [] }],
    querystring,
    response: {
        200: response,
        401: userNotExists,
    },
};
