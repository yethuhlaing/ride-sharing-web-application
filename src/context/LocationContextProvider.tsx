"use client";

import React, { useState, createContext, useContext } from "react";

export const LocationContext = createContext<LocationContextType | null>(null);

type LocationContextType = {
    source: string | null;
    setSource: React.Dispatch<React.SetStateAction<string | null>>;
    destination: string | null;
    setDestination: React.Dispatch<React.SetStateAction<string | null>>;
};

type LocationContextProviderProps = {
    children: React.ReactNode;
};

export default function LocationContextProvider({
    children,
}: LocationContextProviderProps) {
    const [destination, setDestination] = useState<string | null> (null);
    const [source, setSource] = useState< string | null>(null);
    return (
        <LocationContext.Provider
            value={{
                source,
                setSource,
                destination,
                setDestination,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
}

export function useActiveSectionContext() {
    const context = useContext(LocationContext);

    if (context === null) {
        throw new Error(
            "useActiveSectionContext must be used within an ActiveSectionContextProvider"
        );
    }

    return context;
}

