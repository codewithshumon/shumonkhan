"use client";

import ContactForm from "@/app/components/contact/ContactForm";
import MouseFollower from "../../components/global/MouseFollower";
import ContactDetails from "@/app/components/contact/ContactDetails";

export default function Contact() {
  return (
    <div className="w-full min-h-screen relative bg-[#1C1D20] z-[1]">
      <MouseFollower />

      {/* Content Section */}
      <section className="relative z-[5]">
        <div className="w-full h-full flex items-center justify-center p-4">
          <div className="max-w-[1440px] w-full">
            <div className="w-full px-4 sm:px-8 md:px-10 lg:px-30">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Have a project in Mind?
              </h1>
              <h2 className="text-xl md:text-2xl text-white mb-6 md:mb-10">
                Let&apos;s start a project together
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                <ContactForm />
                <ContactDetails />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
