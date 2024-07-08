import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { formatDate, formatTime } from '@/libs/utils';
import { Button } from '../ui/button';

export default function RideCard({ ride }){
    return (
        <Card className="min-w-sm mx-auto p-4 shadow-sm border border-gray-200 flex items-center justify-between">

                {/* <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Ride Details</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        Driver Name: {ride.driver.fullName}
                    </CardDescription>
                </CardHeader> */}
            <div className='flex-row items-center justify-center space-y-1'>
                <div className="flex items-center text-xs lg:text-base">
                    <span className="font-semibold text-gray-700">Origin: </span>
                    <span className="ml-2 text-gray-600">{ride.origin}</span>
                </div>
                <div className="flex items-center text-xs lg:text-base">
                    <span className="font-semibold text-gray-700">Destination: </span>
                    <span className="ml-2 text-gray-600">{ride.destination}</span>
                </div>
                <div className="flex items-center text-xs lg:text-base">
                    <span className="font-semibold text-gray-700">Departure Date: </span>
                    <span className="ml-2 text-gray-600">{formatDate(ride.departure_time)}</span>
                </div>
                <div className="flex items-center text-xs lg:text-base">
                    <span className="font-semibold text-gray-700">Departure Time: </span>
                    <span className="ml-2 text-gray-600">{formatTime(ride.departure_time)}</span>
                </div>
                <div className="flex items-center text-xs lg:text-base">
                    <span className="font-semibold text-gray-700">Available Seats: </span>
                    <span className="ml-2 text-gray-600">{ride.available_seats}</span>
                </div>
            </div>
            <div className='flex flex-col items-center justify-between space-y-4'>
                <Image
                    src={ride.driver.profileImage}
                    alt="User Profile Image"
                    width={70}  // Set the appropriate width
                    height={70} // Set the appropriate height
                    className="rounded-full aspect-square object-cover"
                />
                <Button className="btn btn-primary text-xs w-auto h-auto">
                    See more...
                </Button>
            </div>
        </Card>
    );
};

