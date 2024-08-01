import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getCompleteBooking, getRidewithDriverId, getUserData } from '@/actions/action';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { BookingType, ReviewType, RideType } from '@/libs/type';
import { ChevronsRight, Star } from 'lucide-react';
import { formatDate, getFirstLocationName } from '@/libs/utils';
import { StarColors } from '@/libs/data';


export default async function ProfilePage({params} : any) {
    const { id } = params
    const useData = await getUserData(id as string);
    const rides = await getRidewithDriverId(id as string)

    return (
        <Card>
            <CardHeader>
                <Image
                    src={useData?.profileImage as string | StaticImport}
                    alt="User Profile Image"
                    width={80}  // Set the appropriate width
                    height={80} // Set the appropriate height
                    className="rounded-full aspect-square object-cover"
                    priority
                />
            </CardHeader>
            <CardContent>
                <div className="mt-2">
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">FullName: </span>
                        <span className="ml-2 text-gray-600">{useData?.fullName}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">UserBio: </span>
                        <span className="ml-2 text-gray-600">{useData?.userBio || "..."}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">Email: </span>
                        <span className="ml-2 text-gray-600">{useData?.email}</span>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="font-semibold text-gray-700">Phone: </span>
                        <span className="ml-2 text-gray-600">{useData?.phone || "..."}</span>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                {rides && rides.length > 0 ? (
                    rides.map((ride: RideType) => (
                        <div key={ride.ride_id} className='pt-4 mb-2'>
                            <div className='flex flex-col items-start space-y-2'>
                                <div className='flex flex-row space-x-2 flex-wrap'>
                                    <div className="flex items-center text-xs lg:text-sm bg-primary text-neutral-50 px-4 py-1 rounded-lg">
                                        <span className='flex flex-row justify-center'>
                                            {getFirstLocationName(ride?.origin as string)}
                                            <ChevronsRight className='text-secondary-foreground text-xs lg:text-sm' size={14}/>
                                            {getFirstLocationName(ride?.destination as string)}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-xs lg:text-sm bg-secondary-foreground text-primary px-4 py-1 rounded-lg">
                                        <span>{formatDate(ride?.departure_time.toLocaleString() as string)}</span>
                                    </div>
                                </div>      
                                <div className='flex lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0 flex-wrap'>
                                    {ride?.reviews?.map((review) => (
                                        <ReviewCard key={review.review_id} review={review} />
                                    ))}     
                                </div>
         
                                 
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No Reviews found.</p>
                )}
            </CardContent>
        </Card>
    )
}



export function ReviewCard({ review }: { review: ReviewType}){
    console.log(review)
    return (
        <Card className='max-w-lg p-4'>
            <div className="flex flex-row">
                <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-700 pt-2">{review.comment}</p>
        </Card>
    );
}
export function StarRating({ rating }: { rating: number }) {
    console.log(rating)
    const totalStars = 5;
    return (
        <>
            {[...Array(totalStars)].map((_, index: any) => (
                <Star
                    key={index}
                    color={index < rating ? StarColors.hover : StarColors.current}
                    className={`mr-1 `}
                    size={24}
                />
            ))}
        </>
    )
}