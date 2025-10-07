"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Service = {
  name: string;
  docs: string[];
};

interface Item {
  id: number;
  type: "event" | "news";
  organizer?: string | null;
  organizedBy?: string | null;
  place?: string | null;
  title?: string | null;
  date: string;
  description: string;
}

export default function ServiceSchemesWithUpcoming() {
  const [activeTab, setActiveTab] = useState(0);
  const [openModal, setOpenModal] = useState<Service | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  const services: Service[] = [
    { name: "Birth Certificate", docs: ["Aadhaar Card Xerox", "Parent Aadhaar Xerox"] },
    { name: "Death Certificate", docs: ["Deceased Aadhaar Xerox", "Heir Aadhaar Xerox"] },
    { name: "Residence Certificate", docs: ["Aadhaar Card Xerox", "Ration Card Xerox"] },
    { name: "Marriage Certificate", docs: ["Aadhaar Card Xerox", "Parent Aadhaar Xerox"] },
  ];

  const updates = [
    "Notice: Applications invited for consultation on village development plan.",
    "Notice: New welfare scheme launched for farmers.",
  ];

  const tabs = ["State Government Schemes", "Central Government Schemes", "Joint Venture (S+C)"];
  const tabSchemes = [
    [
      { title: "LIDCOM Gattai Stall Scheme", description: "Financial help for self-employment and businesses." },
      { title: "Merit Awards", description: "Support for students with excellent academic results." },
      { title: "LIDCOM Gattai Stall Scheme", description: "Financial help for self-employment and businesses." },
      { title: "Merit Awards", description: "Support for students with excellent academic results." },
    ],
    [
      { title: "Student Internship Programme", description: "Internship opportunities for students at national level." },
      { title: "Atmanirbhar Bharat", description: "Self-reliance program to empower local businesses." },
      { title: "Student Internship Programme", description: "Internship opportunities for students at national level." },
      { title: "Atmanirbhar Bharat", description: "Self-reliance program to empower local businesses." },
    ],
    [
      { title: "Revamped Rashtriya Gram Swaraj Abhiyan", description: "Capacity building and training support for local governance." },
      { title: "Revamped Rashtriya Gram Swaraj Abhiyan", description: "Capacity building and training support for local governance." },
      { title: "Revamped Rashtriya Gram Swaraj Abhiyan", description: "Capacity building and training support for local governance." },
    ],
    
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: newsData } = await supabase.from("items").select("*").order("id", { ascending: false });
      const { data: eventsData } = await supabase.from("events").select("*").order("id", { ascending: false });

      const formattedEvents: Item[] =
        eventsData?.map((ev) => ({
          id: ev.id,
          type: "event",
          organizer: ev.organizer,
          organizedBy: ev.organized_by,
          place: ev.place,
          title: null,
          date: ev.date,
          description: ev.description,
        })) || [];

      const formattedNews: Item[] =
        newsData?.map((nw) => ({
          id: nw.id,
          type: "news",
          organizer: null,
          organizedBy: null,
          place: null,
          title: nw.title,
          date: nw.date,
          description: nw.description,
        })) || [];

      setItems([...formattedNews, ...formattedEvents]);
    } catch (err) {
      console.error(err);
    }
  };

  const newsItems = items.filter((item) => item.type === "news");
  const eventItems = items.filter((item) => item.type === "event");

  return (
    <div className="font-sans">
      {/* ================= Hero Section ================= */}
      <section className="relative w-full h-[800px]">
        <Image src="/bgimg1.jpg" alt="SERVICES & SCHEMES" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg"
          >
            SERVICES & SCHEMES
          </motion.h1>
        </div>
      </section>

      {/* ================= Services + Updates ================= */}
      {/* Notice Board Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center py-10 px-6 rounded-lg shadow-md border border-gray-300 font-sans bg-gradient-to-br from-yellow-100 via-white to-orange-100">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/service.jpg"
            alt="Notice Board Maharashtra Right to Public Services Act"
            width={440}
            height={600}
            className="rounded-xl border-2 border-gray-400 shadow-lg object-contain"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
          <h2 className="text-2xl font-extrabold text-black mb-4 flex items-center gap-2">
            <span>📝</span> Notice Board
          </h2>
          <p className="text-base md:text-lg text-black mb-5 font-medium leading-relaxed">
            Under the <span className="font-bold text-black">Maharashtra Right to Public Services Act, 2015</span>, citizens can quickly access key Gram Panchayat services. Time-bound delivery and transparent fees apply for each.
          </p>
          <ul className="mt-3 space-y-4 text-base text-black font-sans">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Birth / Death / Marriage Certificates (5 days, ₹20 fee)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Gram Panchayat Dues / Form No. 6 Extract (5 days, ₹20 fee)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Annual Account Correction Certificate (5 days, Free)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✔</span> Permanent Resident Certificate (20 days, Free)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">🌐</span>
              <a
                href="https://aaplesarkar.mahaonline.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-semibold underline hover:text-blue-700"
              >
                aaplesarkar.mahaonline.gov.in
              </a>
            </li>
          </ul>
          <p className="text-xs text-gray-600 mt-4 italic">Contact details and QR code are shown in the image above.</p>
        </div>
      </section>
      <div className="flex flex-col md:flex-row md:gap-6 gap-4 justify-center my-12 px-4">
        {/* Services */}
        <motion.div className="w-full md:w-2/5 bg-white p-6 rounded-2xl shadow-lg border-2 border-green-500">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-green-600 pb-2">
            Services
          </h2>
          <div className="flex flex-col gap-3">
            {services.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setOpenModal(item)}
                className="cursor-pointer border border-green-500 rounded-lg py-3 px-4 text-base md:text-lg font-semibold bg-white hover:bg-green-100 transition"
              >
                {item.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Updates */}
        <motion.div className="w-full md:w-2/5 bg-white p-6 rounded-2xl shadow-lg border-2 border-orange-500">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-orange-500 pb-2">
            New Updates
          </h2>
          <div className="flex flex-col gap-3">
            {updates.map((update, i) => (
              <motion.div key={i} className="flex justify-between items-center border border-orange-400 rounded-lg py-3 px-4 bg-white text-base md:text-lg font-medium">
                <span>{update}</span>
                <span className="text-gray-500 font-bold text-sm md:text-base">03/09/2025</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= Schemes Section ================= */}
      <div className="relative p-10 pt-14 pb-14 bg-gradient-to-br from-orange-100 via-white to-green-100 overflow-hidden">
        <motion.h2 className="text-black text-center text-2xl md:text-3xl font-extrabold mb-10 drop-shadow-md">
          Schemes
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 rounded-full font-semibold text-sm md:text-base border transition duration-300 transform ${
                activeTab === idx
                  ? "bg-green-600 text-white shadow-md scale-105 border-green-700"
                  : "border-gray-300 bg-white text-gray-700 hover:shadow-sm hover:scale-105"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {tabSchemes[activeTab].map((scheme, i) => (
            <motion.div key={i} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-3">{scheme.title}</h3>
              <p className="text-base md:text-lg">{scheme.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= Latest News and Upcoming Events ================= */}
      <motion.div className="max-w-7xl mx-auto p-6 space-y-6 my-16" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-3xl font-bold text-center mb-6">
          Latest News and Upcoming Events
        </h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* News Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold text-orange-700 mb-4 border-b-4 border-orange-500 pb-2">📰 News</h3>
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.09 }}
                className="flex border-l-4 border-orange-500 bg-orange-100 rounded shadow overflow-hidden"
              >
                <div className="p-4 bg-orange-500 text-white flex flex-col items-center justify-center min-w-[80px]">
                  <span className="text-sm">📅</span>
                  <span className="font-bold text-lg">
                    {new Date(item.date).toLocaleDateString(undefined, { day: "2-digit", month: "short" })}
                  </span>
                  <span className="text-xs">
                    {new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="p-4 flex-1">
                  <h4 className="font-bold text-orange-700 text-lg">{item.title}</h4>
                  <p className="text-gray-700 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Events Section */}
          <div className="w-full md:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4 border-b-4 border-green-500 pb-2">🎉 Events</h3>
            {eventItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.09 }}
                className="flex border-l-4 border-green-500 bg-green-100 rounded shadow overflow-hidden"
              >
                <div className="p-4 bg-green-500 text-white flex flex-col items-center justify-center min-w-[80px]">
                  <span className="text-sm">📅</span>
                  <span className="font-bold text-lg">
                    {new Date(item.date).toLocaleDateString(undefined, { day: "2-digit", month: "short" })}
                  </span>
                  <span className="text-xs">
                    {new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div className="p-4 flex-1">
                  <h4 className="font-bold text-green-700 text-lg">
                    {item.organizer} {item.organizedBy && `– ${item.organizedBy}`}
                  </h4>
                  {item.place && <p className="text-sm text-gray-700">📍 {item.place}</p>}
                  <p className="text-gray-700 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ================= Modal ================= */}
      <AnimatePresence>
        {openModal && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <motion.div className="bg-white rounded-2xl shadow-lg w-11/12 md:w-1/3 p-6 relative">
              <button onClick={() => setOpenModal(null)} className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg">
                ✖
              </button>
              <h2 className="text-lg md:text-xl font-bold mb-4">{openModal.name}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base md:text-lg">
                {openModal.docs.map((doc, i) => <li key={i}>{doc}</li>)}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
