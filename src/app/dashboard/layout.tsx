import { ReactNode } from 'react';
// import { DashboardNav } from "../components/DashboardNav";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/libs/db';
// import { stripe } from "../lib/stripe";
import { unstable_noStore as noStore } from 'next/cache';

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
            id: id,
        },
        select: {
            id: true,
        },
    });
    if (!user) {
        const fullName = `${firstName ?? ''} ${lastName ?? ''}`;
        await prisma.user.create({
            data: {
                email: email,
                id: id,
                fullName: fullName,
            },
            select: {
                id: true,
            },
        });
    }
    // if (!user?.stripeCustomerId) {
    //     const data = await stripe.customers.create({
    //         email: email,
    //     })
    //     await prisma.user.update({
    //         where: {
    //             id: id
    //         },
    //         data: {
    //             stripeCustomerId: data.id
    //         }
    //     })
    // }
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
    return <>{children}</>;
}
