import prisma from "../prisma";
import type { AuthTypes } from "../types/auth.interface";
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface TokenPayload{
    userId:string;
    role:string;
}

export class AuthServices{

         static async signup(name:string, email:string,password:string):Promise<AuthTypes>{
                 
            try{
                
                if(!name||!email||!password){
                     return{
                        success:false,
                        message:"All fields are required"
                     } 
                }

                const existingUser = await prisma.user.findUnique({
                    where:{email}
                });

                if(existingUser){
                    return{
                        success:false,
                        message:"Existing email found "
                    }
                }

                const hashedPassword = await bcrypt.hash(password,10);

                const user = await prisma.user.create({
                    data:{
                        name,
                        email,
                        password:hashedPassword,
                        role:'USER'
                    }
                });
               
              const token = this.generateToken(user.id,user.role);

                return {
                    success:true,
                    message:"Sign up successfully",
                    token,
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
                 if(!email || !password){
                    return{
                        success:false,
                        message:"All fields are required"
                    }
                 }

                const user = await prisma.user.findUnique({
                    where:{email}
                });
                


                if(!user){
                    return{
                        success:false,
                        message:"User not found"
                    }
                }

            const passwordValid = await bcrypt.compare(password,user.password);
                if(!passwordValid){
                    return{
                        success:false,
                        message:"Invalid password"
                    }
                }
             
                const token =  this.generateToken(user.id,user.role);

                return {
                    success:true,
                    message:"Login successfully",
                    token,
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

 static generateToken(userId:string, userRole:string):string{
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    
    const expiresIn = process.env.JWT_EXPIRES_IN as SignOptions['expiresIn'];
    if (!expiresIn) {
        throw new Error("JWT_EXPIRES_IN is not defined in environment variables");
    }
    
    return jwt.sign(
        { userId, userRole },
        secret,
        { expiresIn: expiresIn }  
    );
}

  static verifyToken(token:string):TokenPayload | null{
      try{
        return jwt.verify(token,process.env.JWT_SECRET as string) as TokenPayload;
      }catch(e){
        return null;
      }
  }

}

