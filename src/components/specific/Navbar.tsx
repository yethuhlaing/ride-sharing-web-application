import Link from 'next/link';
import { ThemeToggle } from '@/components/specific/ThemeToggle';
import { Button } from '../ui/button';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Image from 'next/image';
import logo from "$/public/assets/logo.png"
export async function Navbar() {

    return (
        <nav className="z-50 bg-background h-[10vh] flex items-center sticky top-0 inset-x-0">
            <div className="container flex items-center justify-between gap-x-4">
                <Link href="/">
                    <img src={logo.src} alt='WeGo profile Image' className='w-full h-5' />
                </Link>
                <div className="flex items-center gap-x-3">
                    <ThemeToggle />
                    <div className="flex items-center gap-x-3">
                        <LoginLink>
                            <Button>Sign in</Button>
                        </LoginLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
