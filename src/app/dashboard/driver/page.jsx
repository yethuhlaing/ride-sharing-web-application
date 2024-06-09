'use client';

import PublishRideForm from '@/app/components/Dashboard/PublishRideForm';
import GoogleMapPage from '@/app/components/Dashboard/GoogleMapInput';
import GoogleMap from '@/app/components/Dashboard/GoogleMapInput';
import { DestinationContext } from '@/app/context/DestinationContext';
import { SourceContext } from '@/app/context/SourceContext';
import { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';

export default function DriverPage() {
    const [source, setSource] = useState(null);
    const [destination, setDestination] = useState(null);
    return (
        <SourceContext.Provider value={{ source, setSource }}>
            <DestinationContext.Provider
                value={{ destination, setDestination }}
            >
                <LoadScript
                    libraries={['places']}
                    googleMapsApiKey={process.env.GOOGLE_API_KEY}
                >
                    <div className="flex flex-col space-y-2 mt-8">
                        <div className="container grid flex-1 gap-12 md:grid-cols-[400px_1fr]">
                            <aside className="w-[350px] flex-col">
                                <PublishRideForm />
                            </aside>
                            <GoogleMapPage />
                        </div>
                    </div>
                </LoadScript>
            </DestinationContext.Provider>
        </SourceContext.Provider>
    );
}
