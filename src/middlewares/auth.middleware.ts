import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface JWTPayload{
    userId:string;
    email:string;
    role:string;
}
export interface AuthRequest extends Request{
   user?:{
    id:string;
    email:string;
    role:string;
   }
}


export const AuthMiddleware = (req:AuthRequest,res:Response, next:NextFunction)=>{
         

          const token = req.cookies.accessToken;
        
          if(!token){
            return res.status(401).json({message:"Unauthorized"})
          }
        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JWTPayload;
            
            req.user = {
                id:decoded.userId,
                email:decoded.email,
                role:decoded.role
            }
            next();

    }catch(e){
       return res.status(401).json({
             success:false,
            message:"Invalid credentials"
        })
    }

}