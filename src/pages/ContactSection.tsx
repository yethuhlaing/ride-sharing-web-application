import React from "react";

export default function ContactSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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

      { children }

    </section>
  );
}
