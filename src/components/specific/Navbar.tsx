import Link from 'next/link';
import { ThemeToggle } from '@/components/specific/ThemeToggle';
import { Button } from '../ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

export async function Navbar() {

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
                    <div className="flex items-center gap-x-3">
                        <LoginLink postLoginRedirectURL="/dashboard/home">
                            <Button>Sign in</Button>
                        </LoginLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
