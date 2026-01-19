"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("../controllers/booking.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.AuthMiddleware);
router.post('/booked', booking_controller_1.BookingController.createBooking);
router.get('/booked', booking_controller_1.BookingController.getAllBooking);
router.put('/booked/:id', booking_controller_1.BookingController.updateBooking);
router.patch('/booked/:id/status', booking_controller_1.BookingController.updateBookingStatus);
router.delete('/booked/:id', booking_controller_1.BookingController.deleteBooking);
exports.default = router;
//# sourceMappingURL=booking.route.js.map