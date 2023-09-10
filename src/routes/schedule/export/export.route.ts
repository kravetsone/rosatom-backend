import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { json2csv } from "json-2-csv";
import snakecaseKeys from "snakecase-keys";
import { schema } from "./export.schema";

export const exportDataset = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/schedule/export",
        {
            schema,
        },
        async (req, res) => {
            const schedules = await prisma.schedule.findMany({
                include: {
                    tanker: true,
                    iceBreaker: true,
                },
            });

            const data = await json2csv(
                schedules.map((x) => ({
                    ...snakecaseKeys(x as Record<string, unknown>),
                })),
            );

            res.header("Content-Type", "text/csv");
            res.header(
                "Content-Disposition",
                "attachment; filename=tankers.csv",
            );

            return res.send(data);
        },
    );
};
