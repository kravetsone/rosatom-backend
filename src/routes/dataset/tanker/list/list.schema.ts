import { IceClass } from "@prisma/client";
import z from "zod";

const querystring = z.object({
    page: z.string().transform(Number).refine(Boolean).default("1"),
    pageSize: z.string().transform(Number).refine(Boolean).default("100"),
});

const userNotExists = z.object({
    code: z.string().default("USER_NOT_EXISTS"),
    message: z.string().default("Введённые вами логин или пароль неверны"),
});

const response = z
    .object({
        pageCount: z.number(),
        items: z.array(
            z.object({
                imo: z.number(),
                name: z.string(),
                speed: z.number(),
                iceClass: z.nativeEnum(IceClass),
                metadata: z
                    .object({
                        shipType: z.string(),
                        flagCountryCode: z.string(),
                        dateOfBuild: z.string(),
                        grossTonnage: z.number(),
                        summerDeadweight: z.number(),
                        lengthOverall: z.number(),
                        beam: z.number(),
                        registeredOwner: z
                            .object({
                                name: z.string(),
                                countryCode: z.string(),
                                imo: z.number(),
                            })
                            .optional()
                            .nullable(),
                    })
                    .optional()
                    .nullable(),
            }),
        ),
    })
    .describe("Список");
// shipType         String
// flagCountryCode  String
// dateOfBuild      String
// grossTonnage     Int
// summerDeadweight Int
// lengthOverall    Int
// beam             Int
export const schema = {
    description: "Получение списка",
    tags: ["tanker"],
    security: [{ bearerAuth: [] }],
    querystring,
    response: {
        200: response,
        401: userNotExists,
    },
};
