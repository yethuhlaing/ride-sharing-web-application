import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/provider/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import TanStackProvider from '@/components/provider/TanStackProvider';
import CookieConsent from '@/components/specific/CookieConsent';
import favicon from "$/public/favicon.png"
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Ride Sharing Web Application',
    description:
        'A platform to connect riders and drivers through substainability',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" className="!scroll-smooth">
            <head>
                <link rel="icon" href={favicon.src} />
            </head>
            <body className={inter.className}>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <TanStackProvider>
                        {children}
                        <CookieConsent />
                    </TanStackProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
