'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Trash } from 'lucide-react';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';


type Prop = {
    buttonName: string
}

export function SubmitButton({ buttonName }: Prop) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="btn-primary text-xs mr-2 mt-2 w-full h-fit">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    Wait
                </Button>
            ) : (
                <div>
                        <Button className="btn-primary text-xs mr-2 mt-2 w-full h-fit" type="submit">
                        {buttonName}
                    </Button>
                </div>

            )}
        </>
    );
}

export function CancelButton({ buttonName }: Prop) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="btn-primary text-xs mr-2 mt-2 w-full h-fit" variant="destructive">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    Wait
                </Button>
            ) : (
                <div>
                    <Button className="btn-primary text-xs mr-2 mt-2 w-full h-fit" type="submit" variant="destructive">
                        {buttonName}
                    </Button>
                </div>
            )}
        </>
    );
}
type PaymentLinkProps = {
    text: string;
};
export function StripeSubscriptionCreationButton({ text }: PaymentLinkProps) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="w-full">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    Wait
                </Button>
            ) : (
                <Button type="submit" className="w-full">
                    {text}
                </Button>
            )}
        </>
    );
}

export function StripePortal() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled className="w-fit">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    Wait
                </Button>
            ) : (

                <Button className="w-fit" type="submit">
                    View payment details
                </Button>
            )}
        </>
    );
}

export function TrashDelete() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button variant={'destructive'} size="icon" disabled>
                    <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
            ) : (
                <Button variant={'destructive'} size="icon" type="submit">
                    <Trash className="h-4 w-4" />
                </Button>
            )}
        </>
    );
}
