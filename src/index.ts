import "./types/index";
import { prisma } from "@db";
import { PORT } from "config";
import Fastify from "fastify";
import {
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod";
import { registerPlugin } from "services";
import { ZodAny } from "zod";

const fastify = Fastify({
    logger: {
        level: "warn",
    },
}).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler<ZodAny>((routeSchema) => {
    if (routeSchema.url.includes("import"))
        return () => ({
            value: true,
        });

    return validatorCompiler(routeSchema);
});
fastify.setSerializerCompiler(serializerCompiler);

fastify.register(registerPlugin);

prisma.$connect().then(async () => {
    console.log("[DATABASE] database was connected!");

    const host = await fastify.listen({
        port: PORT,
        host: "::",
    });
    // await prisma.tankerRequest.create({
    //     data: {
    //         startPoint: "точка в Баренцевом море",
    //         endPoint: "Саббета 3",
    //         startDateTime: "01.01.21 23:30",
    //         endDateTime: "05.01.21 5:00",
    //         tanker: {
    //             create: {
    //                 imo: 9752084,
    //                 name: "Штурман Альбанов",
    //                 iceClass: "Arc7",
    //                 speed: 15,
    //             },
    //         },
    //     },
    // });
    console.log(`[SERVER] Server has been started at ${host}`);
});
