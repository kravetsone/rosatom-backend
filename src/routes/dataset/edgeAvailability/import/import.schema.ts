import z from "zod";

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z.object({});

export const schema = {
    description: "Импорт csv",
    tags: ["edgeAvailability"],
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
//edge_num,icebreaker_name,feasible
const csvSchema = z.array(
    z.object({
        edge_num: z.number({
            invalid_type_error: "edge_num должно быть числом",
            required_error: "Номер ребра (edge_num) обязательное поле массива",
        }),
        icebreaker_name: z.string({
            invalid_type_error: "icebreaker_name должен быть строкой",
            required_error: "Дата (icebreaker_name) обязательное поле массива",
        }),
        feasible: z
            .number({
                invalid_type_error: "feasible должен быть числом от 0 до 1",
                required_error:
                    "оступность ребра для ледокола (feasible) обязательное поле массива",
            })
            .min(0, "feasible должен быть числом от 0 до 1")
            .max(1, "feasible должен быть числом от 0 до 1"),
    }),
);

export const csvValidator = (data: unknown) => {
    return csvSchema.parse(data);
};
