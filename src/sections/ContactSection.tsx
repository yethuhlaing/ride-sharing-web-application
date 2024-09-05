"use client"

import React from "react";
import { sendEmail } from "@/actions/sendEmail";
import { SubmitButton } from "@/components/specific/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { EMAILADDRESS, MAILINGADDRESS } from "@/libs/data";

export default function ContactSection() {


  const handleSubmit = async (formData: FormData) => {
    const { error } = await sendEmail(formData);
    toast.success("Successfully sent messages!")
    if (error) {
      console.log(error)
      toast.error(error)
    }
  }
  return (
    <section id="contact" className="container pb-16 w-[min(100%,42rem)]">
      <div className="text-3xl lg:text-4xl font-bold mb-14 text-center">
        Contact{' '}
        <span className="text-primary bg-clip-text">
          Us
        </span>
      </div>

      <div className="text-gray-700 -mt-6 dark:text-white/80 text-center">
        Contact us directly at{" "}
        <a className="underline" href={`mailto:${MAILINGADDRESS}}`}>
          {EMAILADDRESS}
        </a>{" "}
        or through this form.
      </div>
      <form
        className="mt-10 flex flex-col dark:text-black"
        action={handleSubmit}
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

    </section>
  );
}
