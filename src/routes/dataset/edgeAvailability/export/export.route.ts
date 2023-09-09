import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { json2csv } from "json-2-csv";
import { schema } from "./export.schema";

export const exportDataset = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/edgeAvailability/export",
        {
            schema,
        },
        async (req, res) => {
            const edgeAvailability = await prisma.edgeAvailability.findMany();

            const data = await json2csv(
                edgeAvailability.map((x) => ({
                    edge_num: x.id,
                    icebreaker_name: x.iceBreakerName,
                    feasible: Number(x.isFeasible),
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
