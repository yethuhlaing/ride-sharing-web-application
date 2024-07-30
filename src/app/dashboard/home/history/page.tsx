import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import NotFound from '../NotFound';
import { deleteRide, getBookingwithUserId, getRidewithDriverId, getRidewithRideId } from '@/actions/action';
import { formatDate, formatTime } from '@/libs/utils';
import { CalendarIcon, Navigation, MapPin, Clock12, TrendingUp, Users } from 'lucide-react';
import { BookingType, RideDataType, RideType, UserType } from '@/libs/type';
import Image from 'next/image';

import ListPublishs from './ListPublishs';
import ListBooking from './ListBooking';

export default  async function History() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const rides = await getRidewithDriverId(user?.id as string)
    const bookings = await getBookingwithUserId(user?.id as string) as BookingType[]


    return (
        <div className='flex flex-row flex-wrap space-y-2 md:space-y-0 space-x-0 md:space-x-6 justify-center w-full h-full'>
            <ListBooking bookings={bookings}/>
            <ListPublishs rides={rides}/>
        </div>
    )


    
}

