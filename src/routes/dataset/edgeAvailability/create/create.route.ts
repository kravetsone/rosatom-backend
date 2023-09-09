import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./create.schema";

export const create = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/dataset/edgeAvailability/create",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { edgeId, iceBreakerName, isFeasible } = req.body;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на создание аккаунта.",
                });

            const existsEdgeAvailability =
                await prisma.edgeAvailability.findUnique({
                    where: {
                        id: edgeId,
                        iceBreakerName,
                        id_iceBreakerName: {
                            id: edgeId,
                            iceBreakerName,
                        },
                    },
                });
            if (existsEdgeAvailability)
                return res.status(400).send({
                    code: "EDGE_AVAILABILITY_EXISTS",
                    message:
                        "Этот номер ребра для этого корабля уже существует в базе",
                });

            await prisma.edgeAvailability.create({
                data: {
                    id: edgeId,
                    iceBreakerName,
                    isFeasible: !!isFeasible,
                },
            });

            return res.send({
                edgeId,
                iceBreakerName,
                isFeasible,
            });
        },
    );
};
