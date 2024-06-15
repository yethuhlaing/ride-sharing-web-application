'use client';

import React, { useEffect, useState } from 'react';
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
import Autocomplete from 'react-google-places-autocomplete';

export default function DriverPage() {
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);

    // const onSubmit = () => {
    //     e.preventDefault();
    //     console.log(pickUpValue)
    //     console.log(dropOffValue)
    // };
    useEffect(() => {
        if (source) {
            console.log(source);
        }
    }, [source, destination]);

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
                if ((type = 'source')) {
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
        setpickUpValue(place);
    };
    const handleDropOffSelect = (place) => {
        const type = 'destination'
        getLatAndLng(place, type);
        setdropOffValue(place);
    };

    return (
        <LoadScript
            libraries={['places']}
            googleMapsApiKey={process.env.GOOGLE_API_KEY}
        >
            <div className="container w-screen h-screen flex flex-col md:flex-row mt-3">
                <aside className="w-[min(100%,38rem)] pr-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Publish your Ride
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-8">
                                <div className="flex items-center space-x-2 ">
                                    <Navigation />
                                    <Autocomplete 
                                        apiKey={process.env.GOOGLE_API_KEY}
                                        onPlaceSelected={(place) => {
                                            console.log(place);
                                        }}
                                        selectProps={{
                                            value: source,
                                            onChange: (place) => handlePickUpSelect(place),
                                            placeholder: 'Pickup Location',
                                            isClearable: true,
                                            className: 'w-full ml-4 text-sm',
                                        }}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 mx-auto">
                                    <MapPin />
                                    <Autocomplete 
                                        apiKey={process.env.GOOGLE_API_KEY}
                                        onPlaceSelected={(place) => {
                                            console.log(place);
                                        }}
                                        selectProps={{
                                            value: destination,
                                            onChange: (place) => handleDropOffSelect(place),
                                            placeholder: 'DropOff Location',
                                            isClearable: true,
                                            className: 'w-full ml-4 text-sm',
                                        }}
                                    />
                                </div>
                                <Button type="submit" size="sm" className="w-full">
                                    Search
                                </Button>
                            </form>                           
                        </CardContent>
                    </Card>
                </aside>
                <main className='w-full p-4'>
                    <h1>hEllo</h1>
                </main>
            </div>
        </LoadScript>
    );
}
