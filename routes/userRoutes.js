import express from "express";
import { createUser, getUsers, getUserById, getUserByEmail, updateUser, deleteUser } from "../controllers/userController.js";
import verifyToken from "../middlewares/jwtMiddleware.js";
import authorizeRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.route('/all').get(verifyToken, authorizeRole(["admin"]), getUsers);
router.route('/create').post(createUser);

router.route('/email/:email').get(getUserByEmail);
router.route('/:id').get(verifyToken, authorizeRole(["admin", "user"]), getUserById);
router.route("/:id").put(verifyToken, authorizeRole(["admin", "user"]), updateUser);
router.route("/:id").delete(verifyToken, authorizeRole(["admin"]), deleteUser);



export default router;
