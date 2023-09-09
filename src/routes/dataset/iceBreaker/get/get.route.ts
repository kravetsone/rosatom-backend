import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./get.schema";

export const get = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/iceBreaker/:iceBreakerImo",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { iceBreakerImo } = req.params;

            const iceBreaker = await prisma.iceBreaker.findFirst({
                where: {
                    imo: iceBreakerImo,
                },
            });
            if (!iceBreaker)
                return res.status(401).send({
                    code: "USER_NOT_EXISTS",
                    message: "Введённые вами логин или пароль неверны",
                });

            return res.send({
                imo: iceBreaker.imo,
                name: iceBreaker.name,
            });
        },
    );
};
