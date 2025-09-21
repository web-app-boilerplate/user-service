import { getUsersService, createUserService, getUserByIdService, getUserByEmailService, updateUserService, deleteUserService } from "../services/userService.js";
import { ApiError } from "../errors/ApiError.js";

const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await getUsersService(parseInt(page), parseInt(limit));
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};


const getUserById = async (req, res, next) => {
    try {
        const targetUserId = parseInt(req.params.id);

        // If not admin, user can only get their own account
        if (req.user.role !== "admin" && req.user.id !== targetUserId) {
            return next(new ApiError("Forbidden: you can only see your own account", 403));
        }
        const user = await getUserByIdService(req.params);
        if (!user) throw new ApiError("User not found", 404);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const getUserByEmail = async (req, res, next) => {
    try {
        const user = await getUserByEmailService(req.params);
        if (!user) throw new ApiError("User not found", 404);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const createUser = async (req, res, next) => {
    try {
        const user = await createUserService(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const targetUserId = parseInt(req.params.id);

        // If not admin, user can only update their own account
        if (req.user.role !== "admin" && req.user.id !== targetUserId) {
            return next(new ApiError("Forbidden: you can only update your own account", 403));
        }

        const user = await updateUserService({ id: targetUserId, ...req.body });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};


const deleteUser = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return next(new ApiError("Forbidden: only admins can delete users", 403));
        }

        await deleteUserService({ id: req.params.id });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};


export {
    getUsers,
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
};
