import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { getBookingwithUserId, getRidewithDriverId, getRidewithRideId } from '@/actions/action';
import { BookingType} from '@/libs/type';

import ListPublishs from './ListPublishs';
import ListBooking from './ListBooking';

export default  async function History() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const rides = await getRidewithDriverId(user?.id as string)
    const bookings = await getBookingwithUserId(user?.id as string) as BookingType[]
    console.log()
    return (
        <div className='flex flex-row flex-wrap space-y-2 md:space-y-0 space-x-0 md:space-x-6 justify-center w-full h-full'>
            <ListBooking bookings={bookings}/>
            <ListPublishs rides={rides}/>
        </div>
    )


    
}

