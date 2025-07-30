import { z } from "zod";

export const nameSchemaQuery = z.object({
    name: z.string()
})