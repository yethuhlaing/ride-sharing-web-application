import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React, { Suspense } from 'react'
import { getBookingwithUserId, getRidewithDriverId } from '@/actions/action';
import { BookingType} from '@/libs/type';

import ListPublishs from './ListPublishs';
import ListBooking from './ListBooking';
import LoadingComponent from '@/components/specific/LoadingComponent';

export default  async function History() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const rides = await getRidewithDriverId(user?.id as string)
    const bookings = await getBookingwithUserId(user?.id as string) as BookingType[]

    return (
        <div className='flex flex-row flex-wrap space-y-2 md:space-y-0 space-x-0 md:space-x-6 justify-center w-full h-full'>
            <Suspense fallback={<LoadingComponent />}>
                <ListBooking bookings={bookings} />
            </Suspense>
            <Suspense fallback={<LoadingComponent />}>
                <ListPublishs rides={rides || []} />
            </Suspense>
        </div>
    )


    
}

