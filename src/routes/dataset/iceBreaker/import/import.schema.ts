import z from "zod";

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z.object({});

export const schema = {
    description: "Обновление пользователя администратором",
    tags: ["iceBreaker"],
    consumes: ["multipart/form-data"],
    body: {
        type: "object",
        properties: {
            dataset: {
                type: "file",
            },
        },
        required: ["dataset"],
    },
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};

const csvSchema = z.object({});

export const csvValidator = () => { };
