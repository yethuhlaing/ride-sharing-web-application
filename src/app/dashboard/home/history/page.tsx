import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NotFound from '../NotFound';
import { getBookingwithUserId, getRidewithDriverId, getRidewithRideId } from '@/actions/action';
import { formatDate, formatTime } from '@/libs/utils';
import { CalendarIcon, Navigation, MapPin, Clock12, TrendingUp, Users } from 'lucide-react';
import { BookingType, RideDataType, RideType, UserType } from '@/libs/type';
import Image from 'next/image';
import defaultPic from "@@/public/assets/avatar.png"
import Link from 'next/link';

export default  async function History() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const rides = await getRidewithDriverId(user?.id as string)
    const bookings = await getBookingwithUserId(user?.id as string) as BookingType[]
    return (
        <div className='flex flex-row flex-wrap space-y-2 md:space-y-0 space-x-0 md:space-x-2 justify-center w-full flex-1 h-screen'>
            <div className='w-full md:flex-1 h-full'>
                <div className='text-2xl lg:text-3xl font-bold py-4 px-2'>Your Bookings</div>
                {bookings && bookings.length > 0 && bookings.map((booking: BookingType) => (
                    <Card key={booking.booking_id} className='flex-row items-center justify-center space-y-2 pt-4 px-2'>
                        <CardContent className='space-y-2'>
                            <div className="flex  items-center text-xs lg:text-base space-x-3">
                                <Image
                                    src={booking?.ride?.driver?.profileImage || defaultPic}
                                    alt="User Profile Image"
                                    width={40}  // Set the appropriate width
                                    height={40} // Set the appropriate height
                                    className="rounded-full aspect-square object-cover"
                                />
                                <span className=" ">{booking?.ride?.driver?.fullName || ""}</span>
                            </div>
                            <div className="flex items-center text-xs lg:text-base space-x-3">
                                <span className="font-semibold "><TrendingUp size={20} /></span>
                                <span className=" text-gray-600">{booking.status}</span>
                            </div>
                            <div className="flex items-center text-xs lg:text-base space-x-3">
                                <span className="font-semibold "><Navigation size={20} /></span>
                                <span className=" text-gray-600">{booking.ride.origin}</span>
                            </div>
                            <div className="flex items-center text-xs lg:text-base space-x-3">
                                <span className="font-semibold "><MapPin size={20} /></span>
                                <span className=" text-gray-600">{booking.ride.destination}</span>
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
                { bookings && bookings.length === 0 && (
                    <div className='text-center p-6'>There is no pending Booking Request</div>
                    )
                }
            </div>
            <div className='w-full md:flex-1 h-full'>
                <div className='text-2xl lg:text-3xl font-bold py-4 px-2'>Your Publishs</div>
                {rides && rides.length > 0 && rides.map( (ride) => (
                    <Link href={`/dashboard/home/ride/${ride.ride_id}`} className='hover:bg-secondary-foreground'>
                        <Card key={ride.ride_id} className='flex-row items-center justify-center space-y-2 p-4 hover:bg-primary-foreground mt-2'>
                            <div className="flex items-center text-xs lg:text-base space-x-3">
                                <span className="font-semibold "><Navigation size={20} /></span>
                                <span className=" text-gray-600">{ride.origin}</span>
                            </div>
                            <div className="flex items-center text-xs lg:text-base space-x-3">
                                <span className="font-semibold "><MapPin size={20} /></span>
                                <span className=" text-gray-600">{ride.destination}</span>
                            </div>
                            <div className="flex items-center text-xs lg:text-base space-x-3">
                                <span className="font-semibold "><CalendarIcon size={20} /></span>
                                <span className=" text-gray-600">{formatDate(ride.departure_time.toLocaleString())}</span>
                            </div>
                            <div className="flex items-center text-xs lg:text-base space-x-3">
                                <span className="font-semibold "><Clock12 size={20} /></span>
                                <span className=" text-gray-600">{formatTime(ride.departure_time.toLocaleString())}</span>
                            </div>
                        </Card>
                    </Link>
                )) 
                }
            </div>
        </div>
    )


    
}


export async function PassengerProfile({ ride_id } : { ride_id : string}) {
    let rides = await getRidewithRideId(ride_id) as RideType
    let ConfirmedRides = rides.bookings?.filter((booking: BookingType) => booking.status == 'Confirmed')

    return (
        <>
            <div className="flex flex-row space-x-2 flex-wrap">
                {ConfirmedRides && ConfirmedRides.length > 0 ? (
                    ConfirmedRides.map((booking: BookingType) => (
                        <img
                            key={booking.booking_id}
                            src={booking.passenger.profileImage as string}
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