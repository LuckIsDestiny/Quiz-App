import express, { type Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import { requireAuth } from "../../middlewares/auth.js";
import * as authController from "./auth.controller.js";

const router: Router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

router.get("/me", requireAuth, authController.getMe);

export default router;
