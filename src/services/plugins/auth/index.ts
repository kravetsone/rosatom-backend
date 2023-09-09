import { prisma, UserRole } from "@db";
import { FastifyZodInstance } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

export function registerAuth(
    fastify: FastifyZodInstance,
    _opts: unknown,
    done,
) {
    fastify.decorate("auth", (getUser = false, isForAdmin = false) => {
        return async (req: FastifyRequest, res: FastifyReply) => {
            console.log(req.headers);
            await req.jwtVerify().catch(() => {
                return res.status(401).send({
                    code: "NO_AUTH",
                    message: "Вы не авторизовались",
                });
            });

            if (getUser) {
                req.user = await prisma.user.findUnique({
                    where: {
                        id: req.jwtUser.id,
                        password: req.jwtUser.password,
                    },
                });

                if (!req.user)
                    return res.status(401).send({
                        code: "NO_AUTH",
                        message: "Вы не авторизовались",
                    });

                if (isForAdmin && req.user.role !== UserRole.ADMIN)
                    return res.status(400).send({
                        code: "NO_RIGHTS",
                        message: "У вас нет прав",
                    });
            }
        };
    });

    done();
}

export const othersPlugin = fastifyPlugin(registerAuth, {
    name: "auth-decorator-plugin",
});
