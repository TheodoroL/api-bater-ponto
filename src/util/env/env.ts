import { z } from "zod";
import "dotenv/config";
const envSchema = z.object({
    PORT: z.coerce.number().default(8000),
    JWT_SECRET: z.string().min(1, "JWT secret is required"),
    CORS_ORIGIN: z.string()
});


export const env = envSchema.parse(process.env);