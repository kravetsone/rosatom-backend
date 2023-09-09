import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./list.schema";

export const list = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/dayIceCohesion/list",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { page, pageSize } = req.query;

            if (req.user!.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на получение юзера.",
                });

            const [items, count] = await prisma.dayIceCohesion.findManyAndCount(
                {
                    skip: (+page - 1) * +pageSize,
                    take: pageSize,
                },
            );

            return res.send({
                pageCount: count,
                items,
            });
        },
    );
};
