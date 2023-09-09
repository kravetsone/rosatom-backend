import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const deleteDayIceCohesion = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/dataset/dayIceCohesion/:edgeId/:date/delete",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { edgeId, date } = req.params;

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
                    code: "NOT_EXISTS",
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
