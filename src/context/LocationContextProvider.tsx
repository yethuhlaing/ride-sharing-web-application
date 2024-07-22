"use client";

import { Location } from "@/libs/type";
import React, { useState, createContext, useContext } from "react";

export const LocationContext = createContext<LocationContextType | null>(null);

type LocationContextType = {
    source: Location | null;
    setSource: React.Dispatch<React.SetStateAction<Location | null>>;
    destination: Location | null;
    setDestination: React.Dispatch<React.SetStateAction<Location | null>>;
};

type LocationContextProviderProps = {
    children: React.ReactNode;
};

export function LocationProvider({
    children,
}: LocationContextProviderProps) {
    const [destination, setDestination] = useState<Location | null>(null);
    const [source, setSource] = useState<Location | null>(null);

    return (
        <LocationContext.Provider
            value={{ source, destination, setSource, setDestination }}
        >
            {children}
        </LocationContext.Provider>
    );
}
export const useLocation = () => {
    const context = useContext(LocationContext);

    if (context === null) {
        throw new Error(
            "useActiveSectionContext must be used within an ActiveSectionContextProvider"
        );
    }

    return context;
};


