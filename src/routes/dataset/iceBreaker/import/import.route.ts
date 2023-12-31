import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import csv from "csvtojson";
import fastifyMulter from "fastify-multer";
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
        "/dataset/iceBreaker/import",
        {
            schema,
            preHandler: [fastify.auth(true), uploader.single("dataset")],
        },
        async (req, res) => {
            const data = csvValidator(
                await csv({
                    checkType: true,
                    flatKeys: true,
                    ignoreEmpty: true,
                }).fromString(req.file!.buffer!.toString()),
            );
            console.log(data);

            const count = await Promise.all(
                data.map(async (x) =>
                    prisma.iceBreaker.upsert({
                        where: {
                            imo: x.imo,
                        },
                        create: {
                            imo: x.imo,
                            name: x.icebreaker_name,
                        },
                        update: {
                            imo: x.imo,
                            name: x.icebreaker_name,
                        },
                    }),
                ),
            );

            return res.send({
                message: `${count.length} строк успешно загружено!`,
            });
        },
    );
};
