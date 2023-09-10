import { imo } from "@helpers";
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
    tags: ["schedule"],
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
        Судно: z.string(),
        "Номер Заявки": z.number(),
        Ледокол: z.string(),
        Начало: z.string(),
        Окончание: z.string(),
        "Начальный отрезок": z.string(),
        "Конечный отрезок": z.string(),
    }),
);
//Судно;Номер Заявки;Ледокол;Начало;Окончание;Начальный отрезок;Конечный отрезок
export const csvValidator = (data: unknown) => {
    return csvSchema.parse(data);
};
