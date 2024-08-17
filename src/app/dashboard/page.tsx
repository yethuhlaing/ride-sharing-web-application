"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/home'); // Redirect to another page
    }, [router]);
    return null; // This component won't be rendered because of the redirect
}

export default Dashboard;
