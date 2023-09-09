import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { json2csv } from "json-2-csv";
import { schema } from "./export.schema";

export const exportDataset = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/tanker/export",
        {
            schema,
        },
        async (req, res) => {
            const tankers = await prisma.tanker.findMany();

            const data = await json2csv(
                tankers.map((x) => ({
                    imo: x.imo,
                    tanker_name: x.name,
                    ice_class: x.iceClass,
                    speed: x.speed,
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
