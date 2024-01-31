const express = require("express")
const authController = require("../controllers/auth-controller")
const authenticate = require("../middlewares/authenticate")
const router = express.Router()

router.post("/register", authController.register);
router.post("/login",authController.login)
router.post("/forget-password",authenticate, authController.forgetPassword)
router.get("/forget-password/:token", authController.verifyForgetPassword)
router.post("/reset-password/:token", authController.resetPassword)

module.exports = router;