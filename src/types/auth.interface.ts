export interface User{
    id:string;
    name:string;
    email:string;
    role:string;
}

export interface AuthTypes{
   success:boolean;
   message:string;
   token?:string;
   user?:{
        id:string;
        name:string;
        email:string;
        role:string;
   }

}