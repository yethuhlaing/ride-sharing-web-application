'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuGroup,
} from '../ui/dropdown-menu';
import { Avatar } from '../ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import Link from 'next/link';
import {
    DoorClosed,
    Moon,
    SunMoon,
} from 'lucide-react';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useTheme } from 'next-themes';
import { navItems } from '@/libs/data';
import Image from 'next/image';



export function UserNav({
    name,
    email,
    image,
}: {
    name: string;
    email: string;
    image: string;
}) {
    const { setTheme } = useTheme();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-10 w-10 rounded-full"
                    >
                        <Avatar className="h-10 w-10 rounded-full">
                            <AvatarImage src={image} alt="Profile Image" />
                            <AvatarFallback>
                                <span><Image src={image} width={10} height={10} alt="Profile Image" /></span>
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {navItems.map((item, index) => (
                            <DropdownMenuItem asChild key={index}>
                                <Link
                                    href={item.href}
                                    className="w-full flex justify-between item-center"
                                >
                                    {item.name}
                                    <span>
                                        <item.icon className="w-4 h-4"></item.icon>
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="w-full flex justify-between item-center"
                        asChild
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-sm border-0 font-normal"
                            onClick={() => setTheme('dark')}
                        >
                            Dark Mode{''}
                            <span>
                                <Moon className="w-4 h-4" />
                            </span>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="w-full flex justify-between item-center mt-1"
                        asChild
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-sm font-normal border-0"
                            onClick={() => setTheme('light')}
                        >
                            Light Mode{''}
                            <span>
                                <SunMoon className="w-4 h-4" />
                            </span>
                        </Button>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="w-full flex justify-between item-center"
                        asChild
                    >
                        <LogoutLink>
                            Logout{''}
                            <span>
                                <DoorClosed className="w-4 h-4"></DoorClosed>
                            </span>
                        </LogoutLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
