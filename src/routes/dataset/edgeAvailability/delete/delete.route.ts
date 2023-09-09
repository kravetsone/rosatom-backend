import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const deleteEdgeAvailability = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/dataset/edgeAvailability/:edgeId/:iceBreakerName/delete",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { edgeId, iceBreakerName } = req.params;

            const edgeAvailability = await prisma.edgeAvailability.findFirst({
                where: {
                    id: edgeId,
                },
            });
            if (!edgeAvailability)
                return res.status(400).send({
                    code: "TANKER_REQUEST_NOT_EXISTS",
                    message: "Этой заявки не существует",
                });

            await prisma.edgeAvailability.delete({
                where: {
                    id_iceBreakerName: {
                        id: edgeId,
                        iceBreakerName,
                    },
                },
            });
            return res.send({
                message: "Информация о доступности льда успешно удалена",
            });
        },
    );
};
