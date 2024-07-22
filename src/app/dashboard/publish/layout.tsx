import React from 'react'
import { LocationProvider } from '@/context/LocationContextProvider';

function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        
        <LocationProvider>
            {children}
        </LocationProvider>
    )
}

export default layout