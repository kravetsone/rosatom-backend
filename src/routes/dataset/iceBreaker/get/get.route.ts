import { prisma, UserRole } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./get.schema";

export const get = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/iceBreaker/:iceBreakerImo",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { iceBreakerImo } = req.params;

            if (req.user!.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на получение юзера.",
                });

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
