"use client";

import ContactForm from "@/app/components/contact/ContactForm";
import ContactDetails from "@/app/components/contact/ContactDetails";
import { useRouter } from "next/navigation";
import { downArrow } from "@/app/asset/svg/Arrow";

export default function Contact() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen relative bg-[#0D0D0D] overflow-hidden">
      <section className="relative z-[5]" aria-labelledby="contact-heading">
        <div className="max-w-[1440px] h-full flex-col items-center justify-center p-4 relative z-10">
          <div className=" h-full w-full pt-40  px-4 sm:px-8 md:px-10 lg:px-32 ">
            <header className="w-[70%] flex flex-col gap-5 ">
              <h1
                id="contact-heading"
                className="text-4xl md:text-8xl font-semibold text-white mb-4 leading-[105%] "
              >
                Have a <span className=" text-amber-200">project</span> <br />
                in Mind?
              </h1>
              <div className=" flex gap-2">
                <h2 className="text-xl md:text-4xl text-white mb-6 md:mb-10 ">
                  Let&apos;s get started
                </h2>
                <div className=" mt-4 w-16 text-[#ece6e6]">{downArrow}</div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <article aria-label="Contact form section">
                <ContactForm />
              </article>
              <article aria-label="Contact information section">
                <ContactDetails />
              </article>
            </div>

            <nav aria-label="Secondary navigation">
              <div className="w-full text-white text-5xl py-20 flex justify-center">
                <button
                  onClick={() => router.push("/")}
                  className="w-20 h-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 hover:text-[#FFD230] transition-colors duration-300"
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
