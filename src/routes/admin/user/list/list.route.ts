import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./list.schema";

export const updateUser = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/admin/user/list",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { page, pageSize } = req.query;

            const [items, count] = await prisma.user.findManyAndCount({
                skip: (+page - 1) * +pageSize,
                take: pageSize,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    login: true,
                    role: true,
                },
            });
            return res.send({
                pageCount: count,
                items,
            });
        },
    );
};
