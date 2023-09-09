import z from "zod";

const params = z
    .object({
        iceBreakerId: z.preprocess(Number, z.number()),
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
    .describe("Сообщение о том что заявка успешно удалена");

export const schema = {
    description: "Удаление заяки администратором",
    tags: ["tankerRequest"],
    params,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
