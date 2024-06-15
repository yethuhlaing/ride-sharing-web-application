"use client";

import React, { useState, createContext, useContext } from "react";

export const SourceDestinationContext = createContext<SourceDestinationContextType | null>(null);

type SourceDestinationContextType = {
    source: string | null;
    setSource: React.Dispatch<React.SetStateAction<string | null>>;
    destination: string | null;
    setDestination: React.Dispatch<React.SetStateAction<string | null>>;
};

type SourceDestinationContextProviderProps = {
    children: React.ReactNode;
};

export default function SourceDestinationContextProvider({
    children,
}: SourceDestinationContextProviderProps) {
    const [destination, setDestination] = useState<string | null> (null);
    const [source, setSource] = useState< string | null>(null);
    return (
        <SourceDestinationContext.Provider
            value={{
                source,
                setSource,
                destination,
                setDestination,
            }}
        >
            {children}
        </SourceDestinationContext.Provider>
    );
}

export function useActiveSectionContext() {
    const context = useContext(SourceDestinationContext);

    if (context === null) {
        throw new Error(
            "useActiveSectionContext must be used within an ActiveSectionContextProvider"
        );
    }

    return context;
}

