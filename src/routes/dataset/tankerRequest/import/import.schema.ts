import { IceClass } from "@prisma/client";
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
    tags: ["tankerRequest"],
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
//tanker_name,imo,ice_class,speed,start_point,end_point,start_time,end_time
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
        ice_class: z.nativeEnum(IceClass),
        speed: z.number({
            invalid_type_error: "speed должно быть числом",
            required_error: "Скорость (speed) обязательное поле массива",
        }),
        start_point: z.string({
            invalid_type_error: "start_point должно быть числом",
            required_error:
                "Начальная точка (start_point) обязательное поле массива",
        }),
        end_point: z.string({
            invalid_type_error: "end_point должно быть числом",
            required_error:
                "Конечная точка (end_point) обязательное поле массива",
        }),
        start_time: z.string({
            invalid_type_error: "start_time должно быть числом",
            required_error:
                "Время начала (start_time) обязательное поле массива",
        }),
        end_time: z.string({
            invalid_type_error: "end_time должно быть числом",
            required_error: "Время конца (end_time) обязательное поле массива",
        }),
        tanker_name: z.string({
            invalid_type_error: "tanker_name должен быть строкой",
            required_error:
                "Название судна (tanker_name) обязательное поле массива",
        }),
    }),
);

export const csvValidator = (data: unknown) => {
    return csvSchema.parse(data);
};
