"use client"

import React, { useEffect, useState } from 'react'
import GoogleMapInput from "@/components/specific/GoogleMapInput"
import { MapPin, Navigation, CalendarIcon } from "lucide-react";
import { DatePickerWithPresets } from '@/components/specific/DatePicker';
import { useQueryState, parseAsInteger, parseAsTimestamp, parseAsIsoDateTime } from 'nuqs'
import toast from 'react-hot-toast';
import { SubmitButton } from '@/components/specific/SubmitButton';
import { countRides, findRides } from '@/actions/action';
import { RideType } from '@/libs/type';
import RideList from './RideList';
import PaginationComponent from './PaginationComponent';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import prisma from '@/libs/db';
import { createParser } from 'nuqs'


export default function SearchForm() {
    const [pickUpValue, setPickupValue] = useQueryState('pickUpValue')
    const [dropOffValue, setDropOffValue] = useQueryState('dropOffValue');
    const [date, setDate] = useState<Date | undefined>();    

    const [ rides, setRides ] = useState<RideType[]>([])
    const [ ridesCount, setRidesCount ] = useState(0)

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
    const [pageSize, setPageSize] = useQueryState('page_size', parseAsInteger.withDefault(3));

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
                const searchedRidesCount = await countRides(pickUpValue, dropOffValue, date)
                setRides(searchedRides)
                setRidesCount(searchedRidesCount)
            } else{
                toast.error('Please fill in your form completely!')
            }
        } catch (error: any) {
            console.log(error);
            toast.error("Failed to search the ride")
        }
    }
    useEffect(() => {
        const totalPages = Math.ceil(ridesCount / pageSize);
        if (page > 0 && page <= totalPages) {
            SearchRide();
        }
    }, [page, ridesCount]); 
    return (
        <div className='relative flex flex-col h-full'>
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
            <RideList rides={rides} />
            <PaginationComponent
                rideCount={ridesCount}
                setPage={setPage}
                pageSize={pageSize}
                currentPage={page}
            />

        </div>

    )
}
