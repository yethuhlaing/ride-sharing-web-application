'use client';

import React, { useContext, useRef, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { CalendarIcon, Navigation, UserRound } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { LocationContext } from '@/context/LocationContextProvider';
import GoogleMapSection from "@/components/specific/GoogleMapSection"
import { SubmitButton } from '@/components/specific/SubmitButton';
import GoogleMapInput from "@/components/specific/GoogleMapInput"
import { Input } from '@/components/ui/input';
import { DatePickerWithPresets } from '@/components/specific/DatePicker';
import { useRouter } from 'next/navigation';
import { createRide } from '@/actions/action';
import toast from 'react-hot-toast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function DriverPage() {

    const { getUser } = useKindeBrowserClient()
    const user_id = getUser()
    const { source, setSource, destination, setDestination } = useContext(LocationContext)

    const [pickupValue, setPickupValue] = useState(null)
    const [dropOffValue, setDropOffValue] = useState(null)
    const [date, setDate] = useState<Date | null>()
    const [time, setTime] = useState("")
    const passengersRef = useRef(null);
    const router = useRouter();

    const handleSubmit = async () => {
        const combinedDateTime = date;
        const [hours, minutes] = time?.split(':');
        combinedDateTime.setHours(parseInt(hours, 10));
        combinedDateTime.setMinutes(parseInt(minutes, 10));

        const rideData = {
            driver_id: user_id.id,
            origin: pickupValue?.label,
            destination: dropOffValue?.label,
            departure_time: combinedDateTime,
            available_seats: Number(passengersRef.current.value),
        };
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
        setSource([]);
        destination([]);
        setPickupValue(null);
        setDropOffValue(null);
        setDate(null);
        setTime("")
        passengersRef.current.value = '';
    }

    const getLatAndLng = (place, type) => {
        if (place == null) {
            console.log("Null")
            if ((type === 'sourcePs')) {
                setSource([]);
            } else {
                setDestination([]);
            }
        }
        else {
            const placeId = place?.value.place_id;
            const service = new google.maps.places.PlacesService(
                document.createElement('div'),
            );
            service.getDetails({ placeId }, (place, status) => {
                if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    place?.geometry &&
                    place?.geometry.location
                ) {
                    if ((type === 'source')) {
                        setSource({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            name: place.formatted_address,
                            label: place.name,
                        });
                    } else {
                        setDestination({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            name: place.formatted_address,
                            label: place.name,
                        });
                    }
                }
            });
        }
    };
    const handlePickUpSelect = (place) => {
        const type = 'source'
        getLatAndLng(place, type);
        setPickupValue(place)
    };
    const handleDropOffSelect = (place) => {
        const type = 'destination'
        getLatAndLng(place, type);
        setDropOffValue(place)

    };

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            libraries={['places']}
        >
            <div className="container flex flex-col md:flex-row gap-3 md:gap-12 h-full p-2">
                <aside className="flex flex-col px-6 space-y-2">
                    <Card className='max-w-[420px] shadow-sm'>
                        <CardHeader>
                            <CardTitle>
                                Book your Ride
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-2" action={handleSubmit}>
                                <div className="flex items-center">
                                    <Navigation size={20} />
                                    <GoogleMapInput value={pickupValue} handleSelect={handlePickUpSelect} placeholderName={"Pickup Location"} />

                                </div>
                                <div className="flex items-center">
                                    <MapPin size={20} />
                                    <GoogleMapInput value={dropOffValue} handleSelect={handleDropOffSelect} placeholderName={"DropOff Location"} />
                                </div>
                                <div className='flex items-center'>
                                    <UserRound size={20} />
                                    <Input required type='number' name='passengers' ref={passengersRef} className='w-full text-sm ml-4' placeholder='Number of passengers' />
                                </div>
                                <div className='flex items-center'>
                                    <CalendarIcon size={20} />
                                    <DatePickerWithPresets date={date} setDate={setDate} placeholderName={"Departure Time"} />
                                </div>
                                <div className='flex items-center'>
                                    <CalendarIcon size={20} />
                                    <Input type='time' required value={time} onChange={(e) => setTime(e.target.value)} className='w-full text-sm ml-4' />
                                </div>
                                <SubmitButton buttonName="Publish" />
                            </form>
                        </CardContent>
                    </Card>
                </aside>
                <main className='w-full shadow-lg'>
                    <GoogleMapSection source={source} destination={destination} />
                </main>
            </div>
        </LoadScript>
    );
}
