'use client';

import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import GoogleMapSection from "./GoogleMapSection"

import RideForm from './RideForm';

export default function PublishPage() {

    return (
        <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
            libraries={['places']}
        >
            <div className="container flex flex-col md:flex-row gap-3 md:gap-12 h-full p-2">
                <aside className="flex flex-col px-6 space-y-2">
                    <RideForm />
                </aside>
                <main className='w-full shadow-lg'>
                    <GoogleMapSection />
                </main>
            </div>
        </LoadScript>
    );
}
