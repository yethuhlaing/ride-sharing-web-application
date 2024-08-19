import { redirect } from "next/navigation";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
    typescript: true,
});

export const createCheckoutSession = async ({
    priceId,
    domainUrl,
    customerId,
}: {
    priceId: string;
    domainUrl: string;
    customerId: string;
}) => {
    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        invoice_creation: {
            enabled: true,
        },
        consent_collection: {
            terms_of_service: 'required',
        },
        custom_text: {
            terms_of_service_acceptance: {
                message: `I agree to the [Terms of Service](${domainUrl}/terms)`,
            },
        },
        billing_address_collection: "auto",
        line_items: [{ price: priceId, quantity: 1 }],
        payment_method_types: ["card"],
        customer_update: {
            address: "auto",
            name: "auto",
        },
        automatic_tax: {
            enabled: true,
        },
        success_url: `${domainUrl}/dashboard/payment/success`,
        cancel_url: `${domainUrl}/dashboard/payment/cancelled`,
    });
    return session.url as string;
}

export const createBillingPortal = async ({
    customerId
} : {
    customerId: string
}) => {
    "use server";
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url:
            process.env.NODE_ENV === "production"
                ? (`${process.env.PRODUCTION_URL}/dashboard/home`)
                : "http://localhost:3000/dashboard/home",
    });

    return redirect(session.url);
}