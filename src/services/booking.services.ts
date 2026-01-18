import prisma from "../prisma";
import { BookingStatus } from "@prisma/client";
export class BookingServices{

           static async createBooking(userId:string, serviceType:string,date:string,time:string,notes:string){
                           
            const booking = await prisma.booking.create({
                  data:{
                      userId,
                      serviceType,
                      date: new Date(date),
                      time,
                      notes,
                      status:'PENDING'
                  }
            });
            return {
                success:true,
                message:"Created successfully",
                booking:booking
            };

           }


           static async getAllBookings(){
              const bookings = await prisma.booking.findMany();

              return bookings;
           }
             
           static async updateBooking(bookingId:string, newData:any){
            
            const booking = await prisma.booking.update({
                where:{id:bookingId},
                data:newData
            });
            
            return booking;
           }
               

           static async updateBookingStatus(bookingId:string, newStatus:BookingStatus){
                 
            const booking = await prisma.booking.update({
                where:{
                    id:bookingId
                },
               data:{ status:newStatus}
            });

            return booking;

           }
              
           static async deleteBooking(bookingId:string){
            const booking = prisma.booking.delete({
                where:{
                    id:bookingId
                }
            });

            return booking;
           }
}