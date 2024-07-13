"use server"

import prisma from "@/libs/db";
import { BookingType } from "@/libs/type";
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';

export async function createBooking(ride_id: any, passenger_id: any) {

    try {
        const newBooking = await prisma.booking.create({
            data: {
                ride_id,
                passenger_id,
                status: "Pending",
            },
        });
        revalidatePath('/dashboard/home/', 'layout')
        console.log(newBooking);
    } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('Booking.ride_id_passenger_id_unique')) {
            console.log("Duplicate booking error");
        } else {
            console.error('Error creating booking:', error);
        }
        return error; // Optionally rethrow error for further handling
    }
}

export async function deleteBooking(booking_id: string) {

    try {
        await prisma.booking.delete({
            where: { booking_id: booking_id },
        });
        revalidatePath('/dashboard/home/', 'layout')

    } catch (error: any) {
        console.error('Error creating booking:', error);
    }
}

export async function updateBooking(booking_id: string, status: string) {
    try {
        await prisma.booking.update({
            where: {
                booking_id: booking_id,
            },
            data: { status: status },
        });
        
        revalidatePath('/dashboard/home/', 'layout')
    } catch (error) {
        console.error('Error cancelling booking:', error);
        return error;
    }
}


export async function getUserData(user_id: string) {
    noStore();
    const data = await prisma.user.findUnique({
        where: {
            user_id: user_id,
        },
        select: {
            fullName: true,
            email: true,
            phone: true,
            userBio: true,
            profileImage: true,
        },
    });
    console.log(data)
    return data;
}


export async function getRidewithRideId(ride_id: string) {
    noStore();
    try {
        const ride = await prisma.ride.findUnique({
            where: {
                ride_id: ride_id
            },
            include: {
                driver: true,
                bookings: {
                    include: {
                        passenger: true
                    }
                }
            },
        });
        if (!ride) {
            return null;
        }
        console.log(ride)
        return ride;
    } catch (error) {
        console.error('Error fetching rides:', error);
        return error;
    }
}

export async function getBookingwithUserId(user_id: string) {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                passenger_id: user_id
            },
            include: {
                ride: {
                    include: {
                        driver: true
                    }
                },
                passenger: true
            },
        });     
        if (!bookings) {
            return null;
        }   
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return error;
    }
}

export async function getBookingwithRideId(ride_id: string) {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                ride_id: ride_id
            },
            include: {
                ride: true,
                passenger: true
            },
        });
        if (!bookings) {
            return null;
        }
        console.log(bookings)
        return bookings;
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return error;
    }
}

export async function getRides() {
    try {
        const rides = await prisma.ride.findMany({
            include: {
                driver: true,
            },
        });
        console.log(rides)
        return rides;
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}

export async function getRidewithDriverId(driver_id: string) {
    noStore();
    try {
        const ride = await prisma.ride.findMany({
            where: {
                driver_id: driver_id
            },

        });
        console.log(ride)
        return ride;
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}
