import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./create.schema";

export const create = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/dataset/iceBreaker/create",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const { imo, name } = req.body;

            const user = req.user!;
            if (user.role !== UserRole.ADMIN)
                return res.status(400).send({
                    code: "NO_RIGHTS",
                    message: "У вас нет прав на создание аккаунта.",
                });

            const existsIceBreaker = await prisma.iceBreaker.findUnique({
                where: {
                    imo,
                },
            });
            if (existsIceBreaker)
                return res.status(400).send({
                    code: "IMO_ICEBREAKER_EXISTS",
                    message: "Этот IMO идентификатор уже существует в базе",
                });

            const iceBreaker = await prisma.iceBreaker.create({
                data: {
                    imo,
                    name,
                },
            });
            return res.send({
                imo: iceBreaker.imo,
                name: iceBreaker.name,
            });
        },
    );
};
