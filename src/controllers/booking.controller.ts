import { Request,Response } from "express";
import { BookingServices } from "../services/booking.services";

export class BookingController{
             
    static async createBooking(req:Request, res:Response){

        try{
        const {userId,serviceType,date,time,notes} = req.body;
         
         const booking = await BookingServices.createBooking(userId,serviceType,date,time,notes);

        return res.json({
            success:true,
            message:"Booked Successfully",
            booking:booking
        })
    }catch(e){
        console.error(e);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }


    }


    static async updateBooking(req:Request, res:Response){
              try{
                const {data} = req.body;
                const {id} = req.params as {id:string};

                const booking = await BookingServices.updateBooking(id,data);
                  
                if(!booking){
                    return res.status(404).json({
                        success:false,
                        message:"data not found"
                    })
                }

                return res.json({
                    success:true,
                    message:"Updated successfully",
                    booking:booking
                })

              }catch(e){
                console.error(e);
                return res.status(500).json({
                    success:false,
                    message:"Internal server error"
                })
              }
    }

     static async deleteBooking(req:Request, res:Response){
        try{      
        const {id } = req.params as {id:string};

              const booking = await BookingServices.deleteBooking(id);
              
                if(!booking){
                    return res.status(404).json({
                        success:false,
                        message:"data not found"
                    })
                }


              return res.json({
                success:true,
                message:"Deleted Successfully",
                booking:booking
              });
            }catch(e){
                console.error(e);
                return res.status(500).json({
                    success:false,
                    message:"Internal server error"
                });

            }


     }     

     static async getAllBooking(req:Request,res:Response){
            try{
                 
                const booking = await BookingServices.getAllBookings();

                return res.json({
                    success:true,
                    message:"All data fetched",
                    booking:booking
                });

            }catch(e){
                console.error(e);
                return res.status(500).json(
                    {
                        success:false,
                        message:"Internal server error"
                    }
                )
            }

     }
    
     static async updateBookingStatus(req:Request,res:Response){
             try{
               const {id} = req.params as {id:string};
               const {status} = req.body;
             
               const booking = await BookingServices.updateBookingStatus(id,status);

               if(!booking){
                return res.status(404).json({
                    success:false,
                    message:"data not found"
                })
               }

               return res.json({
                success:true,
                message:"Status updated",
                booking:booking
               });

             }catch(e){
                console.error(e);
                return res.status(500).json({
                    success:false,
                    message:"Internal server error"
                })
             }

     }

}