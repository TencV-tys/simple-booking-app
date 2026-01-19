"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_services_1 = require("../services/booking.services");
class BookingController {
    static async createBooking(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(404).json({
                    success: false,
                    message: "User not authenticated"
                });
            }
            const { serviceType, date, time, notes } = req.body;
            const booking = await booking_services_1.BookingServices.createBooking(userId, serviceType, date, time, notes);
            return res.json({
                success: true,
                message: "Booked Successfully",
                booking: booking
            });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    static async updateBooking(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(404).json({
                    success: false,
                    message: "User not authenticated"
                });
            }
            const { id: bookingId } = req.params;
            const { serviceType, date, time, notes } = req.body;
            const booking = await booking_services_1.BookingServices.updateBooking(bookingId, serviceType, date, time, notes);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "data not found"
                });
            }
            return res.json({
                success: true,
                message: "Updated successfully",
                booking: booking
            });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    static async deleteBooking(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(404).json({
                    success: false,
                    message: "User not authenticated"
                });
            }
            const { id } = req.params;
            const booking = await booking_services_1.BookingServices.deleteBooking(id);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "data not found"
                });
            }
            return res.json({
                success: true,
                message: "Deleted Successfully",
                booking: booking
            });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    static async getAllBooking(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(404).json({
                    success: false,
                    message: "User not authenticated"
                });
            }
            const booking = await booking_services_1.BookingServices.getAllBookings();
            return res.json({
                success: true,
                message: "All data fetched",
                booking: booking
            });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
    static async updateBookingStatus(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(404).json({
                    success: false,
                    message: "User not authenticated"
                });
            }
            const { id } = req.params;
            const { status } = req.body;
            const booking = await booking_services_1.BookingServices.updateBookingStatus(id, status);
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: "data not found"
                });
            }
            return res.json({
                success: true,
                message: "Status updated",
                booking: booking
            });
        }
        catch (e) {
            console.error(e);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map