import express from "express"
import { register_user, login_user, logout_user, get_current_user, refresh_token } from "../controller/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authLimiter } from "../middleware/rateLimiter.js"
import { validate } from "../middleware/validate.js"
import { registerSchema, loginSchema } from "../validators/auth.validator.js"

const router = express.Router()

router.post("/register", authLimiter, validate(registerSchema), register_user)
router.post("/login", authLimiter, validate(loginSchema), login_user)
router.post("/logout", logout_user)
router.post("/refresh", refresh_token)
router.get("/me", authMiddleware, get_current_user)

export default router
