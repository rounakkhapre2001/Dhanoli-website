"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {


  return (
    <section className="relative w-full overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/vid1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* ----------------- Desktop View ----------------- */}
      <div className="hidden md:flex md:flex-col md:items-center md:justify-center w-full min-h-screen">
        {/* Rotating Circle Logo */}
        <motion.div
          className="absolute top-50 right-80 w-40 h-40"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <path
                id="circlePath"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <circle cx="100" cy="100" r="100" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1" fill="none" />
            <text fill="white" fontSize="20" letterSpacing="3">
              <textPath href="#circlePath">Gram Panchayat Dhanoli • Village • •</textPath>
            </text>
          </svg>
        </motion.div>

        {/* Content */}
        <div className="relative text-center px-6 mt-20">
          <h1 className="text-7xl font-bold text-white leading-tight">
            Our Village, Our Pride.
            <br />
            Building Strong Communities
          </h1>
          <p className="mt-6 text-gray-200 max-w-2xl mx-auto text-lg">
            Towards Sustainable Growth
          </p>
          <Link
            href="/contact"
            className="mt-8 px-8 py-4 bg-green-900 text-white font-bold text-lg rounded-full shadow-lg hover:bg-green-800 transition block w-fit mx-auto"
          >
            Contact Us →
          </Link>
        </div>
      </div>

      {/* ----------------- Mobile View ----------------- */}
      <div className="block md:hidden w-full flex-col items-center justify-start pt-12">
        {/* Rotating Circle Logo */}
        <motion.div
          className="relative top-20 left-38 w-20 h-24 mx-auto"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <path
                id="circlePathMobile"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <circle cx="100" cy="100" r="100" stroke="white" strokeWidth="1" fill="none" />
            <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1" fill="none" />
            <text fill="white" fontSize="16" letterSpacing="2">
              <textPath href="#circlePathMobile">Gram Panchayat Dhanoli • Village • Dhanoli • Village • Dhanoli •</textPath>
            </text>
          </svg>
        </motion.div>

        {/* Content */}
        <div className="relative text-center px-6 mt-6">
          <h1 className="text-3xl font-bold text-white leading-tight">
            Our Village, Our Pride.
            <br />
            Building Strong Communities
          </h1>
          <p className="mt-3 text-gray-200 max-w-2xl mx-auto text-sm">
            Towards Sustainable Growth
          </p>
          <Link
            href="/contact"
            className="mt-4 mb-50 px-6 py-3 bg-green-900 text-white font-bold text-base rounded-full shadow-md hover:bg-green-800 transition block w-fit mx-auto"
          >
            Contact Us →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;