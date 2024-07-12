import Link from 'next/link';
import { ThemeToggle } from '@/components/specific/ThemeToggle';
import { Button } from '../ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UserNav } from './UserNav';
import prisma from '@/libs/db';
import { getUserData } from '@/actions/action';

export async function DashboardNavbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userData = await getUserData(user?.id as string)
    return (
        <nav className="bg-background h-[10vh] flex items-center sticky z-50 top-0 inset-x-0">
            <div className="container flex items-center justify-between gap-x-4">
                <Link href="/">
                    <h1 className="font-bold text-lg md:text-3xl">
                        We<span className="text-primary">Go</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-x-2 md:gap-x-3">
                    <div className='hidden md:flex'>
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-x-1 md:gap-x-2">
                        <Button className='text-xs md:text-sm w-auto h-auto'>
                            <Link href={`/dashboard/driver/${user?.id}`}>
                                Driver
                            </Link>
                        </Button>
                        <Button className='text-xs  md:text-sm w-auto h-auto'>
                            <Link href={`/dashboard/passenger/${user?.id}`}>
                                Passenger
                            </Link>
                        </Button>
                        <UserNav
                            email={userData?.email as string}
                            image={userData?.profileImage as string}
                            name={userData?.fullName as string}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
