import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { json2csv } from "json-2-csv";
import snakecaseKeys from "snakecase-keys";
import { schema } from "./export.schema";

export const exportDataset = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/iceBreaker/export",
        {
            schema,
        },
        async (req, res) => {
            const iceBreaker = await prisma.iceBreaker.findMany({
                include: {
                    metadata: {
                        include: {
                            registeredOwner: true,
                        },
                    },
                },
            });

            const data = await json2csv(
                iceBreaker.map((x) => ({
                    imo: x.name,
                    icebreaker_name: x.name,
                    metadata: x.metadata
                        ? snakecaseKeys(x.metadata as Record<string, unknown>)
                        : null,
                })),
                { emptyFieldValue: "" },
            );

            res.header("Content-Type", "text/csv");
            res.header(
                "Content-Disposition",
                "attachment; filename=iceBreakers.csv",
            );

            return res.send(data);
        },
    );
};
