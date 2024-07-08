import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import prisma from '@/libs/db';
import { formatDate, formatTime } from '@/libs/utils';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';
import { Button } from '@/components/ui/button';



async function getRide(ride_id: string) {

    try {
        const ride = await prisma.ride.findUnique({
            where: {
                ride_id: ride_id
            },
            include: {
                driver: true,
            },
        });
        console.log(ride)
        return ride;
    } catch (error) {
        console.error('Error fetching rides:', error);
        throw error;
    }
}
async function getVehicles(user_id: string) {
    const vehicles = await prisma.vehicle.findMany({
        where: {
            user_id: user_id,
        },
        select: {
            vehicle_id: true,
            brand: true,
            model: true,
            color: true,
            year: true,
            licensePlate: true,
        },
    });
    console.log(vehicles)
    return vehicles;
}

export default async function RidePage({ params } : any) {
    const { ride_id } = params;
    console.log(ride_id)
    const ride = await getRide(ride_id)
    const vehicles = await getVehicles(ride?.driver_id as string)
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Ride Details</CardTitle>
                <CardDescription>
                    <div className="flex flex-col justify-between">
                        <div className="flex items-center space-x-4">
                            <div>
                                <Image
                                    src={ride?.driver.profileImage as string | StaticImport}
                                    alt="User Profile Image"
                                    width={70}  // Set the appropriate width
                                    height={70} // Set the appropriate height
                                    className="rounded-full aspect-square object-cover"
                                />

                            </div>
                            <div className="text-xl">
                                {ride?.driver.fullName}
                            </div>
                        </div>
                        <div>
                            <Button className='btn-primary'>
                                <Link href={`/dashboard/home/profile/${ride?.driver.user_id}`} replace>
                                    Check Profile
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardDescription>
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
                        <span className="ml-2 text-gray-600">{formatDate(ride?.departure_time.toLocaleString() as string)}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">Departure Time: </span>
                        <span className="ml-2 text-gray-600">{formatTime(ride?.departure_time.toLocaleString() as string)}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">Available Seats: </span>
                        <span className="ml-2 text-gray-600">{ride?.available_seats}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


