"use server"

import prisma from "@/libs/db";
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

        console.log(newBooking);
    } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('Booking.ride_id_passenger_id_unique')) {
            console.log("Duplicate booking error");
        } else {
            console.error('Error creating booking:', error);
        }
        throw error; // Optionally rethrow error for further handling
    }
}

export async function deleteBooking(booking_id: string) {

    try {
        await prisma.booking.delete({
            where: { booking_id: booking_id },
        });
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
        throw error;
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

export async function getRideData(ride_id: string) {
    noStore();
    try {
        const ride = await prisma.ride.findUnique({
            where: {
                ride_id: ride_id
            },
            include: {
                driver: true,
                bookings: {
                    select: {
                        booking_id: true,
                        passenger_id: true,
                        status: true,
                        passenger: {
                            select: {
                                fullName: true,
                                profileImage: true
                            }
                        }
                    },
                }
            },
        });
        revalidatePath('/dashboard/home/', 'layout')
        console.log(ride)
        return ride;
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}