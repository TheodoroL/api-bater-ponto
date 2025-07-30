import { prisma } from "../database/prisma/db";
import { hashPassword } from "../util/bycript/password";

async function main() {
    const adminseedTeste = await prisma.user.create({
        data: {
            name: "Admin",
            email: "Admin@gmail.com",
            role: "ADMIN",
            password: await hashPassword("123456")
        }
    })
    return adminseedTeste
}

main().then(admin => console.log(admin)); 