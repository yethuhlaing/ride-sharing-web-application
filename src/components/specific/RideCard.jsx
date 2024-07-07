import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export default function RideCard({ ride }){
    return (
        <Card className="min-w-sm mx-auto shadow-sm border px-3 border-gray-200 flex items-center justify-start">
            <Image
                src={ride.driver.profileImage}
                alt="User Profile Image"
                width={70}  // Set the appropriate width
                height={70} // Set the appropriate height
                className="rounded-xl aspect-square object-cover"
            />
                {/* <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900">Ride Details</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        Driver Name: {ride.driver.fullName}
                    </CardDescription>
                </CardHeader> */}
            <CardContent>
                <div className='flex-col items-center justify-center'>
                    <div className="flex items-center text-xs lg:text-base">
                        <span className="font-semibold text-gray-700">Origin: </span>
                        <span className="ml-2 text-gray-600">{ride.origin}</span>
                    </div>
                    <div className="flex items-center mt-2 text-xs lg:text-base">
                        <span className="font-semibold text-gray-700">Destination: </span>
                        <span className="ml-2 text-gray-600">{ride.destination}</span>
                    </div>
                    <div className="flex items-center mt-2 text-xs lg:text-base">
                        <span className="font-semibold text-gray-700">Departure Time: </span>
                        <span className="ml-2 text-gray-600">{new Date(ride.departure_time).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center mt-2 text-xs lg:text-base">
                        <span className="font-semibold text-gray-700">Available Seats: </span>
                        <span className="ml-2 text-gray-600">{ride.available_seats}</span>
                    </div>
                </div>
            </CardContent>

        </Card>
    );
};

