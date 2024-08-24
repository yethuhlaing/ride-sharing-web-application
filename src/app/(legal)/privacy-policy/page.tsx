"use client"

import Link from 'next/link';
import React, { useEffect } from 'react';

const PrivacyPolicy = () => {
    useEffect(() => {
        // Create a script element
        const script = document.createElement('script');
        script.src = "https://cdn.iubenda.com/iubenda.js";
        script.async = true;

        // Append the script to the body
        document.body.appendChild(script);

        // Cleanup function to remove the script if component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []); // Empty dependency array means this effect runs once after initial render

    return (
        <Link
            href="https://www.iubenda.com/privacy-policy/66775185"
            title="Privacy Policy"
        >
            Privacy Policy
        </Link>
    );
};

export default PrivacyPolicy;
