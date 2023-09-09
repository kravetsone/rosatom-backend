import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./create.schema";

export const create = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/dataset/tankerRequest/create",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const {
                imo,
                name,
                iceClass,
                speed,
                startPoint,
                endPoint,
                startTime,
                endTime,
            } = req.body;

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
                    startTime,
                    endTime,
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
                startTime,
                endTime,
            });
        },
    );
};
