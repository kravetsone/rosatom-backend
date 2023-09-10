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
        "/schedule/import",
        {
            schema,
            preHandler: [fastify.auth(true), uploader.single("dataset")],
        },
        async (req, res) => {
            console.log(
                await csv({
                    checkType: true,
                    flatKeys: true,
                    ignoreEmpty: true,
                    delimiter: ";",
                }).fromString(req.file!.buffer!.toString()),
            );
            const datas = csvValidator(
                await csv({
                    checkType: true,
                    flatKeys: true,
                    ignoreEmpty: true,
                    delimiter: ";",
                }).fromString(req.file!.buffer!.toString()),
            );
            console.log(datas);

            for (const data of datas) {
                await prisma.schedule.upsert({
                    where: {
                        id: data["Номер Заявки"],
                    },
                    update: {
                        startLine: data["Начальный отрезок"],
                        endLine: data["Конечный отрезок"],
                        startTime: moment(data.Начало, "DD.MM.YY HH:mm").unix(),
                        endTime: moment(
                            data.Окончание,
                            "DD.MM.YY HH:mm",
                        ).unix(),
                        tanker: {
                            connect: {
                                name: data.Судно,
                            },
                        },
                        iceBreaker: {
                            connect: {
                                name: data.Ледокол,
                            },
                        },
                    },
                    create: {
                        id: data["Номер Заявки"],
                        startLine: data["Начальный отрезок"],
                        endLine: data["Конечный отрезок"],
                        startTime: moment(data.Начало, "DD.MM.YY HH:mm").unix(),
                        endTime: moment(
                            data.Окончание,
                            "DD.MM.YY HH:mm",
                        ).unix(),
                        tanker: {
                            connect: {
                                name: data.Судно,
                            },
                        },
                        iceBreaker: {
                            connect: {
                                name: data.Ледокол,
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
