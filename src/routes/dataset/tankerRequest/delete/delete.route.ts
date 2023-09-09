import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const deleteIceBreaker = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/dataset/tankerRequest/:iceBreakerId/delete",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { iceBreakerId } = req.params;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на создание аккаунта.",
                });

            const tankerRequest = await prisma.tankerRequest.findFirst({
                where: {
                    id: iceBreakerId,
                },
            });
            if (!tankerRequest)
                return res.status(400).send({
                    code: "TANKER_REQUEST_NOT_EXISTS",
                    message: "Этой заявки не существует",
                });

            await prisma.tankerRequest.delete({
                where: {
                    id: iceBreakerId,
                },
            });
            return res.send({
                message: "Ледокол успешно удалён",
            });
        },
    );
};
