"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "./LoadingComponent";
import { getUserData } from "@/actions/action";

export default function ProtectedRoute({ children }){
    const { isAuthenticated, getUser, isLoading } = useKindeBrowserClient();
    const router = useRouter();

    const { data: user, isFetching } = useQuery({
        queryKey: [ 'authUser'],
        queryFn: getUserData,
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        cacheTime: 1000 * 60 * 10, // Keep cache for 10 minutes
        refetchOnWindowFocus: false, // Don't refetch automatically on window focus
    });
    useEffect(() => {
        if (!isFetching && !isAuthenticated && !user) {
            router.push('/api/auth/login?post_login_redirect_url=/dashboard/home');
        }
    }, [isFetching, isAuthenticated, router, user]);

    if (isLoading || isFetching || !isAuthenticated) {
        return <LoadingComponent />;
    }

    return children;
}