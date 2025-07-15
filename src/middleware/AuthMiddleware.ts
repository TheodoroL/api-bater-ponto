import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../util/jwt/jwt';
export default {
    AuthControllerjWT(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Token não fornecido" });
        }

        const [tokenType, token] = authorization.split(' ');
        if (tokenType !== 'Bearer' || !token) {
            return res.status(401).json({ message: "Token inválido" });
        }

        try {
            const decoded = verifyToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Token inválido ou expirado" });
        }
    }
}