import z from "zod";

const body = z.object({
    edgeId: z.number(),
    date: z.string(),
    iceCohesion: z
        .number()
        .min(
            0,
            "Сплоченность льда в баллах от 0 (чистая вода) до 10 (сплошной лёд)",
        )
        .max(
            10,
            "Сплоченность льда в баллах от 0 (чистая вода) до 10 (сплошной лёд)",
        ),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        edgeId: z.number(),
        date: z.string(),
        iceCohesion: z.number(),
    })
    .describe("Ответ");

export const schema = {
    description: "Указание погодных условий задаются для номера ребра",
    tags: ["dayIceCohesion"],
    body,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
