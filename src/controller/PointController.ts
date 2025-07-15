import { Request, Response } from "express";
import pointService from "../services/PointService";
import { pointRequetDto, pointUpdateRequestDto } from "./dto/point-request-dto";
export default {
    async findAllPoint(req: Request, res: Response) {
        const { userId } = req.user;
        try {
            const points = await pointService.findAllPoints(userId);
            return res.status(200).json(points);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar pontos" });
        }
    },
    async findPointById(req: Request, res: Response) {
        const { id } = req.params;
        const { userId } = req.user;
        console.log(id, userId);
        const point = await pointService.findPointById(id, userId);
        if (!point) {
            return res.status(404).json({ message: "Ponto não encontrado" });
        }
        return res.status(200).json(point);

    },
    async createPoint(req: Request, res: Response) {
        const { success, data, error } = pointRequetDto.safeParse(req.body);
        const { userId } = req.user;
        if (!success) {
            return res.status(400).json({
                message: "Erro de validação",
                error: error.message
            });
        }
        try {
            const createPoint = await pointService.createPoint(data, userId);
            res.status(201).json(createPoint);
        } catch {
            res.status(400).json("Erro ao criar ponto");

        }

    },
    async updatePoint(req: Request, res: Response) {
        const { success, data, error } = pointUpdateRequestDto.safeParse(req.body);
        const { userId } = req.user;
        const { id } = req.params;
        if (!success) {
            return res.status(400).json({
                message: "Erro de validação",
                error: error.message
            });
        }
        try {
            const updatePoint = await pointService.updatePoint(data, userId, id);
            if (!updatePoint) {
                return res.status(404).json({ message: "Ponto não encontrado" });
            }
            return res.status(200).json(updatePoint);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao atualizar ponto" });
        }
    },
    async deletePoint(req: Request, res: Response) {
        const { id } = req.params;
        const { userId } = req.user;
        try {
            const deletedPoint = await pointService.deletePoint(id, userId);
            if (!deletedPoint) {
                return res.status(404).json({ message: "Ponto não encontrado" });
            }
            return res.status(200).json({ message: "Ponto deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao deletar ponto" });
        }
    }

}