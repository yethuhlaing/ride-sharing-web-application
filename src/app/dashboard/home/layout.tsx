import { ReactNode, Suspense } from 'react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect, useParams } from 'next/navigation';
import prisma from '@/libs/db';
import { stripe } from "@/libs/stripe";
import { unstable_noStore as noStore } from 'next/cache';
import { DashboardNavbar } from '@/components/specific/DashboardNavbar';
import { DashboardSidebar } from '@/components/specific/DashboardSidebar';
import Loading from "./loading";
import { getRandomAvatarUrl } from '@/libs/utils';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { getDataDashboard } from '@/actions/action';



export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    await getDataDashboard({
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


// export default async function DashboardLayout({
//     children,
// }: {
//     children: ReactNode;
// }) {
//     const { getUser } = useKindeBrowserClient();
//     const user = getUser();

//     await getDataDashboard({
//         email: user?.email as string,
//         firstName: user?.given_name as string,
//         id: user?.id as string,
//         lastName: user?.family_name as string,
//         profileImage: user?.picture as string,
//     });
//     return (
//         <Suspense fallback={<Loading />}>
//             <div className="flex flex-col space-y-6 mt-5">
//                 <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
//                     <aside className="hidden w-[200px] flex-col md:flex md:sticky top-0">
//                         <DashboardSidebar />
//                     </aside>
//                     <main className="overflow-y-auto no-scrollbar h-[85vh]">
//                         {children}
//                     </main>
//                 </div>
//             </div>
//         </Suspense>

//     )
// }
