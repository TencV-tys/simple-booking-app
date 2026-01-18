import express from 'express';
import cors from 'cors';
import cookieParser  from 'cookie-parser';
import dotenv from 'dotenv';

import AuthRoutes from './routes/auth.routes';
import BookingRoutes from './routes/booking.route';
dotenv.config();

const svr = express();
const PORT = process.env.PORT || 5000;

svr.use(cors({
    origin:true,
    credentials:true
}))

svr.use(express.json());
svr.use(express.urlencoded({extended:true}));

svr.use(cookieParser());

svr.use('/api/auth',AuthRoutes);
svr.use('/api/booking',BookingRoutes);

svr.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})
