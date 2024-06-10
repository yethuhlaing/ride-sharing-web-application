'use client';

import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '@/context/SourceContext';
import { DestinationContext } from '@/context/DestinationContext';

export default function GoogleMapSection() {
    const { source, setSource } = useContext(SourceContext);
    const { destination, setDestination } = useContext(DestinationContext);

    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523,
    });
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    });
    useEffect(() => {
        if (source?.length != [] && map) {
            setCenter({
                lat: source.lat,
                lng: source.lng,
            });
        }
    }, [source]);

    useEffect(() => {
        if (destination?.length != [] && map) {
            setCenter({
                lat: source.lat,
                lng: source.lng,
            });
        }
    }, [destination]);
    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return (
        <GoogleMap
            center={center}
            zoom={10}
            onUnmount={onUnmount}
            options={{ mapId: process.env.GOOGLE_MAP_ID }}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    );
}
