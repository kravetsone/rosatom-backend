import z from "zod";

const body = z.object({
    edgeId: z.number(),
    iceBreakerName: z.string(),
    isFeasible: z.boolean(),
});
const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        edgeId: z.number(),
        iceBreakerName: z.string(),
        isFeasible: z.boolean(),
    })
    .describe("Ответ");

export const schema = {
    description: "Указание доступности ребра для ледокола",
    tags: ["edgeAvailability"],
    body,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
