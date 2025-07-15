import { z } from "zod/";
export const CreateUserRequestDto = z.object({
    name: z.string().min(3, "é necessário informar o nome"),
    email: z.email("é necessário informar um e-mail válido"),
    password: z.string().min(6, "é necessário informar uma senha com no mínimo 6 caracteres"),
});

export const LoginRequestDto = z.object({
    email: z.email("é necessário informar um e-mail válido"),
    password: z.string().min(6, "é necessário informar uma senha com no mínimo 6 caracteres")
}
)

export type CreateUserRequestDtoType = z.infer<typeof CreateUserRequestDto>;
export type LoginRequestDtoType = z.infer<typeof LoginRequestDto>;