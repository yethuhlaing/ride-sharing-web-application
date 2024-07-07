import { DashboardNavbar } from '@/components/specific/DashboardNavbar';
import React from 'react'

function Dashboardlayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <DashboardNavbar />
            {children}
        </div>

    )
}

export default Dashboardlayout