'use client';

import React, { useContext, useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import { Navigation } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import GoogleMapSection from "@/components/specific/GoogleMapSection"
import toast, { Toaster } from 'react-hot-toast';
import { LocationContext } from '@/context/LocationContextProvider';


export default function DriverPage() {
    const { source, setSource, destination, setDestination } = useContext(LocationContext)

    const [pickupValue, setPickupValue] = useState(null)
    const [dropOffValue, setDropOffValue]= useState(null)



    const onSubmit = (e) => {
        e.preventDefault();
        pickupValue
        dropOffValue
    };

    const getLatAndLng = (place, type) => {
        const placeId = place.value.place_id;
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
            <div className="container flex flex-col gap-6 md:gap-12 flex-wrap h-[90vh]">
                <aside className="flex flex-col md:flex-row gap-6 justify-center bg-white p-4">
                    <Card className='max-w-[400px]'>
                        <CardHeader>
                            <CardTitle>
                                Publish your Ride
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-8" action={onSubmit}>
                                <div className="flex items-center space-x-2">
                                    <Navigation />
                                    <GooglePlacesAutocomplete
                                        onPlaceSelected={(place) => {
                                            console.log(place);
                                        }}
                                        selectProps={{
                                            value: pickupValue,
                                            onChange: (place) => handlePickUpSelect(place),
                                            placeholder: 'Pickup Location',
                                            isClearable: false,
                                            className: 'w-full ml-4 text-sm',
                                            components: {
                                                DropdownIndicator: false
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 mx-auto">
                                    <MapPin />
                                    <GooglePlacesAutocomplete
                                        onPlaceSelected={(place) => {
                                            console.log(place);
                                        }}
                                        selectProps={{
                                            value: dropOffValue,
                                            onChange: (place) => handleDropOffSelect(place),
                                            placeholder: 'DropOff Location',
                                            isClearable: false,
                                            className: 'w-full ml-4 text-sm',
                                            components: {
                                                DropdownIndicator: false
                                            }
                                        }}
                                    />
                                </div>
                                <Button type="submit" size="sm" className="w-full">
                                    Search
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                    <Toaster position="top-center"/>
                </aside>
                <main className='flex-1 p-4 mt-2'>
                    <GoogleMapSection />
                </main>
            </div>
        </LoadScript>
    );
}
