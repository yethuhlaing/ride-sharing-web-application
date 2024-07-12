import React from 'react'
import { sendEmail } from "@/actions/sendEmail";
import { SubmitButton } from "@/components/specific/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/components/ui/use-toast';

function ContactForm() {
    const { toast } = useToast()

    return(
        <form
            className="mt-10 flex flex-col dark:text-black"
            action={
                async (formData) => {
                "use server"
                
                const { data, error } = await sendEmail(formData);

                if (error) {
                    toast({
                        title: "Error",
                        description: "Error in sending Email",
                    })
                    return;
                }

            }}
        >
            <Input
                className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder="Your email"
            />
            <Textarea
                className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
                name="message"
                placeholder="Your message"
                required
                maxLength={5000}
            />
            <SubmitButton buttonName="Submit" />
        </form>
    )
}

export default ContactForm