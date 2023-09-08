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
            if (
                "imo" in req.body &&
                req.params.iceBreakerImo !== req.body.imo
            ) {
                const iceBreaker = await prisma.iceBreaker.findFirst({
                    where: {
                        imo: req.body.imo,
                    },
                });
                if (iceBreaker)
                    return res.status(400).send({
                        code: "IMO_ICEBREAKER_EXISTS",
                        message: "Этот IMO идентификатор уже существует в базе",
                    });
            }

            const iceBreaker = await prisma.iceBreaker.update({
                where: {
                    imo: req.body.imo,
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
