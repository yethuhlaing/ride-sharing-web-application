import Link from 'next/link';
import { ThemeToggle } from '@/components/specific/ThemeToggle';
import { Button } from '../ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UserNav } from './UserNav';
import prisma from '@/libs/db';

export async function DashboardNavbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userData = await prisma.user.findUnique({
        where: {
            user_id: user?.id,
        },
        select: {
            fullName: true,
            email: true,
            profileImage: true,
        },
    });
    return (
        <nav className="bg-background h-[10vh] flex items-center sticky z-50 top-0 inset-x-0">
            <div className="container flex items-center justify-between gap-x-4">
                <Link href="/">
                    <h1 className="font-bold text-3xl">
                        We<span className="text-primary">Go</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-x-3">
                    <ThemeToggle />
                    <div className="flex items-center gap-x-2">
                        <Button>
                            <Link href={`/dashboard/driver/${user?.id}`}>
                                Driver
                            </Link>
                        </Button>
                        <Button>
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
