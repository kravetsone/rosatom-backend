import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const deleteIceBreaker = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/dataset/iceBreaker/:iceBreakerImo/delete",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { iceBreakerImo } = req.params;

            const iceBreaker = await prisma.iceBreaker.findFirst({
                where: {
                    imo: iceBreakerImo,
                },
            });
            if (!iceBreaker)
                return res.status(400).send({
                    code: "ICEBREAKER_NOT_EXISTS",
                    message: "Этого ледокола не существует",
                });

            await prisma.iceBreaker.delete({
                where: {
                    imo: iceBreaker.imo,
                },
            });
            return res.send({
                message: "Ледокол успешно удалён",
            });
        },
    );
};
