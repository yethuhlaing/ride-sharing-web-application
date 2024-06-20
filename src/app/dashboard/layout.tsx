import { ReactNode } from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/libs/db';
import { stripe } from "@/libs/stripe";
import { unstable_noStore as noStore } from 'next/cache';
import LocationContextProvider from '@/context/LocationContextProvider';
import { DashboardNavbar } from '@/components/specific/DashboardNavbar';

interface UserData {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
    profileImage: string;
}
async function getData({
    email,
    id,
    firstName,
    lastName,
    profileImage,
}: UserData) {
    noStore();

    const user = await prisma.user.findUnique({
        where: {
            user_id: id,
        },
        select: {
            user_id: true,
            stripeCustomerId: true,
        },
    });
    if (!user) {
        const fullName = `${firstName ?? ''} ${lastName ?? ''}`;
        await prisma.user.create({
            data: {
                email: email,
                user_id: id,
                fullName: fullName,
            },
            select: {
                user_id: true,
            },
        });
    }
    if (!user?.stripeCustomerId) {
        const data = await stripe.customers.create({
            email: email,
        })
        await prisma.user.update({
            where: {
                user_id: id
            },
            data: {
                stripeCustomerId: data.id
            }
        })
    }
}

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/');
    }
    
    await getData({
        email: user.email as string,
        firstName: user.given_name as string,
        id: user.id as string,
        lastName: user.family_name as string,
        profileImage: user.picture as string,
    });
    return<>
        <LocationContextProvider>
            <DashboardNavbar />
            {children}
        </LocationContextProvider>
    </>
    
}
