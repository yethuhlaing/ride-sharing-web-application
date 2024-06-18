import { TeamProps } from "./type";
import {
    CreditCard,
    Home,
    Settings,
    UserRound,
} from 'lucide-react';

export const teamList: TeamProps[] = [
    {
        imageUrl: 'https://i.pravatar.cc/150?img=35',
        name: 'Emma Smith',
        position: 'Product Manager',
        socialNetworks: [
            { name: 'Linkedin', url: 'http://linkedin.com' },
            {
                name: 'Facebook',
                url: 'https://www.facebook.com/',
            },
            {
                name: 'Instagram',
                url: 'https://www.instagram.com/',
            },
        ],
    },
    {
        imageUrl: 'https://i.pravatar.cc/150?img=60',
        name: 'John Doe',
        position: 'Tech Lead',
        socialNetworks: [
            { name: 'Linkedin', url: 'http://linkedin.com' },
            {
                name: 'Facebook',
                url: 'https://www.facebook.com/',
            },
            {
                name: 'Instagram',
                url: 'https://www.instagram.com/',
            },
        ],
    },
    {
        imageUrl: 'https://i.pravatar.cc/150?img=36',
        name: 'Ashley Ross',
        position: 'Frontend Developer',
        socialNetworks: [
            { name: 'Linkedin', url: 'http://linkedin.com' },

            {
                name: 'Instagram',
                url: 'https://www.instagram.com/',
            },
        ],
    },
];

export const navItems = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Profile', href: '/dashboard/profile', icon: UserRound },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];