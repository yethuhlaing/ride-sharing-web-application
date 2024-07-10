import { ReactNode, Suspense } from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect, useParams } from 'next/navigation';
import prisma from '@/libs/db';
import { stripe } from "@/libs/stripe";
import { unstable_noStore as noStore } from 'next/cache';
import { DashboardNavbar } from '@/components/specific/DashboardNavbar';
import { DashboardSidebar } from '@/components/specific/DashboardSidebar';
import Loading from "./loading";
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
                profileImage: profileImage,
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
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();
    
    await getData({
        email: user?.email as string,
        firstName: user?.given_name as string,
        id: user?.id as string,
        lastName: user?.family_name as string,
        profileImage: user?.picture as string,
    });
    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col space-y-6 mt-5">
                <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                    <aside className="hidden w-[200px] flex-col md:flex md:sticky top-0">
                        <DashboardSidebar />
                    </aside>
                    <main className="overflow-y-auto no-scrollbar h-[85vh]">
                        {children}
                    </main>
                </div>
            </div>
        </Suspense>

    )
}

