import { RideType } from '@/libs/type'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, Navigation, MapPin, Clock12 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate, formatTime } from '@/libs/utils';
import { CancelButton } from '@/components/specific/SubmitButton';
import { deleteRide } from '@/actions/action';
import { Prisma } from '@prisma/client';
import toast from 'react-hot-toast';

function ListPublishs({ rides }: { rides: RideType[]}) {
    const handleDelete = async (ride_id: string) => {
        "use server"
        console.log(rides)

        try {
            await deleteRide(ride_id)
            toast.success("Successfully Deleted!")
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2003') { 
                    console.log('Cannot delete ride due to foreign key constraint:', error.meta);
                    toast.error("Failed to Delete due to some bookings in your Ride!")
                } else {
                    console.log('An error occurred:', error.message);
                    toast.error(error.message)
                }
            } else {
                console.error('An unexpected error occurred:', error);
                toast.error(error)
            }
        }
    }
    return (
        <div className='w-full md:flex-1'>
            <div className='text-2xl lg:text-3xl font-bold py-4 px-2'>Your Publishs</div>
            {rides && rides.length > 0 && rides.map((ride: RideType) => (
                <Card key={ride.ride_id} className='pt-4 space-y-2 mb-2'>
                    <CardContent className='flex justify-between'>
                        <div className='flex-row items-center justify-center space-y-2'>
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
                        <div className='flex flex-col justify-between p-4'>
                            <Button className="bg-primary hover:bg-[#6d71ba] text-xs mr-2 mt-2 w-full h-fit" type="submit">
                                <Link href={`/dashboard/home/ride/${ride.ride_id}`}>
                                    Check
                                </Link>
                            </Button>
                            {
                                ride.bookings && ride.bookings?.length === 0 ? (
                                    <form action={handleDelete.bind(null, ride.ride_id)}>
                                        <CancelButton buttonName='Delete' />
                                    </form>
                                ) : (
                                    <div>
                                        <div className='m-auto text-sm px-6 py-1 bg-green-500 rounded-3xl text-neutral-50'>Published</div>
                                    </div>
                                )
                            }

                        </div>
                    </CardContent>
                </Card>
            ))
            }
            {rides && rides.length === 0 && (
                <div className='text-center p-6 text-green-500 font-semibold'>You haven't published yet!</div>
            )
            }
        </div>
    )
}

export default ListPublishs