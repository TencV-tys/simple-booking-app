import {Router} from 'express';
import { BookingController } from '../controllers/booking.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
const router = Router();

router.use(AuthMiddleware);

router.post('/booked',BookingController.createBooking);
router.get('/booked',BookingController.getAllBooking);
router.put('/booked/:id',BookingController.updateBooking);
router.put('/booked/:id/status',BookingController.updateBookingStatus);
router.delete('/booked/:id',BookingController.deleteBooking);

export default router;