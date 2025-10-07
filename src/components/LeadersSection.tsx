"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function LeadersSection() {
  const leaders = [
    { name: "Shri. Devendra Fadnavis", title: "Hon'ble Chief Minister", img: "/devendra.jpg" },
    { name: "Shri. Eknath Shinde", title: "Hon'ble Deputy Chief Minister", img: "/shinde.jpg" },
    { name: "Shri. Ajit Pawar", title: "Hon'ble Deputy Chief Minister", img: "/ajit_pawar.jpg" },
    { name: "Shri. Chandrashekhar Bawankule", title: "President BJP Maharashtra", img: "/bavankule.jpg" },
    { name: "Mrs. Shardatai Dnyaneshwarji Shingare", title: "Sarpanch GP Takalghat", img: "/sarpanch.jpg" },
    { name: "Mr. Umeshrao Naththooji Kawale", title: "Deputy Sarpanch", img: "/upa_sarpanch.jpg" },
  ];

  return (
    <>
      {/* About & Heading Section */}
      <section className="w-full py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-2">
                About Us
              </p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-extrabold text-green-800 leading-snug mb-6"
              >
                Our Leaders & Visionaries.
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg font-bold text-green-700 leading-relaxed">
                The leaders of Dhanoli are committed to building a stronger and progressive community. With their guidance, vision, and dedication, they continue to bring innovative development projects, empower villagers through various schemes, and ensure transparency in governance. Their united efforts aim to uplift every family, create sustainable opportunities, and preserve the cultural heritage of the region.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leaders Slider */}
      <section className="w-full bg-gradient-to-b from-orange-300 via-white to-green-200 py-10">
        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            slidesPerView={4}
            speed={4000}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {leaders.map((leader, idx) => (
              <SwiperSlide key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  <Image
                    src={leader.img}
                    alt={leader.name}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {leader.title}
                    </h3>
                    <p className="text-xs text-gray-600">{leader.name}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}