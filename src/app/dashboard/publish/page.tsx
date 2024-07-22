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
import GoogleMapSection from "./GoogleMapSection"
import { SubmitButton } from '@/components/specific/SubmitButton';
import GoogleMapInput from "@/components/specific/GoogleMapInput"
import { Input } from '@/components/ui/input';
import { DatePickerWithPresets } from '@/components/specific/DatePicker';
import { useRouter } from 'next/navigation';
import { createRide } from '@/actions/action';
import toast from 'react-hot-toast';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
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
