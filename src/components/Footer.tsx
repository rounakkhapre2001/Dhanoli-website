"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);
  if (!isClient || pathname?.startsWith("/gptakalghat/admin")) return null;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full text-white font-sans bg-gradient-to-t from-[#004d40] to-[#00695c] pt-16"
    >
      {/* Wave Top */}
      <div className="absolute -top-10 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-10"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C600,120 600,0 1200,100 L1200,0 L0,0 Z"
            className="fill-white/10"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 relative z-10">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold">Grampanchayat Dhanoli</h2>
          <p className="text-white/80 font-medium">
            Panchayat Samiti Hingna, District Nagpur
          </p>
          <div className="flex gap-3 flex-wrap">
            <Image
              src="/logo1_footer-removebg.png"
              alt="Seal"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <Image
              src="/mohatsav-removebg-preview.png"
              alt="Azadi"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <Image
              src="/footer3-removebg-preview.png"
              alt="Swachh Bharat"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <Image
              src="/footer4-removebg-preview.png"
              alt="Digital India"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
          </div>
        </motion.div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col gap-4 text-center md:text-left"
        >
          <h3 className="text-xl font-bold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4">
            {[FaFacebookF, FaYoutube, FaInstagram].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.15 }}
                className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition text-white"
                href="#"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
          <ul className="space-y-2 mt-4 text-white/80">
            <li>Home</li>
            <li>Services & Schemes</li>
            <li>News & Events</li>
            <li>Contact</li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col gap-4"
        >
          <h3 className="text-xl font-bold mb-2">Contact</h3>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>Dhanoli Village, Hingna Taluka, Nagpur – 441114</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <a
              href="mailto:grampanchayatdhanoli@gmail.com"
              className="underline hover:text-white transition"
            >
              grampanchayatdhanoli@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone />
            <a
              href="tel:+911234567890"
              className="underline hover:text-white transition"
            >
              +91 1234567890
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="w-full py-6 text-center text-white/70 text-sm md:text-base select-none mt-10 border-t border-white/20 backdrop-blur-sm bg-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        © 2025 gpdhanoli.com | All Rights Reserved | Designed & Developed by{" "}
        <span className="font-semibold">IITIAN INFOTECH</span>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;