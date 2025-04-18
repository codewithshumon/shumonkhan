"use client";

import ContactForm from "@/app/components/contact/ContactForm";
import ContactDetails from "@/app/components/contact/ContactDetails";

export default function Contact() {
  return (
    <section className="w-full min-h-screen relative bg-[#1C1D20]">
      {/* Background Layer */}
      <div className="relative z-[5]">
        {" "}
        {/* Content Layer */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="max-w-[1440px] w-full">
            <div className="w-full px-4 sm:px-8 md:px-10 lg:px-30">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 cursor-pointer">
                Have a project in Mind?
              </h1>
              <h2 className="text-xl md:text-2xl text-white mb-6 md:mb-10 cursor-pointer">
                Let&apos;s start a project together
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                <ContactForm />
                <ContactDetails />
              </div>
            </div>

            <div className="w-full text-white text-5xl py-20 flex justify-center">
              <button className="w-20 h-10 cursor-pointer">Home Page</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
