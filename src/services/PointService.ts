import { PointUpdateRequestDtoType } from "../controller/dto/point-request-dto";
import { prisma } from "../database/prisma/db"


export default {
    async findAllPoints(userId: string) {
        return await prisma.point.findMany({
            where: {
                userId
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
    },
    async findPointById(id: string, userId: string) {
        return await prisma.point.findFirst({
            where: {
                id,
                userId
            }
        });
    },

    async createPoint(data: { type: "ENTRADA" | "SAIDA" }, userId: string) {
        return await prisma.point.create({
            data: {
                type: data.type,
                userId: userId
            }
        });
    },
    async updatePoint(data: PointUpdateRequestDtoType, userId: string, id: string) {
        return await prisma.point.update({
            where: {
                userId,
                id
            },
            data
        });
    },
    async deletePoint(id: string, userId: string) {
        return await prisma.point.delete({
            where: {
                id,
                userId
            }
        });
    }
}