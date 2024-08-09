import { getCompleteBooking } from '@/actions/action'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookingType } from '@/libs/type';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { ChevronsRight } from 'lucide-react';
import { formatDate, getFirstLocationName } from '@/libs/utils';
import ReviewForm from './ReviewForm';


export default async function ReviewPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const CompleteBookings = await getCompleteBooking(user?.id as string)
    return (
        <div>
            <div className='text-2xl lg:text-3xl font-bold py-4 px-2'>Your Reviews</div>
            {CompleteBookings && CompleteBookings.length > 0 ? (
                CompleteBookings.map((booking: BookingType) => (
                    <Card key={booking.booking_id} className='pt-4 mb-2'>
                        <CardContent className='flex flex-col items-start space-y-2'>
                            <div className='flex flex-row space-x-2 flex-wrap'>
                                <div className="flex items-center text-xs lg:text-sm bg-primary text-neutral-50 px-4 py-1 rounded-lg">
                                    <span className='flex flex-row justify-center'>
                                        {getFirstLocationName(booking.ride?.origin as string)} 
                                        <ChevronsRight className='text-secondary-foreground text-xs lg:text-sm' />
                                        {getFirstLocationName(booking.ride?.destination as string)}
                                    </span>
                                </div>
                                <div className="flex items-center text-xs lg:text-sm bg-secondary-foreground text-primary px-4 py-1 rounded-lg">
                                    <span>{formatDate(booking.ride?.departure_time.toLocaleString() as string)}</span>
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-center space-y-4 space-x-4'>
                                <div>
                                    <Image
                                        src={booking.ride?.driver?.profileImage as string}
                                        alt="User Profile Image"
                                        width={70}  // Set the appropriate width
                                        height={70} // Set the appropriate height
                                        className="rounded-full aspect-square object-cover"
                                        priority
                                    />
                                </div>
                                <div className='flex flex-col space-y-1 justify-between'>
                                    <Button className="btn btn-primary text-xs w-auto h-auto">
                                        <Link href={`/dashboard/home/profile/${booking.ride?.driver_id}`}>
                                            Profile
                                        </Link>
                                    </Button>
                                    {booking.ride?.reviews?.some(review => review.passenger_id === user?.id) ? (
                                        <Button className="btn btn-primary text-xs w-auto h-auto text-primary bg-secondary-foreground" disabled>
                                            Reviewed
                                        </Button>
                                    ) : (
                                        <ReviewForm ride_id={booking.ride?.ride_id} passenger_id={user?.id} />
                                    )}

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-center">No Reviews found.</p>
            )}
        </div>
    )
}

