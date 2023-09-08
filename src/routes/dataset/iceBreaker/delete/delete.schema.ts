import z from "zod";

const params = z
    .object({
        iceBreakerImo: z.preprocess(Number, z.number()),
    })
    .describe("Айди пользователя");

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        message: z.string(),
    })
    .describe("Сообщение о том что ледокол успешно удалён");

export const schema = {
    description: "Удаление ледокола администратором",
    tags: ["iceBreaker"],
    params,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
