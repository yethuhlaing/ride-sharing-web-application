"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { BookingType, } from '@/libs/type'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { createChatRoom, getBookingwithBookingId, getUserData, updateBooking } from '@/actions/action';
import { CancelButton, SubmitButton } from '@/components/specific/SubmitButton';
import {getFirstName } from '@/libs/utils';
import { Card, CardHeader } from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image'
import { supabasebrowser } from '@/supabase/browser'

export default function DriverView({ severBookings, ride_id }: {
    severBookings: BookingType[]
    ride_id: string
}) {
    const [bookings, setBookings] = useState<BookingType[] | []>(severBookings)
    const supabase = supabasebrowser()
    
    useEffect( ()=> {
        const channel = supabase.channel('supabase_realtime').
        on('postgres_changes', {
            event: '*',
            schema: 'public', 
            table: 'Booking'
        }, async (payload) => {
            const { eventType, new: newBooking, old: oldBooking } = payload;

            if (eventType === 'INSERT') {
                // Fetch the full booking data after an insert
                const fullBooking = await getBookingwithBookingId(newBooking.booking_id) as BookingType;
                if (fullBooking) {
                    setBookings((prevBookings) => [...prevBookings, fullBooking]);
                }
            }

            if (eventType === 'UPDATE') {
                // Fetch the full booking data after an update
                const fullBooking = await getBookingwithBookingId(newBooking.booking_id) as BookingType;
                if (fullBooking) {
                    setBookings((prevBookings) =>
                        prevBookings.map((booking) =>
                            booking.booking_id === fullBooking.booking_id ? fullBooking : booking
                        )
                    );
                }
            }

            if (eventType === 'DELETE') {
                // Remove the booking from the state after a delete
                setBookings((prevBookings) =>
                    prevBookings.filter((booking) => booking.booking_id !== oldBooking.booking_id)
                );
            }
        }).subscribe(async (status: any) => {
            console.log(status)
        })

        return() => {
            supabase.removeChannel(channel)
        }
    }, [supabase, bookings, setBookings])
    async function handleAccept(booking_id: string, passenger_id: string, driver_id: string) {
        try {
            console.log(passenger_id)
            console.log(driver_id)
            await updateBooking(booking_id, "Confirmed")
            const driver = await getUserData(driver_id)
            const passenger = await getUserData(passenger_id)
            const chatRoomname = `${getFirstName(driver?.fullName as string)} • ${getFirstName(passenger?.fullName as string)}`

            await createChatRoom(chatRoomname, driver_id, passenger_id)
            revalidatePath(`/dashboard/home/ride/${ride_id}`, "page")
        } catch (error) {
            console.log(error)
        }

    }

    async function handleDecline(booking_id: string) {
        try {
            console.log(booking_id)
            await updateBooking(booking_id, "Declined")
            revalidatePath(`/dashboard/home/ride/${ride_id}`, "page")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='w-full md:flex flex-wrap flex-row space-x-0 space-y-2 md:space-x-4 md:space-y-0'>
            {
                bookings.length > 0 ? (
                    bookings?.filter((booking: BookingType) => booking.status !== 'Declined').map((booking: BookingType) => (
                        <Card key={booking.booking_id}>
                            <CardHeader>
                                <div className="flex flex-row justify-between py-4">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <Image
                                                src={booking.passenger?.profileImage as string | StaticImageData}
                                                alt="User Profile Image"
                                                width={80}  // Set the appropriate width
                                                height={80} // Set the appropriate height
                                                className="rounded-full aspect-square object-cover"
                                                priority
                                            />

                                        </div>
                                        <div className="flex flex-col space-y-2 text-base lg:text-xl font-bold">
                                            <span className='font-normal text-sm'>{booking.passenger?.fullName}</span>
                                            <Button className='btn-primary text-xs mr-2 mt-2 w-full h-fit' >
                                                <Link href={`/dashboard/home/profile/${booking.passenger_id}`}>
                                                    Check Profile
                                                </Link>
                                            </Button>
                                            {
                                                booking.status === "Confirmed" && (
                                                    <Button className='bg-green-400 hover:bg-green-500 text-xs mr-2 mt-2 w-full h-fit'>
                                                        <Link href={'/dashboard/home/chat'}>
                                                            Chat
                                                        </Link>
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </div>

                                </div>
                                {
                                    booking.status === "Pending" && (
                                        <div className='flex flex-row space-x-2'>
                                            <form action={handleAccept.bind(null, booking.booking_id, booking.passenger_id, booking.ride?.driver_id as string)}>
                                                <SubmitButton buttonName='Accept Ride' />
                                            </form>
                                            <form action={handleDecline.bind(null, booking.booking_id)}>
                                                <CancelButton buttonName='Decline Ride' />
                                            </form>
                                        </div>
                                    )
                                }
                            </CardHeader>
                        </Card>
                    ))
                ) : (
                    <p>No pending bookings</p>
                )
            }
        </div>    )
}
