const baseUrl = "http://localhost:4000";

let token = "";
let pointId = "";

interface LoginResponse {
    token: string;
}

interface Point {
    id: string;
    type: "ENTRADA" | "SAIDA";
    userId: string;
}

beforeAll(async () => {
    // Criação do usuário
    await fetch(`${baseUrl}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Tester",
            email: "tester@example.com",
            password: "123456"
        }),
    });

    // Login
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: "tester@example.com",
            password: "123456"
        }),
    });

    const loginData = (await loginRes.json()) as LoginResponse;
    token = loginData.token;
});

describe("PointController (via fetch)", () => {
    it("deve criar um ponto (ENTRADA)", async () => {
        const response = await fetch(`${baseUrl}/points`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ type: "ENTRADA" })
        });

        expect(response.status).toBe(201);
        const data = (await response.json()) as Point;
        expect(data).toHaveProperty("id");
        expect(data).toHaveProperty("type", "ENTRADA");
        pointId = data.id;
    });

    it("deve retornar todos os pontos do usuário", async () => {
        const response = await fetch(`${baseUrl}/points`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        expect(response.status).toBe(200);
        const data = (await response.json()) as Point[];
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    it("deve buscar um ponto pelo id", async () => {
        const response = await fetch(`${baseUrl}/points/${pointId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        expect(response.status).toBe(200);
        const data = (await response.json()) as Point;
        expect(data.id).toBe(pointId);
    });

    it("deve atualizar o ponto para SAIDA", async () => {
        const response = await fetch(`${baseUrl}/points/${pointId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ type: "SAIDA" })
        });

        expect(response.status).toBe(200);
        const data = (await response.json()) as Point;
        expect(data.type).toBe("SAIDA");
    });

    it("deve deletar o ponto", async () => {
        const response = await fetch(`${baseUrl}/points/${pointId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("message", "Ponto deletado com sucesso");
    });

    it("deve retornar 404 ao buscar ponto deletado", async () => {
        const response = await fetch(`${baseUrl}/points/${pointId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        expect(response.status).toBe(404);
        const data = await response.json();
        expect(data).toHaveProperty("message", "Ponto não encontrado");
    });
});
