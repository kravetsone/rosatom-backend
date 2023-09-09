import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const deleteEdgeAvailability = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/dataset/edgeAvailability/:edgeId/:date/delete",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { edgeId, date } = req.params;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав",
                });

            const dayIceCohesion = await prisma.dayIceCohesion.findUnique({
                where: {
                    id_date: {
                        id: edgeId,
                        date,
                    },
                },
            });
            if (!dayIceCohesion)
                return res.status(400).send({
                    code: "TANKER_REQUEST_NOT_EXISTS",
                    message: "Этой записи о погодных условиях не существует",
                });

            await prisma.dayIceCohesion.delete({
                where: {
                    id_date: {
                        id: edgeId,
                        date,
                    },
                },
            });
            return res.send({
                message: "Информация погодных условиях успешно удалена",
            });
        },
    );
};
