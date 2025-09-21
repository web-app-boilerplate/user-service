import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const adminEmail = "admin@example.com";
    const adminPassword = "AdminPass123"; // ❗ later, load from env for security

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin) {
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: "Super Admin",
                role: "admin",
            },
        });
        console.log("✅ Admin user created:", adminEmail);
    } else {
        console.log("ℹ️ Admin already exists:", adminEmail);
    }
}

main()
    .catch((e) => {
        console.error("❌ Error seeding admin:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
