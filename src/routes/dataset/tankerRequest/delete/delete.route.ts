import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const deleteIceBreaker = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/dataset/tankerRequest/:iceBreakerId/delete",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { iceBreakerId } = req.params;

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
