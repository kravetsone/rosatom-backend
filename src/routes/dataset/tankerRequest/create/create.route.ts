import { prisma } from "@db";
import { UserRole } from "@prisma/client";
import { FastifyZodInstance } from "@types";
import { schema } from "./create.schema";

export const create = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/dataset/tankerRequest/create",
        {
            schema,
            preHandler: fastify.auth(true),
        },
        async (req, res) => {
            const {
                imo,
                name,
                iceClass,
                speed,
                startPoint,
                endPoint,
                startDateTime,
                endDateTime,
            } = req.body;

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

            await prisma.tankerRequest.create({
                data: {
                    startPoint,
                    endPoint,
                    startDateTime,
                    endDateTime,
                    tanker: {
                        connectOrCreate: {
                            where: {
                                imo,
                            },
                            create: {
                                imo,
                                name,
                                iceClass,
                                speed,
                            },
                        },
                    },
                },
            });
            return res.send({
                tanker: {
                    imo,
                    name,
                    iceClass,
                    speed,
                },
                startPoint,
                endPoint,
                startDateTime,
                endDateTime,
            });
        },
    );
};
