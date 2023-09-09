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
    tags: ["dayIceCohesion"],
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

const csvSchema = z.array(
    z.object({
        edge_num: z.number({
            invalid_type_error: "edge_num должно быть числом",
            required_error: "Номер ребра (edge_num) обязательное поле массива",
        }),
        date: z.preprocess(
            String,
            z.string({
                invalid_type_error:
                    "date должен быть строкой в формате ДД.ММ.ГГГГ",
                required_error: "Дата (date) обязательное поле массива",
            }),
        ),
        // .regex(
        //     /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/,
        //     "Дата должна быть указана в формате ДД.ММ.ГГГГ",
        // ),
        ice_strength: z
            .number({
                invalid_type_error:
                    "ice_strength должен быть числом от 0 до 10",
                required_error:
                    "Сплоченность льда в баллах (ice_strength) обязательное поле массива",
            })
            .min(
                0,
                "Сплоченность льда в баллах (ice_strength) от 0 (чистая вода) до 10 (сплошной лёд)",
            )
            .max(
                10,
                "Сплоченность льда в баллах (ice_strength) от 0 (чистая вода) до 10 (сплошной лёд)",
            ),
    }),
);

export const csvValidator = (data: unknown) => {
    return csvSchema.parse(data);
};
