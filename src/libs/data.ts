import { TeamProps } from "./type";
import {
    CreditCard,
    Home,
    UserRound,
    BookMarked,
    MessageCircleMore,
    Star
} from 'lucide-react';



export enum PopularPlanType {
    NO = 0,
    YES = 1,
}

export interface PricingProps {
    title: string;
    popular: PopularPlanType;
    price: number;
    description: string;
    buttonText: string;
    benefitList: string[];
    href: string;
    billing: string;
    priceId?: string;
}

export const pricingList: PricingProps[] = [
    {
        title: "Free",
        popular: 1,
        price: 0,
        description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
        buttonText: "Get Started",
        benefitList: ["Unlimited rides within the month", "Priority customer support", "Real-time Chat Features", "Easy cancellation"],
        href: "/api/auth/login",
        billing: "/month",
    },
    {
        title: "Basic",
        popular: 1,
        price: 10,
        description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
        buttonText: "Buy Now",
        benefitList: ["Unlimited rides for the year", "Priority customer support", "Real-time Chat Features", "Two months free compared to monthly plan", "Exclusive promotions and discounts", "Free ride vouchers"],
        href: "/api/auth/login",
        priceId: process.env.BASIC_PRICE_ID,
        billing: "/month",
    },
    {
        title: "Premium",
        popular: 0,
        price: 20,
        description: "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
        buttonText: "Buy Now",
        benefitList: ["Unlimited lifetime rides", "Priority customer support", "Real-time Chat Features", "Special perks and bonuses", "Exclusive promotions and discounts", "Exclusive lifetime promotions and discounts", "Membership rewards"],
        href: "/api/auth/login",
        priceId: process.env.PREMIUM_PRICE_ID,
        billing: "/month",
    },
];


// FEATURES SECTION
export const FEATURES = [
    {
        title: 'Publish Your Ride',
        icon: '/map.svg',
        variant: 'green',
        description:
            'Offer your empty seats to fellow students and share the cost.',
    },
    {
        title: 'Find a Ride',
        icon: '/calendar.svg',
        variant: 'green',
        description:
            "Easily find and join rides published by other students.",
    },
    {
        title: 'Save Money',
        icon: '/tech.svg',
        variant: 'green',
        description:
            'Reduce travel costs by sharing rides.',
    },
    {
        title: 'Many new locations every month',
        icon: '/location.svg',
        variant: 'orange',
        description:
            'Lots of new locations every month, because we have a worldwide community of climbers who share their best experiences with climbing',
    },
];

export interface FAQProps {
    question: string;
    answer: string;
    value: string;
}

export const LIMIT_MESSAGE = 20;
export const FAQList: FAQProps[] = [
    {
        question: 'What is this platform for?',
        answer: 'Our platform connects students looking to share or find rides, helping you save money, reduce your carbon footprint, and meet new people.',
        value: 'item-1',
    },
    {
        question: 'How do I create an account?',
        answer: 'Currently, you can sign up with personal account. Later we will verify using your student email address.',
        value: 'item-2',
    },
    {
        question: 'Is there a fee to use the service?',
        answer: 'The platform is subscription-based with one-time payment, monthly or Annually. However, you may need to contribute to the cost of the ride based on the arrangement with the driver.',
        value: 'item-3',
    },
    {
        question: 'How do I publish a ride?',
        answer: 'Log in to your account, go to the "Publish" section, and enter your trip details, including destination, date, and available seats.',
        value: 'item-4',
    },
    {
        question: 'Can I change or cancel my ride after posting?',
        answer: 'Yes, you can edit or cancel your ride before someone books a seat. If the ride is already booked, please contact the passengers directly to make changes.',
        value: 'item-5',
    },
    {
        question: 'How do I find a ride?',
        answer: 'Go to the Home page to search for rides based on your location, destination, and travel dates.',
        value: 'item-6',
    },
    {
        question: 'How do I book a seat in a ride?',
        answer: 'Once you find a suitable ride, you can book a seat through the platform. You\'ll need to confirm the booking and communicate with the driver to finalize details.',
        value: 'item-8',
    },
    {
        question: 'How do you ensure the safety of riders and drivers?',
        answer: 'We verify all members through their student email addresses and provide a rating and review system to build trust. Always check profiles and reviews before confirming a ride.',
        value: 'item-9',
    },
    {
        question: 'What should I do if there’s an issue during the ride?',
        answer: 'Contact the driver or passenger directly through the platform. If the issue is serious, report it to our support team for assistance.',
        value: 'item-10',
    },
    {
        question: 'How is the platform protecting the personal data?',
        answer: 'We use industry-standard encryption and security measures to protect your personal information. Your data is stored securely and is only used for ride coordination.',
        value: 'item-11',
    },
    {
        question: 'I’m having trouble using the app. What should I do?',
        answer: 'Contact our support team through the platform or via email.',
        value: 'item-12',
    },
    {
        question: 'How can I update my account information?',
        answer: 'Log in to your account and navigate to the "Profile" section to update your personal information, including your email address and phone number.',
        value: 'item-13',
    },
];


export const teamList: TeamProps[] = [
    {
        imageUrl: 'https://i.pravatar.cc/150?img=35',
        name: 'Emma Smith',
        position: 'Product Manager',
        socialNetworks: [
            { name: 'Linkedin', url: 'http://linkedin.com' },
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
export const StarColors = {
    hover: "hsl(67, 80%, 52%)",
    current: "hsl(237, 52%, 53%) "
};
export const navItems = [
    { name: 'Home', href: '/dashboard/home', icon: Home },
    { name: 'Profile', href: '/dashboard/home/profile', icon: UserRound },
    { name: 'Billing', href: '/dashboard/home/billing', icon: CreditCard },
    { name: 'History', href: '/dashboard/home/history', icon: BookMarked },
    { name: 'Chat', href: '/dashboard/home/chat', icon: MessageCircleMore },
    { name: 'Review', href: '/dashboard/home/review', icon: Star },
];