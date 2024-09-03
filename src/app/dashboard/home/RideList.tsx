import LoadingComponent from '@/components/specific/LoadingComponent'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RideType } from '@/libs/type'
import { formatTime, formatDate } from '@/libs/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import React, { Suspense } from 'react'

function RideList({ rides }: { rides: RideType[] }) {
    
    return (
        rides && rides.length > 0 ? (
            <div className="space-y-2">
                {rides.map((ride, index) => (
                    <Card key={index} className="min-w-sm mx-auto py-2 px-4 lg:p-4 shadow-sm border border-gray-200 flex items-center justify-between">
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
                                <span className="ml-2 text-gray-600">{formatDate(ride.departure_time.toLocaleString())}</span>
                            </div>
                            {/* <div className="flex items-center text-xs lg:text-base">
                            <span className="font-semibold text-gray-700">Departure Time: </span>
                            <span className="ml-2 text-gray-600">{formatTime(ride.departure_time.toLocaleString())}</span>
                        </div> */}
                            {/* <div className="flex items-center text-xs lg:text-base">
                            <span className="font-semibold text-gray-700">Available Seats: </span>
                            <span className="ml-2 text-gray-600">{ride.available_seats}</span>
                        </div> */}
                        </div>
                        <div className='flex flex-col items-center justify-between space-y-2 lg:space-y-4'>
                            <Image
                                src={ride.driver?.profileImage as string | StaticImport}
                                alt="User Profile Image"
                                width={30}  // Set the appropriate width
                                height={30} // Set the appropriate height
                                className="rounded-full aspect-square object-cover lg:w-12 lg:h-12 "
                                priority
                            />
                            <Button className="btn btn-primary text-xs lg:w-auto lg:h-auto h-6">
                                <Link href={`/dashboard/home/ride/${ride.ride_id}`}>
                                    See More...
                                </Link>
                            </Button>
                        </div>
                    </Card>

                ))}
            </div>
        ) : (
            <div className='flex flex-col h-full w-full p-2 items-center justify-between bg-secondary rounded-md text-secondary-foreground '>
                <div className='m-auto text-sm px-6 py-1 bg-primary rounded-3xl text-neutral-50'>Find your Journey with <span className='text-secondary-foreground'>WeGo</span></div>
            </div>
        )

    )
}

export default RideList