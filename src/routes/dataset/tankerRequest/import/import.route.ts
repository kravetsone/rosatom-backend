import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import csv from "csvtojson";
import fastifyMulter from "fastify-multer";
import moment from "moment";
import { csvValidator, schema } from "./import.schema";

const allowedFileTypes = ["csv"];

const uploader = fastifyMulter({
    fileFilter(req, file, cb) {
        const type = file.originalname.split(".").at(-1)!;
        if (!allowedFileTypes.includes(type))
            cb(new Error(`Тип файла ${type} не поддерживается.`));
        if ((file.size || 0) > 10_240)
            cb(new Error("Файл должен весить меньше чем 10mb."));
        cb(null, true);
    },
});

export const importDataset = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/dataset/tankerRequest/import",
        {
            schema,
            preHandler: [fastify.auth(true), uploader.single("dataset")],
        },
        async (req, res) => {
            const datas = csvValidator(
                await csv({
                    checkType: true,
                    flatKeys: true,
                    ignoreEmpty: true,
                }).fromString(req.file!.buffer!.toString()),
            );

            console.log(datas);

            await prisma.tankerRequest.deleteMany({ where: {} });

            for (const data of datas) {
                console.log(
                    data,
                    moment(data.start_time, "DD.MM.YY HH:mm").unix(),
                    moment(data.end_time, "DD.MM.YY HH:mm").unix(),
                );
                await prisma.tankerRequest.create({
                    data: {
                        startTime: moment(
                            data.start_time,
                            "DD.MM.YY HH:mm",
                        ).unix(),
                        endTime: moment(data.end_time, "DD.MM.YY HH:mm").unix(),
                        startPoint: data.start_point,
                        endPoint: data.end_point,
                        tanker: {
                            connectOrCreate: {
                                where: {
                                    imo: data.imo,
                                },
                                create: {
                                    imo: data.imo,
                                    name: data.tanker_name,
                                    iceClass: data.ice_class,
                                    speed: data.speed,
                                },
                            },
                        },
                    },
                });
            }

            return res.send({
                message: `${datas.length} строк успешно загружено!`,
            });
        },
    );
};
