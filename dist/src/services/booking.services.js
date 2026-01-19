"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const prisma_1 = __importDefault(require("../prisma"));
class BookingServices {
    static async createBooking(userId, serviceType, date, time, notes) {
        const booking = await prisma_1.default.booking.create({
            data: {
                userId,
                serviceType,
                date: new Date(date),
                time,
                notes,
                status: 'PENDING'
            }
        });
        return {
            success: true,
            message: "Created successfully",
            booking: booking
        };
    }
    static async getAllBookings() {
        const bookings = await prisma_1.default.booking.findMany();
        return bookings;
    }
    static async updateBooking(bookingId, serviceType, date, time, notes) {
        const booking = await prisma_1.default.booking.update({
            where: { id: bookingId },
            data: {
                serviceType,
                date,
                time,
                notes
            }
        });
        return booking;
    }
    static async updateBookingStatus(bookingId, newStatus) {
        const booking = await prisma_1.default.booking.update({
            where: {
                id: bookingId
            },
            data: { status: newStatus }
        });
        return booking;
    }
    static async deleteBooking(bookingId) {
        const booking = await prisma_1.default.booking.delete({
            where: {
                id: bookingId
            }
        });
        return booking;
    }
}
exports.BookingServices = BookingServices;
//# sourceMappingURL=booking.services.js.map