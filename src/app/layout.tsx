import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/specific/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { LocationProvider } from '@/context/LocationContextProvider';
import { DashboardNavbar } from '@/components/specific/DashboardNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Ride Sharing Web Application',
    description:
        'A platform to connect riders and drivers through substainability',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="!scroll-smooth">
            <body className={inter.className}>
                <LocationProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster />
                        {children}
                    </ThemeProvider>
                </LocationProvider>
            </body>
        </html>
    );
}
