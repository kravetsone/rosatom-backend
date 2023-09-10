import z from "zod";

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .string()
    .describe("Сообщение о том что заявка успешно удалена");

export const schema = {
    description: "Удаление заяки администратором",
    tags: ["tanker"],
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
