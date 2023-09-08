import z from "zod";

const params = z.object({
    iceBreakerImo: z.preprocess(Number, z.number()),
});
const body = z
    .object({
        name: z.string(),
    })
    .describe("Данные для обновления");

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z.object({
    imo: z.number(),
    name: z.string(),
});

export const schema = {
    description: "Обновление",
    tags: ["iceBreaker"],
    body,
    params,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
