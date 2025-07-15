import { CreateUserRequestDtoType, LoginRequestDtoType } from '../controller/dto/auth-request-dto';
import { prisma } from '../database/prisma/db';
import { hashPassword } from '../util/bycript/password';
import { comparePasswords, } from '../util/bycript/password';
import { generateToken } from '../util/jwt/jwt';
export default {
    async findByEmailUser(email: string) {
        return prisma.user.findUnique({
            where: { email }
        });
    },
    async createUser(user: CreateUserRequestDtoType) {
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        if (existingUser) {
            throw new Error("Usuário já existe");
        }
        const hashedPassword = await hashPassword(user.password);
        return await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        }
        )
    },
    async login(data: LoginRequestDtoType) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (!existingUser) {
            throw new Error("Usuário não encontrado");
        }
        const isPasswordValid = await comparePasswords(data.password, existingUser.password);
        if (!isPasswordValid) {
            throw new Error("Senha inválida");
        }
        const token = generateToken(existingUser.id);

        return token;

    }

}
