import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { json2csv } from "json-2-csv";
import moment from "moment";
import { schema } from "./export.schema";

export const exportDataset = async (fastify: FastifyZodInstance) => {
    fastify.get(
        "/dataset/tankerRequest/export",
        {
            schema,
        },
        async (req, res) => {
            const tankerRequests = await prisma.tankerRequest.findMany({
                include: {
                    tanker: true,
                },
            });
            //tanker_name,imo,ice_class,speed,start_point,end_point,start_time,end_time
            const data = await json2csv(
                tankerRequests.map((x) => ({
                    tanker_name: x.tanker.name,
                    imo: x.tanker.imo,
                    ice_class: x.tanker.iceClass,
                    speed: x.tanker.speed,
                    start_point: x.startPoint,
                    end_point: x.endPoint,
                    start_time: moment(x.startTime * 1000).format(
                        "DD.MM.YY HH:mm",
                    ),
                    end_time: moment(x.endTime * 1000).format("DD.MM.YY HH:mm"),
                })),
            );

            res.header("Content-Type", "text/csv");
            res.header(
                "Content-Disposition",
                "attachment; filename=tankerRequests.csv",
            );

            return res.send(data);
        },
    );
};
