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
import { PublishRideButton } from '@/components/specific/SubmitButton';
import GoogleMapInput from "@/components/specific/GoogleMapInput"
import { Input } from '@/components/ui/input';
import { DatePickerWithPresets } from '@/components/specific/DatePicker';
import toast from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function DriverPage() {

    const { id } = useParams()
    const { source, setSource, destination, setDestination } = useContext(LocationContext)

    const [pickupValue, setPickupValue] = useState(null)
    const [dropOffValue, setDropOffValue] = useState(null)
    const [date, setDate] = useState()
    const [time, setTime] = useState("")
    const passengersRef = useRef(null);

    const onSubmit = async (e) => {
        e.preventDefault();

        const combinedDateTime = new Date(date);
        const [hours, minutes] = time?.split(':');
        combinedDateTime.setHours(parseInt(hours, 10));
        combinedDateTime.setMinutes(parseInt(minutes, 10));

        const rideData = {
            driver_id: id,
            origin: pickupValue?.label,
            destination: dropOffValue?.label,
            departure_time: combinedDateTime.toISOString(),
            available_seats: passengersRef.current.value,
        };
        try {
            const response = await fetch('/api/publish-ride', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rideData),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("You have successfully published.")
                resetFormData()
                const router = useRouter();
                router.push('/dashboard/home');
            } else {
                console.error('Error publishing ride:', data.error);
                // Handle error (e.g., show error message)
            }
        } catch (error) {
            console.error('Network error:', error);
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
        if (place == null){
            console.log("Null")
            if ((type === 'sourcePs')) {
                setSource([]);
            } else {
                setDestination([]);
            }
        }
        else{
            const placeId = place?.value.place_id;
            const service = new google.maps.places.PlacesService(
                document.createElement('div'),
            );
            service.getDetails({ placeId }, (place, status) => {
                if (
                    status === google.maps.places.PlacesServiceStatus.OK &&
                    place.geometry &&
                    place.geometry.location
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
                            <form className="space-y-2" onSubmit={onSubmit}>
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
                                    <DatePickerWithPresets required date={date} setDate={setDate} placeholderName={"Departure Time"} />
                                </div>
                                <div className='flex items-center'>
                                    <CalendarIcon size={20} />
                                    <Input type='time' required value={time} onChange={ (e) => setTime(e.target.value)} className='w-full text-sm ml-4' />
                                </div>
                                <PublishRideButton />
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
