import { SALT_ROUNDS } from "@config";
import { prisma } from "@db";
import { FastifyZodInstance } from "@types";
import bcrypt from "bcrypt";
import { schema } from "./create.schema";

export const createUser = async (fastify: FastifyZodInstance) => {
    fastify.post(
        "/admin/user/create",
        {
            schema,
            preHandler: fastify.auth(true, true),
        },
        async (req, res) => {
            const { login, password, firstName, lastName } = req.body;

            const uniqueLogin = await prisma.user.findFirst({
                where: {
                    login,
                },
            });
            if (uniqueLogin)
                return res.status(400).send({
                    code: "LOGIN_EXISTS",
                    message: "Этот логин уже занят",
                });

            const newUser = await prisma.user.create({
                data: {
                    login,
                    password: bcrypt.hashSync(password, SALT_ROUNDS),
                    firstName,
                    lastName,
                },
            });
            return res.send({
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
            });
        },
    );
};
