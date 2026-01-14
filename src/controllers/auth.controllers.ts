import { Request,Response } from "express";
import { AuthServices } from "../services/auth.services";

export class AuthController{
            
    static async signup(req:Request, res:Response){
         try{
              const {name, email, password} = req.body;
              
              const result = await AuthServices.signup(name, email, password);

              if(!result.success){
                return res.status(401).json({
                    success:false,
                    message:result.message
                })
              }

               return res.json({
                success:true,
                message:result.message,
                user:result.user
               });


         }catch(e){
            console.error(e);
            return res.status(500).json({
                 success:false,
                 message:"Internal Server Error"
            });
         }
       


    }
     
    static async login (req:Request, res:Response){
             try{
               const {email, password} = req.body;

               const result = await AuthServices.login(email,password);

               if(!result.success){
                return res.status(401).json({
                    success:false,
                    message:result.message
                });
               }

                return res.json({
                    success:true,
                    message:result.message,
                    user:result.user
                });

             }catch(e){
                console.error(e);
                return res.status(500).json({
                    success:false,
                    message:"Internal Server Error"
                });
             }


    }

}
