"use client"

import React, { Suspense, useEffect, useState } from 'react';
import GoogleMapInput from "@/components/specific/GoogleMapInput"
import { MapPin, Navigation, CalendarIcon } from "lucide-react";
import { DatePickerWithPresets } from '@/components/specific/DatePicker';
import RideList from './RideList';
import { SubmitButton } from '@/components/specific/SubmitButton';
import { findRides } from '@/actions/action';
import toast from 'react-hot-toast';
import { RideDataType, RideType } from '@/libs/type';
import LoadingComponent from '@/components/loading/LoadingComponent';
import { Card } from '@/components/ui/card';


export default function DashboardPage(){
    const [pickupValue, setPickupValue] = useState<any>(null)
    const [dropOffValue, setDropOffValue] = useState<any>(null)
    const [date, setDate] = useState<Date | null>(null)
    const [ rides, setRides ] = useState<RideType[]>([])
    const handlePickUpSelect = (place: any) => {
        console.log(place)
        if (place) {
            setPickupValue(place)
        }else{
            setPickupValue(null)
        }


    };
    const handleDropOffSelect = (place: any) => {
        if (place) {
            setDropOffValue(place)
        } else {
            setDropOffValue(null)
        }
    };
    const SearchRide = async () => {
        try {
            const rides = await findRides(
                pickupValue?.label,
                dropOffValue?.label,
                date as Date
            )
            setRides(rides)
        } catch (error: any) {
            toast.error(error)
        }
    }

    
    return(
        <div className='relative flex flex-col h-full w-full'>
            <div className="bg-[#ffffff] py-4 sticky top-0 flex flex-wrap lg:space-x-2 space-x-0 lg:space-y-0 space-y-2 lg:justify-between justify-center">
                <div className="flex items-center space-x-1">
                    <Navigation size={20} />
                    <GoogleMapInput value={pickupValue} handleSelect={handlePickUpSelect} placeholderName={"Pickup Location"} />
                </div>
                <div className="flex items-center space-x-1">
                    <MapPin size={20} />
                    <GoogleMapInput value={dropOffValue} handleSelect={handleDropOffSelect} placeholderName={"DropOff Location"} />
                </div>
                <div className='flex items-center space-x-2 w-[320px] md:w-[500px] lg:w-[250px] '>
                    <CalendarIcon size={20} />
                    <DatePickerWithPresets date={date} setDate={setDate} placeholderName={"Departure Date"} />
                </div>
                <form action={SearchRide} className='w-[320px] md:w-[550px] lg:flex-1'>
                    <SubmitButton buttonName='Search'/>
                </form>
            </div>
            {
                rides && rides.length > 0 ? (
                    <Suspense fallback={<LoadingComponent />}>
                        <RideList rides={rides} />
                    </Suspense>
                ) : (
                    <div className='flex flex-col h-full w-full p-2 items-center justify-between bg-secondary rounded-md text-secondary-foreground '>
                        <div className='m-auto text-sm px-6 py-1 bg-primary rounded-3xl text-neutral-50'>No Data Available</div>
                    </div>
                )
            }
        </div>

    )
}