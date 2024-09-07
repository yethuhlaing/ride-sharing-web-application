import Link from 'next/link';
import { ThemeToggle } from '@/components/specific/ThemeToggle';
import { Button } from '../ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UserNav } from './UserNav';
import { getUserData } from '@/actions/action';
import Image from 'next/image';
import logo from '$/public/assets/logo.png'

export async function DashboardNavbar() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userData = await getUserData(user?.id as string)

    return (
        <nav className="bg-background h-[10vh] flex items-center sticky z-50 top-0 inset-x-0">
            <div className="container flex items-center justify-between gap-x-4">
                <Link href="/">
                    <Image src={logo} width={100} height={100} alt='WeGo profile Image' className='w-full h-5' />
                </Link>
                <div className="flex items-center gap-x-2 md:gap-x-3">
                    <div className='hidden md:flex'>
                        <ThemeToggle />
                    </div>
                    <div className="flex items-center gap-x-1 md:gap-x-2">
                        <Button className='text-xs md:text-sm w-auto h-auto'>
                            <Link href={`/dashboard/publish`}>
                                Publish
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
