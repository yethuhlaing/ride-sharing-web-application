import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession, stripe } from "@/libs/stripe";
import { redirect } from "next/navigation";
import { StripeSubscriptionCreationButton, StripePortal, } from "@/components/specific/SubmitButton";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/libs/db";
import { CheckCircle2 } from "lucide-react";
import { AnnaulPlan, MonthlyPlan, OneTimePlan } from "@/libs/data";


async function getData(user_id) {
    
    const data = await prisma.subscription.findUnique({
        where: {
            user_id: user_id,
        },
        select: {
            status: true,
            user: {
                select: {
                    stripeCustomerId: true,
                },
            },
        },
    });

    return data;
}

export default async function BillingPage() {
    noStore()
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id)

    async function createSubscription() {
        "use server";

        const dbUser = await prisma.user.findUnique({
            where: {
                user_id: user?.id,
            },
            select: {
                stripeCustomerId: true,
            },
        });

        if (!dbUser?.stripeCustomerId) {
            throw new Error("Unable to get customer id");
        }
        const subscriptionUrl = await getStripeSession({
            customerId: dbUser.stripeCustomerId,
            domainUrl: process.env.NODE_ENV === "production" ? process.env.PRODUCTION_URL : 'http://localhost:3000',
            priceId: process.env.BASIC_PRICE_ID ,
        })
        return redirect(subscriptionUrl);
    }
    async function createCustomerPortal() {
        "use server";
        const session = await stripe.billingPortal.sessions.create({
            customer: data?.user.stripeCustomerId,
            return_url:
                process.env.NODE_ENV === "production"
                    ? (`${process.env.PRODUCTION_URL}/dashboard/home`)
                    : "http://localhost:3000/dashboard/home",
        });

        return redirect(session.url);
    }

    if (data?.status === "active") {
        return (
            <div className="container grid items-start gap-8 mt-10">
                <div className="flex items-center justify-between px-2">
                    <div className="grid gap-1">
                        <h1 className="text-3xl md:text-4xl ">Subscription</h1>
                        <p className="text-lg text-muted-foreground">
                            Settings regarding your subscription
                        </p>
                    </div>
                </div>

                <Card className="w-full lg:w-2/3">
                    <CardHeader>
                        <CardTitle>Edit Subscription</CardTitle>
                        <CardDescription>
                            Click on the button below, this will give you the opportunity to
                            change your payment details and view your statement at the same
                            time.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form action={createCustomerPortal}>
                            <StripePortal />
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return (
        <section className="container h-screen">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
                Our{' '}
                <span className="text-primary bg-clip-text">
                    Billing
                </span>
            </h2>
            {/* <p className="text-center my-10 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, ex praesentium! Necessitatibus quod magnam sint, provident non, repudiandae beatae unde soluta architecto ipsum voluptate assumenda eaque. Quibusdam repellat quidem id!
            </p> */}
            <div className="flex flex-row flex-wrap justify-center gap-5">
                <Card className="flex flex-col flex-1">
                    <CardContent className="py-8">
                        <div className="gap-4">
                            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
                                Monthly
                            </h3>
                        </div>

                        <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                            €10 <span className="ml-1 text-2xl text-muted-foreground">/month</span>
                        </div>
                    </CardContent>
                    <div className="flex-1 flex flex-col justify-between px-3 lg:px-0 pt-6 pb-2 bg-secondary rounded-lg space-y-6 sm:p-10 sm:pt-6">
                        <ul className="space-y-3">
                            {MonthlyPlan.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-sm">{item.name}</p>
                                </li>
                            ))}
                        </ul>
                        <form className="w-full" action={createSubscription}>
                            <StripeSubscriptionCreationButton />
                        </form>
                    </div>
                </Card>
                <Card className="flex flex-col flex-1">
                    <CardContent className="py-8">
                        <div className="gap-4">
                            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
                                Annually
                            </h3>
                        </div>

                        <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                            €100 <span className="ml-1 text-2xl text-muted-foreground">/year</span>
                        </div>
                    </CardContent>
                    <div className="flex-1 flex flex-col justify-between px-3 lg:px-0 pt-6 pb-2 bg-secondary rounded-lg space-y-6 sm:p-10 sm:pt-6">
                        <ul className="space-y-3">
                            {AnnaulPlan.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-sm">{item.name}</p>
                                </li>
                            ))}
                        </ul>
                        <form className="w-full" action={createSubscription}>
                            <StripeSubscriptionCreationButton />
                        </form>
                    </div>
                </Card>
                <Card className="flex flex-col flex-1">
                    <CardContent className="py-8">
                        <div className="gap-4">
                            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
                                One-Time Payment
                            </h3>
                        </div>

                        <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                            €150 
                        </div>
                    </CardContent>
                    <div className="flex-1 flex flex-col justify-between px-3 lg:px-0 pt-6 pb-2 bg-secondary rounded-lg space-y-6 sm:p-10 sm:pt-6">
                        <ul className="space-y-3">
                            {OneTimePlan.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-sm">{item.name}</p>
                                </li>
                            ))}
                        </ul>
                        <form className="w-full" action={createSubscription}>
                            <StripeSubscriptionCreationButton />
                        </form>
                    </div>
                </Card>
            </div>
        </section>
    );
}