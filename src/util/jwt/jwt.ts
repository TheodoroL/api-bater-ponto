import { verify, sign } from "jsonwebtoken";
import { env } from "../env/env";

export type TokenPayload = {
    userId: string;
}

export const generateToken = (userId: string): string => {
    return sign({ userId }, env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        return verify(token, env.JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error("Token inválido ou expirado");
    }
}