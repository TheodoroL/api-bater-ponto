import { Request, Response } from 'express';
import { CreateUserRequestDto, LoginRequestDto } from './dto/auth-request-dto';
import AuthrService from '../services/AuthService';
export default {

    async createUser(req: Request, res: Response) {
        const { success, data, error } = CreateUserRequestDto.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Erro de validação",
                error: error.message
            });
        }
        try {
            const user = await AuthrService.createUser(data);
            return res.status(201).json(user);
        }
        catch (err) {
            return res.status(400).json({
                message: "erro de criar o usuário"
            });
        }
    },
    async login(req: Request, res: Response) {
        const { success, data, error } = LoginRequestDto.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Erro de validação",
                error: error.message
            });
        }
        try {
            const token = await AuthrService.login(data);
            return res.status(200).json({ token });
        }
        catch (err) {
            return res.status(401).json({
                message: "Credenciais inválidas"
            });
        }
    }
}
