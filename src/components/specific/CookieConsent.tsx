// app/banner.js
'use client';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";

export function cookieConsentGiven() {
    if (!localStorage.getItem('cookie_consent')) {
        return 'undecided';
    }
    return localStorage.getItem('cookie_consent');
}

export default function CookieConsent() {
    const [consentGiven, setConsentGiven] = useState<string | null>('');

    useEffect(() => {
        // We want this to only run once the client loads
        // or else it causes a hydration error
        setConsentGiven(cookieConsentGiven());
    }, []);

    const handleAcceptCookies = () => {
        localStorage.setItem('cookie_consent', 'yes');
        setConsentGiven('yes');
    };

    const handleDeclineCookies = () => {
        localStorage.setItem('cookie_consent', 'no');
        setConsentGiven('no');
    };
    console.log(consentGiven)
    return (
        <div className="fixed bottom-[15px] right-[15px]">
            {consentGiven === 'undecided' && (
                <Card className="w-[450px]">
                    <CardHeader>
                        <CardTitle>Cookie Setting</CardTitle>
                        <CardDescription>We use tracking cookies to understand how you use
                            the product and help us improve it.
                            Please accept cookies to help us improve.</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={handleAcceptCookies}>Accept cookies</Button>
                        <Button onClick={handleDeclineCookies}>Decline cookies</Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}