"use client"

import React, { useRef, useState } from 'react';
import { SubmitButton } from '@/components/specific/SubmitButton';
import GoogleMapInput from "@/components/specific/GoogleMapInput"
import { Input } from '@/components/ui/input';
import { DatePickerWithPresets } from '@/components/specific/DatePicker';
import { useRouter } from 'next/navigation';
import { createRide } from '@/actions/action';
import toast from 'react-hot-toast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Clock, MapPin } from 'lucide-react';
import { CalendarIcon, Navigation, UserRound } from 'lucide-react';
import { useLocation } from '@/context/LocationContextProvider';
import { getLatAndLng } from '@/libs/utils';

function RideForm() {

    const { setSource, setDestination } = useLocation()

    const { getUser } = useKindeBrowserClient()
    const user_id = getUser()

    const [pickupValue, setPickupValue] = useState<any>(null)
    const [dropOffValue, setDropOffValue] = useState<any>(null)
    const [date, setDate] = useState<Date | null>(null)
    const [time, setTime] = useState("")
    const passengersRef = useRef<HTMLInputElement | null>(null)
    const router = useRouter();

    const handleSubmit = async () => {
        const combinedDateTime = date;
        const [hours, minutes] = time?.split(':');
        combinedDateTime?.setHours(parseInt(hours, 10));
        combinedDateTime?.setMinutes(parseInt(minutes, 10));

        const rideData = {
            driver_id: user_id?.id,
            origin: pickupValue?.label,
            destination: dropOffValue?.label,
            departure_time: combinedDateTime,
            available_seats: Number(passengersRef.current?.value),
        };
        console.log(rideData)
        try {
            await createRide({ ...rideData })
            toast.success("Successfully Published the ride!")
            resetFormData()
            router.push('/dashboard/home');

        } catch (error) {
            console.log(error);
            toast.error("Failed in publishing ride!")
            // Handle network error
        }
    };
    const resetFormData = () => {
        setSource(null);
        setDestination(null);
        setPickupValue(null);
        setDropOffValue(null);
        setDate(null);
        setTime("")
        if (passengersRef.current) {
            passengersRef.current.value = ""; // Directly updating the input value
        }
    }

    const handlePickUpSelect = async (place: any) => {
        setPickupValue(place);

        try {
            const result = await getLatAndLng(place);
            console.log(result);
            if (result) {
                setSource(result);
            } else {
                setSource(null);
            }
        } catch (error) {
            console.error("Error getting location details:", error);
            setSource(null);
        }
    };

    const handleDropOffSelect = async (place: any) => {
        setDropOffValue(place)
        try {
            const result = await getLatAndLng(place);
            if (result && result !== null) {
                setDestination(result)
            } else {
                setDestination(null);
            }
        } catch (error) {
            console.error("Error getting location details:", error);
            setSource(null);
        }

    };
    return (
        <form className="space-y-2" action={handleSubmit}>
            <div className="flex items-center space-x-3">
                <Navigation size={20} />
                <GoogleMapInput value={pickupValue} handleSelect={handlePickUpSelect} placeholderName={"Pickup Location"} />
            </div>
            <div className="flex items-center space-x-3">
                <MapPin size={20} />
                <GoogleMapInput value={dropOffValue} handleSelect={handleDropOffSelect} placeholderName={"DropOff Location"} />
            </div>
            <div className='flex items-center'>
                <UserRound size={20} />
                <Input required type='number' name='passengers' ref={passengersRef} className='w-full text-sm ml-4' placeholder='Number of passengers' />
            </div>
            <div className='flex items-center'>
                <CalendarIcon size={20} />
                <DatePickerWithPresets date={date} setDate={setDate} placeholderName={"Departure Date"} />
            </div>
            <div className='flex items-center'>
                <Clock size={20} />
                <Input type='time' required value={time} onChange={(e) => setTime(e.target.value)} className='w-full text-sm ml-4' />
            </div>
            <SubmitButton buttonName="Publish" />
        </form>

    )
}

export default RideForm