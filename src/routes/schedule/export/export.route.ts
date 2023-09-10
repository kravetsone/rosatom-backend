import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { json2csv } from "json-2-csv";
import snakecaseKeys from "snakecase-keys";
import { schema } from "./export.schema";

export const exportDataset = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/schedule/export",
        {
            schema,
        },
        async (req, res) => {
            // const tankers = await prisma.tanker.findMany({
            //     include: {
            //         metadata: {
            //             include: {
            //                 registeredOwner: true,
            //             },
            //         },
            //     },
            // });

            // const data = await json2csv(
            //     tankers.map((x) => ({
            //         imo: x.imo,
            //         tanker_name: x.name,
            //         ice_class: x.iceClass,
            //         speed: x.speed,
            //         metadata: x.metadata
            //             ? snakecaseKeys(x.metadata as Record<string, unknown>)
            //             : null,
            //     })),
            // );

            res.header("Content-Type", "text/csv");
            res.header(
                "Content-Disposition",
                "attachment; filename=tankers.csv",
            );

            return res.send("data");
        },
    );
};
