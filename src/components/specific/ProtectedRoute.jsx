"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function ProtectedRoute({ children }){
    
    const { isAuthenticated, isLoading } = useKindeBrowserClient();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/api/auth/login?post_login_redirect_url=/dashboard/home');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading || !isAuthenticated) {
        return <p>Loading...</p>;
    }

    return children;
};