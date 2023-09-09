import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import { schema } from "./delete.schema";

export const createUser = async (fastify: FastifyZodInstance) => {
    fastify.delete(
        "/admin/user/:userId/delete",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { userId } = req.params;

            const deleteUser = await prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });
            if (!deleteUser)
                return res.status(400).send({
                    code: "USER_NOT_EXISTS",
                    message: "Этого пользователя не существует",
                });

            await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
            return res.send({
                message: "Пользователь успешно удалён",
            });
        },
    );
};
