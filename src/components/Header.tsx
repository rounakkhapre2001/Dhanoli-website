"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setIsClient(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "../about", label: "About" },
    { href: "../Leaders", label: "Leaders" },
    { href: "../Service_Schemes", label: "Services" },
    { href: "../gallery", label: "Gallery" },
    { href: "../contact", label: "Contact" },
  ];

  // Hide header on admin routes or until client is ready
  if (!isClient || pathname?.startsWith("/gptakalghat/admin")) return null;

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-9/10 md:w-3/4 max-w-5xl rounded-full backdrop-blur-md bg-white/50 shadow-lg p-3"
    >
      <nav className="flex items-center justify-between">
        {/* Desktop Left Dropdown */}
        <div className="flex items-center space-x-6 w-1/3 hidden md:flex">
          <ul className="flex items-center">
            <li ref={dropdownRef} className="relative">
              <button
                aria-label="Toggle all pages dropdown"
                className="text-gray-800 hover:text-green-700 transition-colors duration-300 font-semibold cursor-pointer flex items-center text-lg md:text-base px-4 py-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                All Pages
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-full left-5 mt-7 bg-white rounded-lg shadow-xl py-4 px-4 w-[30rem] z-40"
                  >
                    <div className="flex">
                      <div className="w-1/2 p-2 max-w-[40%]">
                        <Image
                          src="/head.jpg"
                          alt="Dropdown image"
                          width={180}
                          height={180}
                          className="rounded-lg object-cover w-full h-auto"
                        />
                      </div>
                      <div className="w-1/2 p-4 grid grid-cols-2 gap-y-2 gap-x-3">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block text-gray-700 hover:text-green-700 font-medium text-base"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>

        {/* Desktop Logo + Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 hidden md:flex items-center space-x-55"
        >
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image
                src="/"
                alt="Logo"
                width={70}
                height={70}
                className="object-contain"
              />
              <span className="text-xl font-bold text-green-800 whitespace-nowrap">
              Gram Panchayat Dhanoli
              </span>
            </div>
          </Link>

          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300 font-medium"
            onClick={async () => {
              const messageId = 1; // Example
              const targetLang = "hi"; // Hindi

              const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messageId, targetLang }),
              });

              const data = await res.json();
              if (data.translatedText) {
                alert(`Translated: ${data.translatedText}`);
              }
            }}
          >
            Translate
          </button>
        </motion.div>

        {/* Mobile Logo + Button */}
        <div className="flex md:hidden items-center justify-between w-full">
          <div className="flex items-center space-x-1">
            <Link href="/">
              <Image
                src="/"
                alt="Logo"
                width={40} // smaller logo
                height={40}
                className="object-contain"
              />
            </Link>
            <span className="text-sm font-semibold text-green-800">
              Gram Panchayat Dhanoli
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button className="bg-blue-600 text-white py-1 px-2 rounded-full text-xs hover:bg-blue-700 transition-colors duration-300 font-medium">
              Translate
            </button>
            <button
              aria-label="Toggle mobile menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-800 focus:outline-none ml-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16m-7 6h7"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full mt-4 bg-white/90 rounded-lg shadow-lg"
          >
            <ul className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
