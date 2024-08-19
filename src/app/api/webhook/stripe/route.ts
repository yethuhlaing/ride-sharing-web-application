import prisma from "@/libs/db";
import { stripe } from "@/libs/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();

    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (error: unknown) {
        return new Response("webhook error", { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session; 
    // Handle the event
    console.log(session.id)

    try {
        switch (event.type) {
            case "checkout.session.completed":
                console.log(event.type)
                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );
                const customerId = String(session.customer);
                console.log(customerId)
                const user = await prisma.user.findUnique({
                    where: {
                        customerId: customerId,
                    },
                });
                console.log(subscription)
                if (!user) throw new Error("User not found...");
                const lineItems = subscription?.items.data || [];
                console.log(lineItems)
                for (const item of lineItems) {
                    const priceId = item.price?.id;
                    const isSubscription = item.price?.type === "recurring";

                    if (isSubscription) {
                        await prisma.subscription.upsert({
                            where: { user_id: user.user_id! },
                            // data: {
                            //     stripeSubscriptionId: subscription.id,
                            //     user_id: user.user_id,
                            //     currentPeriodStart: subscription.current_period_start,
                            //     currentPeriodEnd: subscription.current_period_end,
                            //     status: subscription.status,
                            //     planId: subscription.items.data[0].plan.id,
                            //     interval: String(subscription.items.data[0].plan.interval),
                            // },
                            create: {
                                stripeSubscriptionId: subscription.id,
                                user_id: user.user_id,
                                currentPeriodStart: subscription.current_period_start,
                                currentPeriodEnd: subscription.current_period_end,
                                status: subscription.status,
                                planId: subscription.items.data[0].plan.id,
                                interval: String(subscription.items.data[0].plan.interval),
                            },
                            update: {
                                currentPeriodStart: subscription.current_period_start,
                                currentPeriodEnd: subscription.current_period_end,
                                status: subscription.status,
                                planId: subscription.items.data[0].plan.id,
                                interval: String(subscription.items.data[0].plan.interval),
                            },
                        });
                        console.log(subscription.description)
                        await prisma.user.update({
                            where: { user_id: user.user_id },
                            data: { plan: priceId === process.env.BASIC_PRICE_ID! ? "basic" : "premium"! },
                        });
                    } else {
                        console.log("THis is for One-time Purchase")
                        // one_time_purchase
                    }
                }
                
                break;
            case "customer.subscription.deleted": {
                const subscription = await stripe.subscriptions.retrieve((event.data.object as Stripe.Subscription).id);
                const user = await prisma.user.findUnique({
                    where: { customerId: subscription.customer as string },
                });
                if (user) {
                    await prisma.user.update({
                        where: { user_id: user.user_id },
                        data: { plan: "free" },
                    });
                } else {
                    console.error("User not found for the subscription deleted event.");
                    throw new Error("User not found for the subscription deleted event.");
                }

                break;
            }

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error("Error handling event", error);
        return new Response("Webhook Error", { status: 400 });
    }



    return new Response(null, { status: 200 });
}

// if (event.type === "checkout.session.completed") {
//     const subscription = await stripe.subscriptions.retrieve(
//         session.subscription as string
//     );
//     const customerId = String(session.customer);

//     const user = await prisma.user.findUnique({
//         where: {
//             stripeCustomerId: customerId,
//         },
//     });

//     if (!user) throw new Error("User not found...");

//     await prisma.subscription.create({
//         data: {
//             stripeSubscriptionId: subscription.id,
//             user_id: user.user_id,
//             currentPeriodStart: subscription.current_period_start,
//             currentPeriodEnd: subscription.current_period_end,
//             status: subscription.status,
//             planId: subscription.items.data[0].plan.id,
//             interval: String(subscription.items.data[0].plan.interval),
//         },
//     });
// }
// if (event.type === "invoice.payment_succeeded") {
//     const subscription = await stripe.subscriptions.retrieve(
//         session.subscription as string
//     );

//     await prisma.subscription.updateMany({
//         where: {
//             stripeSubscriptionId: subscription.id,
//         },
//         data: {
//             planId: subscription.items.data[0].price.id,
//             currentPeriodStart: subscription.current_period_start,
//             currentPeriodEnd: subscription.current_period_end,
//             status: subscription.status,
//         },
//     });
// }