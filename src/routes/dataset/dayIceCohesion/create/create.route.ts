import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./create.schema";

export const create = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/dataset/dayIceCohesion/create",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { edgeId, date, iceCohesion } = req.body;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на создание аккаунта.",
                });

            const existsDayIceCohesion = await prisma.dayIceCohesion.findUnique(
                {
                    where: {
                        id: edgeId,
                        date,
                        id_date: {
                            id: edgeId,
                            date,
                        },
                    },
                },
            );
            if (existsDayIceCohesion)
                return res.status(400).send({
                    code: "ALREADY_EXISTS",
                    message:
                        "Погодные условия для этого ребра в эту дату уже указаны",
                });

            await prisma.dayIceCohesion.create({
                data: {
                    id: edgeId,
                    date,
                    iceCohesion,
                },
            });

            return res.send({
                edgeId,
                date,
                iceCohesion,
            });
        },
    );
};
