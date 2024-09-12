export const revalidate = 600; // Revalidate the data every 600 seconds (10 minutes)

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, formatTime } from '@/libs/utils';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { getBookingwithRideIdAndPassengerId, getRidewithRideId, getBookingwithRideId } from '@/actions/action';
import { BookingType, RideType } from '@/libs/type';
import PassengerView from './PassengerView';
import DriverView from './DriverView';



export default async function RidePage({ params } : any) {

    const { ride_id } = params;
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const passenger_id = user?.id as string
    const bookingsWithPassengerId = await getBookingwithRideIdAndPassengerId(ride_id, passenger_id) as BookingType[]
    const bookings = await getBookingwithRideId(ride_id) as BookingType[]

    const ride = await getRidewithRideId(ride_id) as RideType
    return (
        <>
            { ride && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">Ride Details</CardTitle>
                        <div className="flex flex-row justify-between py-4">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <Image
                                        src={ride?.driver?.profileImage as string | StaticImport}
                                        alt="User Profile Image"
                                        width={80}  // Set the appropriate width
                                        height={80} // Set the appropriate height
                                        className="rounded-full aspect-square object-cover"
                                        priority
                                    />

                                </div>
                                <div className="flex flex-col space-y-2 text-base lg:text-xl font-bold">
                                    {ride?.driver?.fullName}
                                    <Button className='btn-primary text-xs mr-2 mt-2 w-fit h-fit' >
                                        <Link href={`/dashboard/home/profile/${ride?.driver?.user_id}`}>
                                            Check Profile
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2">
                            <div className="flex items-center">
                                <span className="font-semibold text-gray-700">Origin: </span>
                                <span className="ml-2 text-gray-600">{ride?.origin}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="font-semibold text-gray-700">Destination: </span>
                                <span className="ml-2 text-gray-600">{ride?.destination}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="font-semibold text-gray-700">Departure Date: </span>
                                <span className="ml-2 text-gray-600">{formatDate(ride?.departure_time?.toLocaleString() as string)}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="font-semibold text-gray-700">Departure Time: </span>
                                <span className="ml-2 text-gray-600">{formatTime(ride?.departure_time?.toLocaleString() as string)}</span>
                            </div>
                            <div className="flex items-center mt-2">
                                <span className="font-semibold text-gray-700">Available Seats: </span>
                                <span className="ml-2 text-gray-600">{ride?.available_seats}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardContent>
                        {
                            ride?.driver?.user_id == user?.id ? (                                                                
                                <DriverView severBookings={bookings} ride_id={ride_id} />
                            ) : (
                                <PassengerView ride_id={ride_id} passenger_id={passenger_id} ride={ride} severBookings={bookingsWithPassengerId} />                               
                            )
                        }
                    </CardContent>
                </Card >
                )
            }
        </>
    )
}


