import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./list.schema";

export const list = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/iceBreaker/list",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { page, pageSize } = req.query;

            const [items, count] = await prisma.iceBreaker.findManyAndCount({
                skip: (+page - 1) * +pageSize,
                take: pageSize,
                include: {
                    metadata: {
                        include: {
                            registeredOwner: true,
                        },
                    },
                },
            });
            return res.send({
                pageCount: count,
                items,
            });
        },
    );
};
