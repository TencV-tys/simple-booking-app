import type { AuthTypes } from "../types/auth.interface";
interface TokenPayload {
    userId: string;
    role: string;
}
export declare class AuthServices {
    static signup(name: string, email: string, password: string): Promise<AuthTypes>;
    static login(email: string, password: string): Promise<AuthTypes>;
    static generateToken(userId: string, userRole: string): string;
    static verifyToken(token: string): TokenPayload | null;
}
export {};
//# sourceMappingURL=auth.services.d.ts.map