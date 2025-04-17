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
    { icon: <FiGithub />, url: "https://github.com/yourusername" },
    { icon: <FiLinkedin />, url: "https://linkedin.com/in/yourusername" },
    { icon: <FiTwitter />, url: "https://twitter.com/yourusername" },
    { icon: <FiMail />, url: "mailto:your.email@example.com" },
  ];

  const footerLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="w-full h-full relative mt-[500px]">
      {/* Footer background layer */}
      <div className="fixed h-[500px] left-0 right-0 bottom-0 z-[-1] bg-[#630863] pointer-events-none" />

      {/* Footer content layer */}
      <div className="fixed h-[500px] left-0 right-0 bottom-0 pointer-events-none">
        <div className="container mx-auto px-6 py-12 h-full pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link
                href="/"
                className="text-2xl font-bold text-white hover:text-primary-400 transition-colors"
              >
                YourName
              </Link>
              <p className="mt-4 max-w-md">
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
                    className="text-gray-400 hover:text-white text-xl transition-colors"
                    aria-label={link.url.split(".")[1]}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Explore</h3>
              <ul className="space-y-2">
                {footerLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 4 }}>
                    <Link
                      href={link.path}
                      className="hover:text-primary-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">
                Get in touch
              </h3>
              <ul className="space-y-2">
                <li className="hover:text-primary-400 transition-colors">
                  <a href="mailto:your.email@example.com">
                    your.email@example.com
                  </a>
                </li>
                <li className="hover:text-primary-400 transition-colors">
                  <a href="tel:+1234567890">+1 (234) 567-890</a>
                </li>
                <li className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-block px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-md text-white transition-colors"
                  >
                    Contact Form
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="flex items-center">
              © {currentYear} YourName. All rights reserved.
              <span className="mx-1">Made with</span>
              <FiHeart className="text-red-500" />
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link
                href="/privacy"
                className="hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary-400 transition-colors"
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
