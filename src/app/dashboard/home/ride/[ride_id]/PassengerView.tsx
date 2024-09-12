"use client"

import { createBooking, deleteBooking, getBookingwithBookingId, updateBooking } from '@/actions/action'
import { CancelButton, SubmitButton } from '@/components/specific/SubmitButton'
import { Button } from '@/components/ui/button'
import { BookingType, RideType } from '@/libs/type'
import { supabasebrowser } from '@/supabase/browser'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

export default function PassengerView({ ride_id, passenger_id, ride, severBookings } : {
    ride_id: string,
    passenger_id: string,
    ride: RideType
    severBookings: BookingType[]
}) {
    
    const [bookings, setBookings] = useState<BookingType[] | []>(severBookings)
    const supabase = supabasebrowser()

    useEffect(() => {
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

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, bookings, setBookings])
    async function handleDelete(booking_id: string) {
        try {
            await deleteBooking(booking_id as string)
            revalidatePath(`/dashboard/home/ride/${ride_id}`, "page")
        } catch (error) {
            console.log(error)
        }
    }
    async function handleRequestAgain(booking_id: string) {
        try {
            await updateBooking(booking_id, "Pending")
            revalidatePath(`/dashboard/home/ride/${ride_id}`, "page")
        } catch (error) {
            console.log(error)
        }
    }
    async function handleSubmit() {

        try {
            await createBooking(ride_id, passenger_id);
        } catch (error: any) {
            if (error.stack?.includes("Unique constraint failed on the fields")) {
                console.log('Error: Passenger already booked this ride');
            } else {
                console.log('Error creating booking:', error);
            }
        }
    }
    return (
        <>
            {bookings.length === 0 ? (
                <form action={handleSubmit}>
                    <SubmitButton buttonName='Request Ride' />
                </form>
            ) : (
                <>
                    {bookings[0]?.status === "Pending" && (
                        <form action={handleDelete.bind(null, bookings[0].booking_id)}>
                            <CancelButton buttonName='Cancel Request' />
                        </form>
                    )}
                        {bookings[0]?.status === "Declined" && (
                            <form action={handleRequestAgain.bind(null, bookings[0].booking_id)}>
                            <SubmitButton buttonName='Request Again' />
                        </form>
                    )}
                        {bookings[0]?.status === "Confirmed" && (
                            <Button className='bg-green-400 hover:bg-green-500 text-xs mr-2 mt-2 w-full md:w-20 h-fit'>
                                <Link href='/dashboard/home/chat'>
                                    Chat
                                </Link>
                            </Button>
                    )}
                </>
            )}

        </>
    )
}
