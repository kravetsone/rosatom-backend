import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./update.schema";

export const update = async (fastify: FastifyZodInstance) => {
    fastify.patch(
        "/dataset/iceBreaker/:iceBreakerImo/update",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const iceBreaker = await prisma.iceBreaker.update({
                where: {
                    imo: req.params.iceBreakerImo,
                },
                data: {
                    ...req.body,
                },
            });
            return res.send({
                imo: iceBreaker.imo,
                name: iceBreaker.name,
            });
        },
    );
};
