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
      icon: <FiGithub />,
      url: "https://github.com/yourusername",
      name: "GitHub",
    },
    {
      icon: <FiLinkedin />,
      url: "https://linkedin.com/in/yourusername",
      name: "LinkedIn",
    },
    {
      icon: <FiTwitter />,
      url: "https://twitter.com/yourusername",
      name: "Twitter",
    },
    { icon: <FiMail />, url: "mailto:your.email@example.com", name: "Email" },
  ];

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="w-full h-full relative bg-[#630863] ">
      <div className="relative h-[500px] left-0 right-0 bottom-0 z-[5]">
        <div className="container mx-auto px-6 py-12 h-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-2xl font-bold text-black hover:text-primary-400 transition-colors"
                style={{ cursor: "pointer" }}
              >
                YourName
              </Link>
              <p className="mt-4 max-w-md text-black">
                Full-stack developer & designer creating digital experiences
                that matter.
              </p>
              <div className="flex mt-6 space-x-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="text-black hover:text-black text-xl transition-colors"
                    style={{ cursor: "pointer" }}
                    aria-label={link.name}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[#000000] font-semibold text-lg mb-4">
                Explore
              </h3>
              <ul className="space-y-2">
                {footerLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    style={{ cursor: "pointer" }}
                  >
                    <Link
                      href={link.path}
                      className="text-[#000000] hover:text-[#000000] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[#000000] font-semibold text-lg mb-4">
                Get in touch
              </h3>
              <ul className="space-y-2 text-[#000000]">
                <motion.li whileHover={{ x: 4 }} style={{ cursor: "pointer" }}>
                  <a href="mailto:your.email@example.com">
                    your.email@example.com
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 4 }} style={{ cursor: "pointer" }}>
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </motion.li>
                <li className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-block px-4 py-2 bg-[#000000] hover:bg-[#000000] rounded-md text-[#000000] transition-colors"
                    style={{ cursor: "pointer" }}
                  >
                    Contact Form
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#000000] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="flex items-center text-[#000000]">
              © {currentYear} YourName. All rights reserved.
              <span className="mx-1">Made with</span>
              <FiHeart className="text-[#000000]" />
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link
                href="/privacy"
                className="text-[#000000] hover:text-[#000000] transition-colors"
                style={{ cursor: "pointer" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[#000000] hover:text-[#000000] transition-colors"
                style={{ cursor: "pointer" }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
