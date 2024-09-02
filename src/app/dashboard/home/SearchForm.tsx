"use client"

import React, { useEffect, useState } from 'react'
import GoogleMapInput from "@/components/specific/GoogleMapInput"
import { MapPin, Navigation, CalendarIcon } from "lucide-react";
import { DatePickerWithPresets } from '@/components/specific/DatePicker';
import { useQueryState, parseAsInteger, parseAsTimestamp, parseAsIsoDateTime } from 'nuqs'
import toast from 'react-hot-toast';
import { SubmitButton } from '@/components/specific/SubmitButton';
import { findRides } from '@/actions/action';
import { RideType } from '@/libs/type';
import RideList from './RideList';
import PaginationComponent from './PaginationComponent';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import prisma from '@/libs/db';
import { createParser } from 'nuqs'

// Utility function to parse the date
const parseDate = (value: string | undefined): Date | undefined => {
    if (!value) return undefined;
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
};
// Utility function to serialize the date
const serializeDate = (value: Date | undefined): string | undefined => {
    return value ? value.toISOString().split('T')[0] : undefined;
};
export default function SearchForm() {
    const [pickUpValue, setPickupValue] = useQueryState('pickUpValue')
    const [dropOffValue, setDropOffValue] = useQueryState('dropOffValue');
    const [date, setDate] = useState<Date | undefined>();    


    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
    const [pageSize, setPageSize] = useQueryState('page_size', parseAsInteger.withDefault(4));

    const handlePickUpSelect = (place: any) => {
        console.log(pickUpValue)
        if (place) {
            setPickupValue(place)
        } else {
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
            if (pickUpValue && dropOffValue && date) {
                const searchedRides = await findRides(pickUpValue, dropOffValue, date, page, pageSize)
                // const query = new URLSearchParams({
                //     pickUpValue: pickUpValue || "",
                //     dropOffValue: dropOffValue || "",
                //     date: date?.toISOString() || "",
                // }).toString();

                // router.push(`/dashboard/home?${query}`);

            }
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to search the ride")
        }
    }

    return (
        <div className="bg-[#ffffff] py-4 sticky top-0 flex flex-wrap lg:space-x-2 space-x-0 lg:space-y-0 space-y-2 lg:justify-between justify-center">
            <div className="flex items-center space-x-1">
                <Navigation size={20} />
                <GoogleMapInput value={pickUpValue} handleSelect={handlePickUpSelect} placeholderName={"Pickup Location"} />
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
                <SubmitButton buttonName='Search' />
            </form>
        </div>
    )
}

