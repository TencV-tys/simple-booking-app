import prisma from "../prisma";
import type { AuthTypes } from "../types/auth.interface";

export class AuthServices{

         static async signup(name:string, email:string,password:string):Promise<AuthTypes>{
                 
            try{
                

                const user = await prisma.user.create({
                    data:{
                        name,
                        email,
                        password,
                        role:'USER'
                    }
                });
               
                return {
                    success:true,
                    message:"Sign up successfully",
                    user:{
                        id:user.id,
                        name:name,
                        email:email,
                        role:user.role
                    }
                }


            }catch(e){
                console.error(e);
                return{
                    success:false,
                    message:"Internal server  error"
                }
            }

         }


             static async login(email:string, password:string):Promise<AuthTypes>{
               try{
                 
                const user = await prisma.user.findUnique({
                    where:{email}
                });
                
                if(!user){
                    return{
                        success:false,
                        message:"User not found"
                    }
                }

                return {
                    success:true,
                    message:"Login successfully",
                    user:{
                        id:user.id,
                        name:user.name || '',
                        email:user.email,
                        role:user.role                        
                    }
                }
                   


               }catch(e){
                    console.error(e);
                    return{
                        success:false,
                        message:"Login Failed"
                    }
               }

             }
}

