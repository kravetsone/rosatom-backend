import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { json2csv } from "json-2-csv";
import { schema } from "./export.schema";

export const exportDataset = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/dayIceCohesion/export",
        {
            schema,
        },
        async (req, res) => {
            const dayIceCohesion = await prisma.dayIceCohesion.findMany();

            const data = await json2csv(
                dayIceCohesion.map((x) => ({
                    edge_num: x.id,
                    date: x.date,
                    ice_cohesion: x.iceCohesion,
                })),
            );

            res.header("Content-Type", "text/csv");
            res.header(
                "Content-Disposition",
                "attachment; filename=edgeAvailabilities.csv",
            );

            return res.send(data);
        },
    );
};
