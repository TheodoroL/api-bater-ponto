import { prisma } from "../database/prisma/db"
export default {
    async verifyAdminService(userId: string) {
        return await prisma.user.findFirst({
            where: {
                id: userId
            }
            ,
        })
    },
    async findAllUser() {
        return await prisma.user.findMany({
            where: {
                role: "USER"
            },
            select: {
                id: true,
                name: true,
                points: true
            }
        })
    },
    async findByNameUser(name: string) {
        return await prisma.user.findMany({
            where: {
                role: "USER",
                name: {
                    contains: name
                }
            },
            select: {
                name: true,
                points: true
            },
        })
    },
    async toggleAdmin(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";

        return await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
            select: { id: true, name: true, role: true },
        });
    }
}