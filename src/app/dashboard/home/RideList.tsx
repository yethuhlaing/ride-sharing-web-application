import { RideType } from '@/libs/type'
import { formatDate } from '@/libs/utils'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function RideList({ rides }: { rides: RideType[] }) {
    
    return (
        rides && rides.length > 0 ? (
            <div className="space-y-2">
                {rides.map((ride, index) => (
                    <Link href={`/dashboard/home/ride/${ride.ride_id}`} key={index} className="rounded-lg hover:bg-slate-100 min-w-sm mx-auto py-2 px-4 lg:p-4 shadow-sm border border-gray-200 flex items-center justify-between">
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
                                width={100}  // Set the appropriate width
                                height={100} // Set the appropriate height
                                className="rounded-full aspect-square w-12 h-12 md:w-16 md:h-16"
                            />
                        </div>
                    </Link>

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