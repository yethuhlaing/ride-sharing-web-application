"use client";

import React from "react";
import { sendEmail } from "@/actions/sendEmail";
import toast from "react-hot-toast";
import { SubmitButton } from "@/components/specific/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {

  return (
    <section id="contact" className="container pb-16 w-[min(100%,42rem)]">
      <div className="text-3xl lg:text-4xl font-bold mb-14 text-center">
        Contact{' '}
        <span className="text-primary bg-clip-text">
          Us
        </span>
      </div>

      <div className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{" "}
        <a className="underline" href="mailto:yethusteve217@gmail.com">
          yethusteve217@gmail.com
        </a>{" "}
        or through this form.
      </div>


      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
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
    </section>
  );
}
