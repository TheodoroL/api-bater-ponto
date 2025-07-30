const baseUrl = "http://localhost:4000";

describe("AuthController", () => {
    it("deve criar um usuário com sucesso", async () => {
        const response = await fetch(`${baseUrl}/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "John Doe",
                email: "john.d222oe@email.com",
                password: "123456"
            })
        });
        expect(response.status).toBe(201);
        const data = await response.json();
        expect(data).toHaveProperty("id");
        expect(data).toHaveProperty("email", "john.d222oe@email.com");
    });

    it("deve retornar erro de validação ao criar usuário com dados inválidos", async () => {
        const response = await fetch(`${baseUrl}/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "",
                email: "email-invalido",
                password: ""
            })
        });
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data).toHaveProperty("message", "Erro de validação");
    });

    it("deve autenticar usuário com sucesso", async () => {
        // Primeiro cria o usuário
        await fetch(`${baseUrl}/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Jane Doe",
                email: "jane.doe@email.com",
                password: "123456"
            })
        });

        // Depois faz login
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "jane.doe@email.com",
                password: "123456"
            })
        });
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("token");
    });

    it("deve retornar erro de validação ao tentar logar com dados inválidos", async () => {
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "email-invalido",
                password: ""
            })
        });
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data).toHaveProperty("message", "Erro de validação");
    });

    it("deve retornar erro de credenciais inválidas ao tentar logar com senha errada", async () => {
        // Cria usuário
        await fetch(`${baseUrl}/auth`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Jack Doe",
                email: "jack.doe@email.com",
                password: "123456"
            })
        });

        // Tenta logar com senha errada`
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "jack.doe@email.com",
                password: "senhaerrada"
            })
        });
        expect(response.status).toBe(401);
        const data = await response.json();
        expect(data).toHaveProperty("message", "Credenciais inválidas");
    });
});