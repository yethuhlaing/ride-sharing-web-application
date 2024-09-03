"use client"

import { RideType } from '@/libs/type';
import React, { createContext, useContext, useState, ReactNode } from 'react';


type RidesContextType = {
    rides: RideType[];
    setRides: React.Dispatch<React.SetStateAction<RideType[]>>;
    ridesCount: number;
    setRidesCount: React.Dispatch<React.SetStateAction<number>>;
};

// Create the context
const RidesContext = createContext<RidesContextType | undefined>(undefined);

// Create a provider component
export const RidesProvider = ({ children }: { children: ReactNode }) => {
    const [rides, setRides] = useState<RideType[]>([]);
    const [ridesCount, setRidesCount] = useState(0);

    return (
        <RidesContext.Provider value={{ rides, setRides, ridesCount, setRidesCount }}>
            {children}
        </RidesContext.Provider>
    );
};

// Create a custom hook to use the RidesContext
export const useRides = () => {
    const context = useContext(RidesContext);
    if (context === undefined) {
        throw new Error('useRides must be used within a RidesProvider');
    }
    return context;
};
