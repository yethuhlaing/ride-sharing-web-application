'use client';

import { Navigation } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import GooglePlacesAutocomplete, {
    geocodeByPlaceId,
} from 'react-google-places-autocomplete';

import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

export default function PublishRideForm() {
    const [pickUpValue, setpickUpValue] = useState('');
    const [dropOffValue, setdropOffValue] = useState('');

    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);
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
        getLatAndLng(place, type);
        setpickUpValue(place);
    };
    const handleDropOffSelect = (place) => {
        getLatAndLng(place, type);
        setdropOffValue(place);
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Get a Ride</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-8">
                    <div className="flex items-center space-x-2">
                        <Navigation />
                        <GooglePlacesAutocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                            selectProps={{
                                value: pickUpValue,
                                onChange: (place) => handlePickUpSelect(place),
                                placeholder: 'Pickup Location',
                                isClearable: true,
                                className: 'w-full ml-4 text-sm',
                            }}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <MapPin />
                        <GooglePlacesAutocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
                            selectProps={{
                                value: dropOffValue,
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
    );
}
