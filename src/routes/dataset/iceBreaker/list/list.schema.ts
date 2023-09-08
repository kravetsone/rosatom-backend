import z from "zod";

const querystring = z.object({
    page: z.string().transform(Number).refine(Boolean).default("1"),
    pageSize: z.string().transform(Number).refine(Boolean),
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
                imo: z.number(),
                name: z.string(),
            }),
        ),
    })
    .describe("Список пользователй");

export const schema = {
    description: "Получение списка пользователей администратором",
    tags: ["iceBreaker"],
    security: [{ bearerAuth: [] }],
    querystring,
    response: {
        200: response,
        401: userNotExists,
    },
};
