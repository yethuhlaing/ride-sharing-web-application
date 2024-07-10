'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Trash } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Send } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Prop = {
    buttonName: string
}

export function SubmitButton({ buttonName }: Prop) {
    const { pending } = useFormStatus();
    return (
        <>
            {pending ? (
                <Button disabled className="w-fit">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    Wait
                </Button>
            ) : (
                <div>
                    <Button className="w-fit" type="submit">
                        {buttonName}
                    </Button>
                </div>

            )}
        </>
    );
}

export function BookRideButton({ buttonName, bookRide }: { buttonName: string, bookRide : ()=> void}) {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled className="w-fit">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please
                    Wait
                </Button>
            ) : (
                <AlertDialog>
                <AlertDialogTrigger>
                    <span className='text-xs text-neutral-50 w-auto h-auto bg-primary px-10 py-2 rounded-lg'>{buttonName}</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Button className="w-fit" onClick={bookRide}>
                            {buttonName}
                        </Button>
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>

            )}
        </>
    );
}

export function PublishRideButton() {
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
                    Publish 
                </Button>
            )}
        </>
    );
}
export function StripeSubscriptionCreationButton() {
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
                    Create Subscriptioin
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
