import { Request, Response, NextFunction } from "express"
import AdminService from "../services/AdminService";
export default {
    async verifyAdmin(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.user;
        const isAdmin = await AdminService.verifyAdminService(userId);
        if (!isAdmin) {
            return res.status(401).send({ error: "'Usuário não autenticado ou inexistente" })
        }
        const { role } = isAdmin;
        if (role === "ADMIN") return next();
        return res.status(403).json({ message: 'Acesso negado: apenas administradores' });
    }
}   