import { DashboardNavbar } from '@/components/specific/DashboardNavbar';
import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import ProtectedRoute from '@/components/specific/ProtectedRoute';

export default async function Dashboardlayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div>
            <ProtectedRoute>
                <DashboardNavbar />
                {children}
            </ProtectedRoute>
        </div>

    )
}

