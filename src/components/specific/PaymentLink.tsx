"use client";

import Link from "next/link";

type PaymentLinkProps = {
    href: string;
    paymentLink?: string;
    text: string;
};

const PaymentLink = ({ href, paymentLink, text }: PaymentLinkProps) => {
    console.log(paymentLink)
    return (
        <Link
            href={paymentLink! || '/dashboard/home/billing'}
            onClick={() => {
                if (paymentLink) {  
                    localStorage.setItem("stripePaymentLink", paymentLink);
                }
            }}
        >
            {text}
        </Link>
    )
};
export default PaymentLink;