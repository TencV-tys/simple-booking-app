import { BookingStatus } from "@prisma/client";
export declare class BookingServices {
    static createBooking(userId: string, serviceType: string, date: string, time: string, notes: string): Promise<{
        success: boolean;
        message: string;
        booking: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            serviceType: string;
            date: Date;
            time: string;
            status: import("@prisma/client").$Enums.BookingStatus;
            notes: string | null;
        };
    }>;
    static getAllBookings(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceType: string;
        date: Date;
        time: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        notes: string | null;
    }[]>;
    static updateBooking(bookingId: string, serviceType: string, date: string, time: string, notes: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceType: string;
        date: Date;
        time: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        notes: string | null;
    }>;
    static updateBookingStatus(bookingId: string, newStatus: BookingStatus): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceType: string;
        date: Date;
        time: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        notes: string | null;
    }>;
    static deleteBooking(bookingId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceType: string;
        date: Date;
        time: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        notes: string | null;
    }>;
}
//# sourceMappingURL=booking.services.d.ts.map