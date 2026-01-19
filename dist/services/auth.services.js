"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthServices {
    static async signup(name, email, password) {
        try {
            if (!name || !email || !password) {
                return {
                    success: false,
                    message: "All fields are required"
                };
            }
            const existingUser = await prisma_1.default.user.findUnique({
                where: { email }
            });
            if (existingUser) {
                return {
                    success: false,
                    message: "Existing email found "
                };
            }
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            const user = await prisma_1.default.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: 'USER'
                }
            });
            const token = this.generateToken(user.id, user.role);
            return {
                success: true,
                message: "Sign up successfully",
                token,
                user: {
                    id: user.id,
                    name: name,
                    email: email,
                    role: user.role
                }
            };
        }
        catch (e) {
            console.error(e);
            return {
                success: false,
                message: "Internal server  error"
            };
        }
    }
    static async login(email, password) {
        try {
            if (!email || !password) {
                return {
                    success: false,
                    message: "All fields are required"
                };
            }
            const user = await prisma_1.default.user.findUnique({
                where: { email }
            });
            if (!user) {
                return {
                    success: false,
                    message: "User not found"
                };
            }
            const passwordValid = await bcryptjs_1.default.compare(password, user.password);
            if (!passwordValid) {
                return {
                    success: false,
                    message: "Invalid password"
                };
            }
            const token = this.generateToken(user.id, user.role);
            return {
                success: true,
                message: "Login successfully",
                token,
                user: {
                    id: user.id,
                    name: user.name || '',
                    email: user.email,
                    role: user.role
                }
            };
        }
        catch (e) {
            console.error(e);
            return {
                success: false,
                message: "Login Failed"
            };
        }
    }
    static generateToken(userId, userRole) {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const expiresIn = process.env.JWT_EXPIRES_IN;
        if (!expiresIn) {
            throw new Error("JWT_EXPIRES_IN is not defined in environment variables");
        }
        return jsonwebtoken_1.default.sign({ userId, userRole }, secret, { expiresIn: expiresIn });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (e) {
            return null;
        }
    }
}
exports.AuthServices = AuthServices;
//# sourceMappingURL=auth.services.js.map