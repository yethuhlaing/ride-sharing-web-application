import { DashboardNavbar } from '@/components/specific/DashboardNavbar';
import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function Dashboardlayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();

    if (!user && !(await isAuthenticated())) {
        return redirect('/');
    }
    return (
        <div>
            <DashboardNavbar />
            {children}
        </div>

    )
}

