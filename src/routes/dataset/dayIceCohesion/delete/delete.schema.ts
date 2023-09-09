import z from "zod";

const params = z.object({
    edgeId: z.preprocess(Number, z.number()),
    date: z.string(),
    // .regex(
    //     /^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/,
    //     "Дата должна быть указана в формате ДД.ММ.ГГГГ",
    // ),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z.object({
    message: z.string(),
});

export const schema = {
    description: "Удаление",
    tags: ["dayIceCohesion"],
    params,
    security: [{ bearerAuth: [] }],
    response: {
        200: response,
        401: userNotExists,
    },
};
