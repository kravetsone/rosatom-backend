import { imo } from "@helpers";
import z from "zod";

const body = z.object({
    imo,
    name: z
        .string()
        .trim()
        .min(
            3,
            "Название ледокола не может содержать в себе менее чем 3 символа",
        ),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = body.describe("Ответ");

export const schema = {
    description: "Создание ледокола администратором",
    tags: ["iceBreaker"],
    body,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
