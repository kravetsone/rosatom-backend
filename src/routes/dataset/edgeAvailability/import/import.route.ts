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
        "/dataset/edgeAvailability/import",
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

            await prisma.edgeAvailability.deleteMany({ where: {} });

            const { count } = await prisma.edgeAvailability.createMany({
                data: data.map((x) => ({
                    id: x.edge_num,
                    iceBreakerName: x.icebreaker_name,
                    isFeasible: !!x.feasible,
                })),
            });

            return res.send({
                message: `${count} строк успешно загружено!`,
            });
        },
    );
};
