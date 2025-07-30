import { Request, Response } from "express"
import AdminService from "../services/AdminService"
import { nameSchemaQuery } from "./dto/admin-request-dto";
export default {
    async findAllUser(req: Request, res: Response) {
        res.status(200).send(await AdminService.findAllUser())
    },
    async findByUserName(req: Request, res: Response) {
        const { success, error, data } = nameSchemaQuery.safeParse(req.query);
        if (!success) {
            return res.status(400).send({ error: error.message })
        }
        const users = await AdminService.findByNameUser(data.name);
        res.status(200).send(users);
    },
    async toggleUserRole(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const updateUser = await AdminService.toggleAdmin(id);;
            res.status(200).send(updateUser);
        }
        catch (error) {
            res.status(400).send(error);

        }
    }

}