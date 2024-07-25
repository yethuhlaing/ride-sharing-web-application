import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle
} from "@/components/ui/card";

import { CheckCircle2 } from "lucide-react";
import { MonthlyPlan, AnnaulPlan, OneTimePlan } from '@/libs/data';
function Pricing() {
    return (
        <section className="container pt-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">
                Our{' '}
                <span className="text-primary bg-clip-text">
                    Billing
                </span>
            </h2>
            {/* <p className="text-center my-10 text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, ex praesentium! Necessitatibus quod magnam sint, provident non, repudiandae beatae unde soluta architecto ipsum voluptate assumenda eaque. Quibusdam repellat quidem id!
            </p> */}
            <div className="flex flex-wrap gap-5">
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
                    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
                        <ul className="space-y-4">
                            {MonthlyPlan.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-base">{item.name}</p>
                                </li>
                            ))}
                        </ul>
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
                    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
                        <ul className="space-y-4">
                            {AnnaulPlan.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-base">{item.name}</p>
                                </li>
                            ))}
                        </ul>
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
                    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-6 sm:p-10 sm:pt-6">
                        <ul className="space-y-4">
                            {OneTimePlan.map((item, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                                    </div>
                                    <p className="ml-3 text-base">{item.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>

        </section>
    )
}

export default Pricing
