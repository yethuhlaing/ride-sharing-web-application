import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { StripeSubscriptionCreationButton, StripePortal, } from "@/components/specific/SubmitButton";
import { PopularPlanType, pricingList, PricingProps } from "@/libs/data";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { getUserSubscriptionData } from "@/actions/action";


export default async function BillingPage() {

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const UserSubscription = await getUserSubscriptionData(user?.id as string)

    async function createSubscription() {
        "use server";

        return redirect(`${process.env.BASIC_PAYMENT_LINK!}?prefilled_email=${user?.email}`);
    }
    async function viewBillingPortal() {
        "use server"

        return redirect(process.env.BILLING_PORTAL_LINK!)
    }
    if (UserSubscription?.plan !== "free") {
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
                        <form action={viewBillingPortal}>
                            <StripePortal />
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return (
        <section id='pricing' className='container h-screen'>
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
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {pricingList.map((pricing: PricingProps) => (
                    <Card
                        key={pricing.title}
                        className={
                            pricing.popular === PopularPlanType.YES
                                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                                : ""
                        }
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
                            <form className="w-full" action={createSubscription}>
                                <StripeSubscriptionCreationButton text={pricing.buttonText} />
                            </form>
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
        </section>
    );
}
{/* <section className="container h-screen">
    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        Our{' '}
        <span className="text-primary bg-clip-text">
            Billing
        </span>
    </h2>
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
</section> */}