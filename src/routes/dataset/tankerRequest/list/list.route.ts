import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./list.schema";

export const list = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/tankerRequest/list",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { page, pageSize } = req.query;

            const [items, count] = await prisma.tankerRequest.findManyAndCount({
                skip: (+page - 1) * +pageSize,
                take: pageSize,
                include: {
                    tanker: {
                        select: {
                            imo: true,
                            name: true,
                            iceClass: true,
                            speed: true,
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
