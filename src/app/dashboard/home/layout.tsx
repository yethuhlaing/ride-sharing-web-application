import { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/specific/DashboardSidebar';
import { RidesProvider } from '@/context/RideContext';

export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col space-y-6 mt-5">
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex md:sticky top-0">
                    <DashboardSidebar />
                </aside>
                <main className="overflow-y-auto no-scrollbar h-[85vh]">
                    <RidesProvider>
                        {children}
                    </RidesProvider>
                </main>
            </div>
        </div>

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
