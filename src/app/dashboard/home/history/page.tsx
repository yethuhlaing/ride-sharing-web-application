import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NotFound from '../NotFound';
import { getBookingwithUserId, getRidewithDriverId, getRidewithRideId } from '@/actions/action';
import { formatDate, formatTime } from '@/libs/utils';
import { CalendarIcon, Navigation, MapPin, Clock12, TrendingUp, Users } from 'lucide-react';
import { BookingType, RideDataType, RideType, UserType } from '@/libs/type';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';


export default  async function History() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const rides = await getRidewithDriverId(user?.id as string)
    const bookings = await getBookingwithUserId(user?.id as string) as BookingType[]

    return (
        <div className='flex flex-row flex-wrap space-y-2 md:space-y-0 space-x-0 md:space-x-2 justify-center w-full flex-1'>
            <Card className='w-full md:flex-1'>
                <CardHeader>
                    <CardTitle>Your Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                    {bookings && bookings.length > 0 && bookings.map((booking: BookingType) => (
                            <div key={booking.booking_id} className=' border-b-2 border-neutral-400'>
                                <div className='flex-row items-center justify-center space-y-2 py-4 px-2'>
                                    <div className="flex items-center text-xs lg:text-base space-x-3">
                                        <Image
                                            src={booking.ride.driver.profileImage as string}
                                            alt="User Profile Image"
                                            width={40}  // Set the appropriate width
                                            height={40} // Set the appropriate height
                                            className="rounded-full aspect-square object-cover"
                                        />                                
                                        <span className=" ">{booking.ride.driver.fullName}</span>
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
                                </div>
                            </div>                            
                        ))
                    }
                    { bookings && bookings.length === 0 && (
                        <div className='text-center p-6'>There is no pending Booking Request</div>
                        )
                    }
                </CardContent>
            </Card>
            <Card className='w-full md:flex-1'>
                <CardHeader>
                    <CardTitle>Your Rides</CardTitle>
                </CardHeader>
                <CardContent>
                    {rides && rides.length > 0 && rides.map( (ride) => (
                        <div key={ride.ride_id} className='border-b-2 border-neutral-400'>
                            <div className='flex-row items-center justify-center space-y-2 py-4 px-2'>
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
                            </div>
                        </div>
                    )) 
                    }
                </CardContent>
            </Card>
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