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

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object

                const subscription = await stripe.subscriptions.retrieve(
                    session.subscription as string
                );

                const customerId = String(session.customer);
                const customerDetails = session.customer_details;
                console.log(session)
                console.log(subscription)
                console.log(customerId)
                if (customerDetails?.email) {
                    const user = await prisma.user.findUnique({ where: { email: customerDetails.email } });

                    if (!user) throw new Error("User not found...");
                    if (!user.customerId) {
                        await prisma.user.update({
                            where: { user_id: user.user_id },
                            data: { customerId: customerId },
                        });
                    }
                    const lineItems = subscription?.items?.data || [];
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
                }
                break;
            }
            case 'customer.subscription.updated': {
                const session = event.data.object as Stripe.Subscription
                const subscription = await stripe.subscriptions.retrieve(session.id);

                // Update the subscription details in your database
                await prisma.subscription.update({
                    where: { stripeSubscriptionId: subscription.id },
                    data: {
                        stripeSubscriptionId: subscription.id,
                        currentPeriodStart: subscription.current_period_start,
                        currentPeriodEnd: subscription.current_period_end,
                        status: subscription.status,
                        planId: subscription.items.data[0].plan.id,
                        interval: String(subscription.items.data[0].plan.interval),
                    },
                });
                break;
            }
            case 'customer.subscription.deleted': {
                const session = event.data.object as Stripe.Subscription
                const subscription = await stripe.subscriptions.retrieve(session.id);

                // Update the subscription status in your database
                await prisma.subscription.update({
                    where: { stripeSubscriptionId: subscription.id },
                    data: {
                        status: 'canceled',
                        updatedAt: new Date(),
                    },
                });
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