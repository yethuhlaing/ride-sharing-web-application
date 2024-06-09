import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from './ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UserNav } from './UserNav';
import RoleSelect from './RoleSelect';

export async function Navbar() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="bg-background h-[10vh] flex items-center sticky z-50 top-0 inset-x-0">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <h1 className="font-bold text-3xl">
                        We<span className="text-primary">Go</span>
                    </h1>
                </Link>
                <div className="flex items-center gap-x-3">
                    <ThemeToggle />
                    {(await isAuthenticated()) ? (
                        <div className="flex items-center gap-x-4">
                            <RoleSelect />
                            <UserNav
                                email={user?.email as string}
                                image={user?.picture as string}
                                name={user?.given_name as string}
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-3">
                            <LoginLink>
                                <Button>Sign in</Button>
                            </LoginLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
