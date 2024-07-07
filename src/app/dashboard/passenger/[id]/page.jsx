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
import DatePicker from "@/components/specific/DatePicker"
import { Input } from '@/components/ui/input';
export default function PassengerPage() {

    const { sourcePs, setSourcePs, destinationPs, setDestinationPs } = useContext(LocationContext)

    const [pickupValue, setPickupValue] = useState(null)
    const [dropOffValue, setDropOffValue] = useState(null)
    const [date, setDate] = useState()
    const passengersRef = useRef(null);

    // const onSubmit = () => {
    //     e.preventDefault();
    //     console.log(pickUpValue)
    //     console.log(dropOffValue)
    // };
    const resetFormData = () => {
        setSourcePs([]);
        destinationPs([]);
        setPickupValue(null);
        setDropOffValue(null);
        setDate(null);
        passengersRef.current.value = '';
    }

    const getLatAndLng = (place, type) => {
        if (place == null){
            console.log("Null")
            if ((type === 'sourcePs')) {
                setSourcePs([]);
            } else {
                setDestinationPs([]);
            }
        }
        else{
            console.log("Not Null")
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
                    if ((type === 'sourcePs')) {
                        setSourcePs({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            name: place.formatted_address,
                            label: place.name,
                        });
                    } else {
                        setDestinationPs({
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
        const type = 'sourcePs'
        getLatAndLng(place, type);
        setPickupValue(place)
    };
    const handleDropOffSelect = (place) => {
        const type = 'destinationPs'
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
                            <form className="space-y-2">
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
                                    <DatePicker date={date} setDate={setDate} placeholderName={"Departure Time"} />
                                </div>
                                <PublishRideButton />
                            </form>
                        </CardContent>
                    </Card>
                </aside>
                <main className='w-full shadow-lg'>
                    <GoogleMapSection source={sourcePs} destination={destinationPs} />
                </main>
            </div>
        </LoadScript>
    );
}
