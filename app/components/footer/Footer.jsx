"use client";

import Link from "next/link";
import WorldIcon from "../animation/icons/WorldIcon";
import LinkedinIcon from "../animation/icons/LinkedinIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full h-full relative bg-[#630863]"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="relative h-[500px] left-0 right-0 bottom-0 z-[5]">
        <div className="container mx-auto px-6 py-12 h-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <h2 className="sr-only">Brand</h2>
              <Link
                href="/"
                className="text-2xl font-bold text-black hover:text-primary-400 transition-colors"
              >
                YourName
              </Link>
              <p className="mt-4 max-w-md text-black">
                Full-stack developer & designer creating digital experiences
                that matter.
              </p>
            </div>

            <div className=" flex flex-col">
              <WorldIcon />
              <LinkedinIcon />
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#000000] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="flex items-center text-[#000000]">
              © {currentYear} YourName. All rights reserved.
              <span className="mx-1">Made with</span>
              <span className="sr-only">love</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
