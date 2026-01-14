import express from 'express';
import cors from 'cors';
import cookieParser  from 'cookie-parser';
import dotenv from 'dotenv';

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

svr.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})
