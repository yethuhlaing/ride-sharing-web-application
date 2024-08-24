"use client"

import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { StripeSubscriptionCreationButton } from "@/components/specific/SubmitButton";
import { PopularPlanType, pricingList, PricingProps } from "@/libs/data";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { cn } from "@/libs/utils";

export default function PricingPage() {

    return (
        <section id='pricing' className='container'>
            <h2 className='text-3xl md:text-4xl font-bold text-center'>
                Get
                <span className='bg-gradient-to-b from-[#667EEA] to-[#764BA2] uppercase text-transparent bg-clip-text'>
                    {" "}
                    Unlimited{" "}
                </span>
                Access
            </h2>
            <h3 className='text-xl text-center text-muted-foreground pt-4 pb-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias reiciendis.
            </h3>
            <div className="flex">
                <div className='flex flex-wrap justify-center space-x-0 lg:space-x-2 space-y-2 lg:space-y-0'>
                    {pricingList.map((pricing: PricingProps) => (
                        <Card 
                            key={pricing.title}
                            className={cn('lg:flex-1',
                                pricing.popular === PopularPlanType.YES
                                    ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                                    : ""
                            )}
                        >
                            <CardHeader>
                                <CardTitle className='flex item-center justify-between'>
                                    {pricing.title}
                                    {pricing.popular === PopularPlanType.YES ? (
                                        <Badge variant='secondary' className='text-sm text-primary'>
                                            Most popular
                                        </Badge>
                                    ) : null}
                                </CardTitle>
                                <div>
                                    <span className='text-3xl font-bold'>${pricing.price}</span>
                                    <span className='text-muted-foreground'> {pricing.billing}</span>
                                </div>

                                <CardDescription>{pricing.description}</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <PaymentLink href={pricing.href} paymentLink={pricing.paymentLink!} text={pricing.buttonText} />
                            </CardContent>

                            <hr className='w-4/5 m-auto mb-4' />

                            <CardFooter className='flex'>
                                <div className='space-y-4'>
                                    {pricing.benefitList.map((benefit: string) => (
                                        <span key={benefit} className='flex'>
                                            <Check className='text-purple-500' /> <h3 className='ml-2'>{benefit}</h3>
                                        </span>
                                    ))}
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
type PaymentLinkProps = {
    href: string;
    paymentLink: string;
    text: string;
};
const PaymentLink = ({ href, paymentLink, text }: PaymentLinkProps) => {
    const router = useRouter()
    return (
        <Button
            onClick={() => {
                if (paymentLink) {
                    localStorage.setItem("stripePaymentLink", paymentLink);
                }
                console.log("ITems Set")
                router.push(href)
            }}
        >
            {text}
        </Button>
    );
};
 


