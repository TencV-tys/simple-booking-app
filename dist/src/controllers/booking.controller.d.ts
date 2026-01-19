import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
export declare class BookingController {
    static createBooking(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateBooking(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteBooking(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllBooking(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateBookingStatus(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=booking.controller.d.ts.map