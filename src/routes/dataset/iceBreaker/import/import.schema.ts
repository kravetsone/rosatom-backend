import z from "zod";

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z.object({
    message: z.string(),
});

export const schema = {
    description: "Импорт csv",
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
//наименование судна (ледокола) | imo
const csvSchema = z.array(
    z.object({
        imo: z
            .number({
                invalid_type_error: "imo должно быть числом",
                required_error:
                    "Уникальный номер (imo) обязательное поле массива",
            })
            .min(1000000)
            .max(9999999),
        icebreaker_name: z.string({
            invalid_type_error: "icebreaker_name должен быть строкой",
            required_error: "Дата (icebreaker_name) обязательное поле массива",
        }),
    }),
);

export const csvValidator = (data: unknown) => {
    return csvSchema.parse(data);
};
