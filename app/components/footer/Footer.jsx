"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiHeart,
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FiGithub aria-hidden="true" />,
      url: "https://github.com/yourusername",
      name: "GitHub profile",
    },
    {
      icon: <FiLinkedin aria-hidden="true" />,
      url: "https://linkedin.com/in/yourusername",
      name: "LinkedIn profile",
    },
    {
      icon: <FiTwitter aria-hidden="true" />,
      url: "https://twitter.com/yourusername",
      name: "Twitter profile",
    },
    {
      icon: <FiMail aria-hidden="true" />,
      url: "mailto:your.email@example.com",
      name: "Send email",
    },
  ];

  const footerLinks = [
    { name: "Home", path: "/", aria: "Go to home page" },
    { name: "Projects", path: "/projects", aria: "View projects" },
    { name: "About", path: "/about", aria: "Learn about me" },
    { name: "Blog", path: "/blog", aria: "Read blog articles" },
    { name: "Contact", path: "/contact", aria: "Contact me" },
  ];

  return (
    <footer
      className="w-full h-full relative bg-[#630863]"
      role="contentinfo"
      aria-label="Website footer"
    >
      <div className="relative h-[500px] left-0 right-0 bottom-0 z-[5]">
        <div className="container mx-auto px-6 py-12 h-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand & Social Section */}
            <div className="md:col-span-2">
              <h2 className="sr-only">Brand information</h2>
              <Link
                href="/"
                className="text-2xl font-bold text-black hover:text-primary-400 transition-colors"
                aria-label="YourName homepage"
              >
                YourName
              </Link>
              <p className="mt-4 max-w-md text-black">
                Full-stack developer & designer creating digital experiences
                that matter.
              </p>
              <nav aria-label="Social media links">
                <ul className="flex mt-6 space-x-4">
                  {socialLinks.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        className="text-black hover:text-black text-xl transition-colors"
                        aria-label={link.name}
                      >
                        {link.icon}
                        <span className="sr-only">{link.name}</span>
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-[#000000] font-semibold text-lg mb-4">
                Explore
              </h3>
              <nav aria-label="Footer navigation">
                <ul className="space-y-2">
                  {footerLinks.map((link, index) => (
                    <li key={index}>
                      <motion.div whileHover={{ x: 4 }}>
                        <Link
                          href={link.path}
                          className="text-[#000000] hover:text-[#000000] transition-colors"
                          aria-label={link.aria}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-[#000000] font-semibold text-lg mb-4">
                Get in touch
              </h3>
              <address className="not-italic space-y-2 text-[#000000]">
                <motion.div whileHover={{ x: 4 }}>
                  <a
                    href="mailto:your.email@example.com"
                    className="hover:text-[#000000] transition-colors"
                    aria-label="Email your.email@example.com"
                  >
                    your.email@example.com
                  </a>
                </motion.div>
                <motion.div whileHover={{ x: 4 }}>
                  <a
                    href="tel:+1234567890"
                    className="hover:text-[#000000] transition-colors"
                    aria-label="Call +1 (234) 567-890"
                  >
                    +1 (234) 567-890
                  </a>
                </motion.div>
                <div className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-block px-4 py-2 bg-[#000000] hover:bg-[#000000] rounded-md text-[#000000] transition-colors"
                    aria-label="Go to contact form"
                  >
                    Contact Form
                  </Link>
                </div>
              </address>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="border-t border-[#000000] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="flex items-center text-[#000000]">
              © {currentYear} YourName. All rights reserved.
              <span className="mx-1">Made with</span>
              <FiHeart className="text-[#000000]" aria-hidden="true" />
              <span className="sr-only">love</span>
            </p>
            <nav
              aria-label="Legal links"
              className="mt-4 md:mt-0 flex space-x-6"
            >
              <Link
                href="/privacy"
                className="text-[#000000] hover:text-[#000000] transition-colors"
                aria-label="Privacy policy"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[#000000] hover:text-[#000000] transition-colors"
                aria-label="Terms of service"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
