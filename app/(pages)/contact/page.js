"use client";

import ContactForm from "@/app/components/contact/ContactForm";
import ContactDetails from "@/app/components/contact/ContactDetails";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen relative bg-[#1C1D20]">
      {/* Content Section with semantic structure */}
      <section className="relative z-[5]" aria-labelledby="contact-heading">
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="max-w-[1440px] w-full">
            {/* Heading Section */}
            <header className="w-full px-4 sm:px-8 md:px-10 lg:px-30">
              <h1
                id="contact-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Have a project in Mind?
              </h1>
              <h2 className="text-xl md:text-2xl text-white mb-6 md:mb-10">
                Let&apos;s start a project together
              </h2>
            </header>

            {/* Contact Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <article aria-label="Contact form section">
                <ContactForm />
              </article>

              <article aria-label="Contact information section">
                <ContactDetails />
              </article>
            </div>

            {/* Navigation Section */}
            <nav aria-label="Secondary navigation">
              <div className="w-full text-white text-5xl py-20 flex justify-center">
                <button
                  onClick={() => router.push("/")}
                  className="w-20 h-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  aria-label="Return to home page"
                >
                  Home Page
                </button>
              </div>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
