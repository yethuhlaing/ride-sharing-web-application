"use client"

import CookiePolicy from '@/app/(legal)/cookie-policy/page';
import PrivacyPolicy from '@/app/(legal)/privacy-policy/page';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Footer() {
    const handleSubmit = (event: any) => {
        event.preventDefault()        
        try {
            toast.success("Successfully Subscribed!");
        } catch (error) {
            toast.error("Failed to Subscribed!");
        }

    }
    return (
        <footer id="footer">
            <hr className="w-11/12 mx-auto" />

            <section className="container py-20 flex flex-row items-center justify-between flex-wrap space-y-10 lg:space-y-0">
                <div className="w-full lg:w-1/2">
                    <h3 className="text-left text-2xl md:text-3xl font-bold">
                        Join Our Daily{' '}
                        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                            Newsletter
                        </span>
                    </h3>
                    <p className="text-base md:text-lg text-left text-muted-foreground mt-4 mb-8">
                        Get in touch with us for your journey
                    </p>

                    <form
                        className="flex w-full flex-row mx-auto gap-4 md:gap-2"
                        onSubmit={handleSubmit}
                    >
                        <Input
                            placeholder="leomirandadev@gmail.com"
                            className="bg-muted/50 dark:bg-muted/80 "
                            aria-label="email"
                            type='email'
                            name='email'
                        />
                        <Button>Subscribe</Button>
                    </form>
                </div>

                <div className="lg:w-1/2 flex flex-row justify-center w-full space-x-10">
                    <div className="flex flex-col gap-2 ">
                        <h3 className="font-bold text-lg">Follow US</h3>
                        <div>
                            <a
                                rel="noreferrer noopener"
                                href="#"
                                className="opacity-60 hover:opacity-100"
                            >
                                Instagram
                            </a>
                        </div>

                        <div>
                            <a
                                rel="noreferrer noopener"
                                href="#"
                                className="opacity-60 hover:opacity-100"
                            >
                                TikTok
                            </a>
                        </div>

                        <div>
                            <a
                                rel="noreferrer noopener"
                                href="#"
                                className="opacity-60 hover:opacity-100"
                            >
                                Linkedin
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <h3 className="font-bold text-lg">Community</h3>
                        <div>
                            <a
                                rel="noreferrer noopener"
                                href="#"
                                className="opacity-60 hover:opacity-100"
                            >
                                Youtube
                            </a>
                        </div>

                        <div>
                            <a
                                rel="noreferrer noopener"
                                href="#"
                                className="opacity-60 hover:opacity-100"
                            >
                                Discord
                            </a>
                        </div>

                        <div>
                            <a
                                rel="noreferrer noopener"
                                href="#"
                                className="opacity-60 hover:opacity-100"
                            >
                                Twitch
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container pb-14 text-center flex justify-between">
                <h3>
                    &copy; 2024{' '}
                    <strong>WeGo</strong> {'           '}
                    | All rights reserved
                </h3>
                <div className='flex space-x-8'>
                    <CookiePolicy />
                    <PrivacyPolicy />
                    <Link href={'/terms-and-condition'}>
                        Terms & Conditions
                    </Link>
                </div>
            </section>
        </footer>
    );
}
