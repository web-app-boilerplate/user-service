import { PrismaClient } from "@prisma/client";
import logger from "../utils/logger.js";
import { ApiError } from "../errors/ApiError.js";

const prisma = new PrismaClient();

const getUsersService = async (page = 1, limit = 10) => {
    logger.info(`Fetching users page: ${page}, limit: ${limit}`);

    const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

    const totalUsers = await prisma.user.count();

    return {
        users,
        pagination: {
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
        },
    };
};


const getUserByIdService = async ({ id }) => {
    try {
        logger.info(`Fetching user by id: ${id}`);
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) throw new ApiError("User not found", 404);
        return user;
    } catch (err) {
        logger.error(`Error fetching user by id: ${id}`, err);
        throw err instanceof ApiError ? err : new ApiError("Failed to fetch user", 500);
    }
};

const getUserByEmailService = async ({ email }) => {
    try {
        logger.info(`Fetching user by email: ${email}`);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new ApiError("User not found", 404);
        return user;
    } catch (err) {
        logger.error(`Error fetching user by email: ${email}`, err);
        throw err instanceof ApiError ? err : new ApiError("Failed to fetch user", 500);
    }
};

const createUserService = async ({ email, name, password }) => {
    try {
        logger.info(`Creating user with email: ${email}`);
        // Check for duplicate email
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) throw new ApiError("User already exists", 409);

        const user = await prisma.user.create({
            data: { email, name, password },
        });
        logger.info(`User created with email: ${email}`);
        return user;
    } catch (err) {
        logger.error(`Error creating user with email: ${email}`, err);
        throw err instanceof ApiError ? err : new ApiError("Failed to create user", 500);
    }
};

const updateUserService = async ({ id, email, name, password }) => {
    try {
        logger.info(`Updating user with id: ${id}`);

        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { email, name, password },
        });

        return user;
    } catch (err) {
        logger.error(`Error updating user with id: ${id}`, err);
        throw new ApiError("Failed to update user", 500);
    }
};

const deleteUserService = async ({ id }) => {
    try {
        logger.info(`Deleting user with id: ${id}`);

        const user = await prisma.user.delete({
            where: { id: parseInt(id) },
        });

        return user;
    } catch (err) {
        logger.error(`Error deleting user with id: ${id}`, err);
        throw new ApiError("Failed to delete user", 500);
    }
};



export {
    getUsersService,
    createUserService,
    getUserByIdService,
    getUserByEmailService,
    updateUserService,
    deleteUserService
};
