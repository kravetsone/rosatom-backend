import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const deleteIceBreaker = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/dataset/iceBreaker/:iceBreakerImo/delete",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { iceBreakerImo } = req.params;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на создание аккаунта.",
                });

            const iceBreaker = await prisma.iceBreaker.findFirst({
                where: {
                    imo: iceBreakerImo,
                },
            });
            if (!iceBreaker)
                return res.status(400).send({
                    code: "USER_NOT_EXISTS",
                    message: "Этого пользователя не существует",
                });

            await prisma.iceBreaker.delete({
                where: {
                    imo: iceBreaker.imo,
                },
            });
            return res.send({
                message: "Ледокол успешно удалён",
            });
        },
    );
};
