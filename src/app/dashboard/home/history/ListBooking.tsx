import { BookingType, RideType } from '@/libs/type'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Navigation, MapPin, Clock12, TrendingUp, Users } from 'lucide-react';
import defaultPic from "@@/public/assets/avatar.png"
import { formatDate, formatTime } from '@/libs/utils';
import Image from 'next/image';
import { getRidewithRideId } from '@/actions/action';
function ListBooking({ bookings} : { bookings: BookingType[]}) {
    return (
        <div className='w-full md:flex-1'>
            <div className='text-2xl lg:text-3xl font-bold py-4 px-2'>Your Bookings</div>
            {bookings && bookings.length > 0 && bookings.map((booking: BookingType) => (
                <Card key={booking.booking_id} className='flex-row items-center justify-center space-y-2 pt-4 mb-2'>
                    <CardContent className='space-y-2'>
                        <div className="flex  items-center text-xs lg:text-base space-x-3">
                            <Image
                                src={booking?.ride?.driver?.profileImage || defaultPic}
                                alt="User Profile Image"
                                width={40}  // Set the appropriate width
                                height={40} // Set the appropriate height
                                className="rounded-full aspect-square object-cover"
                                priority
                            />
                            <span className=" ">{booking?.ride?.driver?.fullName || ""}</span>
                        </div>
                        <div className="flex items-center text-xs lg:text-base space-x-3">
                            <span className="font-semibold "><TrendingUp size={20} /></span>
                            <span className=" text-gray-600">{booking.status}</span>
                        </div>
                        <div className="flex items-center text-xs lg:text-base space-x-3">
                            <span className="font-semibold "><Navigation size={20} /></span>
                            <span className=" text-gray-600">{booking.ride?.origin}</span>
                        </div>
                        <div className="flex items-center text-xs lg:text-base space-x-3">
                            <span className="font-semibold "><MapPin size={20} /></span>
                            <span className=" text-gray-600">{booking.ride?.destination}</span>
                        </div>
                        <div className="flex items-center text-xs lg:text-base space-x-3">
                            <span className="font-semibold "><CalendarIcon size={20} /></span>
                            <span className=" text-gray-600">{formatDate(booking.createdAt.toLocaleString())}, {formatTime(booking.createdAt.toLocaleString())}</span>
                        </div>
                        <div className="flex items-center text-xs lg:text-base space-x-3">
                            <span className="font-semibold "><Users size={20} /></span>
                            <div>
                                <PassengerProfile ride_id={booking.ride_id} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))
            }

            {bookings && bookings.length === 0 && (
                <div className='text-center p-6 text-green-500 font-semibold mx-auto'>There is no pending Booking Request</div>
            )
            }
        </div>
    )
}

export async function PassengerProfile({ ride_id }: { ride_id: string }) {
    let rides = await getRidewithRideId(ride_id) as RideType
    let ConfirmedRides = rides.bookings?.filter((booking: BookingType) => booking.status == 'Confirmed')

    return (
        <>
            <div className="flex flex-row space-x-2 flex-wrap">
                {ConfirmedRides && ConfirmedRides.length > 0 ? (
                    ConfirmedRides.map((booking: BookingType) => (
                        <img
                            key={booking.booking_id}
                            src={booking.passenger?.profileImage as string}
                            alt="User Profile Image"
                            width={30} // Set the appropriate width
                            height={30} // Set the appropriate height
                            className="rounded-full aspect-square object-cover"
                        />
                    ))
                ) : (
                    <div>There is no confirmed passenger yet.</div>
                )}
            </div>
        </>
    );

}
export default ListBooking