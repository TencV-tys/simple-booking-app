"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_services_1 = require("../services/auth.services");
class AuthController {
    static async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            const result = await auth_services_1.AuthServices.signup(name, email, password);
            if (!result.success) {
                return res.status(401).json({
                    success: false,
                    message: result.message
                });
            }
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 1000
            });
            return res.json({
                success: true,
                message: result.message,
                user: result.user
            });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await auth_services_1.AuthServices.login(email, password);
            if (!result.success) {
                return res.status(401).json({
                    success: false,
                    message: result.message
                });
            }
            res.cookie('token', result.token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 1000
            });
            return res.json({
                success: true,
                message: result.message,
                token: result.token,
                user: result.user
            });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controllers.js.map