"use client"

import React, { Suspense, useEffect, useState } from 'react'
import GoogleMapInput from "@/components/specific/GoogleMapInput"
import { MapPin, Navigation, CalendarIcon } from "lucide-react";
import { DatePickerWithPresets } from '@/components/specific/DatePicker';
import { useQueryState, parseAsInteger } from 'nuqs'
import toast from 'react-hot-toast';
import { SearchButton } from '@/components/specific/SubmitButton';
import { countRides, findRides } from '@/actions/action';
import RideList from './RideList';
import PaginationComponent from './PaginationComponent';
import LoadingComponent from '@/components/specific/LoadingComponent';
import { useRides } from '@/context/RideContext';

export type RideQuery = {
    pickUpValue: string,
    dropOffValue: string,
    date: string,
    page_size: string;
    page: string;
};

export default function DashboardPage(){
    const [pickUpValue, setPickupValue] = useQueryState('pickUpValue')
    const [dropOffValue, setDropOffValue] = useQueryState('dropOffValue');
    const [date, setDate] = useState<Date | undefined>();


    const { rides, ridesCount, setRides, setRidesCount } = useRides();

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
    const [pageSize, setPageSize] = useQueryState('page_size', parseAsInteger.withDefault(4)); // eslint-disable-line no-unused-vars

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
                if (searchedRidesCount == 0) toast.error('No Rides Found!')
                setRides(searchedRides)
                setRidesCount(searchedRidesCount)
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
    }, [page, ridesCount]);  // eslint-disable-line react-hooks/exhaustive-deps

    return(
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
                    <SearchButton />
                </form>
            </div>
            <Suspense fallback={<LoadingComponent />}>
                <RideList rides={rides} />
            </Suspense>
            <PaginationComponent
                rideCount={ridesCount}
                setPage={setPage}
                pageSize={pageSize}
                currentPage={page}
            />
        </div>
    )
}

