"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  const offers = [
    {
      title: "Rural Development",
      desc: "Building better roads, sanitation systems, and public facilities to improve the quality of life for every villager.",
    },
    {
      title: "Education & Awareness",
      desc: "Promoting literacy, skill development, and awareness programs to empower the youth and women of the village.",
    },
    {
      title: "Health & Sustainability",
      desc: "Organizing health camps, clean water initiatives, and sustainable practices to ensure the well-being of all residents.",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-orange-200 via-white to-green-200">
      {/* ================= Hero Section ================= */}
      <section className="relative w-full h-[500px] md:h-[800px] overflow-hidden">
        <Image src="/bgimg1.jpg" alt="ABOUT US" fill priority className="object-cover" />
        <motion.div
          className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            ABOUT US
          </motion.h1>
        </motion.div>
      </section>
      {/* ================= About Text Section ================= */}
      <section className="py-12 md:py-16 text-center px-4 md:px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-base md:text-xl font-bold text-green-900 leading-relaxed">
            At Gram Panchayat Dhanoli, our mission is to promote inclusive growth, empower citizens through participation, and create a clean, sustainable, and progressive environment. From rural infrastructure and sanitation to health, education, and digital initiatives, we are working towards improving the standard of living for all residents.
          </p>
        </motion.div>
      </section>

      {/* ================= Highlighted Gram Panchayat Information Card ================= */}
          <section className="max-w-4xl mx-auto my-12 p-6 rounded-3xl bg-gradient-to-tr from-green-50 via-white to-lime-100 shadow-2xl border-2 border-green-300 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-green-300 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-12 -right-8 w-32 h-32 bg-lime-300 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="text-center text-3xl font-extrabold text-green-900 mb-6 tracking-wide">
          🌿 Gram Panchayat Information
        </h2>

        <div className="space-y-5 text-green-800 text-lg leading-relaxed">
        <p>
          <span className="font-bold text-green-900">Dhanoli</span> is a large and progressive
          village located in
          <span className="font-semibold"> Hingna Taluka, Nagpur District, Maharashtra</span>.
          Established in <span className="font-bold">1948</span>, the Gram Panchayat of Dhanoli
          governs nearby villages such as{" "}
          <span className="font-semibold">
            Bidganeshpur, Sukli, Murzhadi, Umri, Khapa, Devapur, Gangapur, and Junapani
          </span>
          . As per the 2011 Census, the total population of the Panchayat area is around{" "}
          <span className="font-bold">16,529</span>.
        </p>

        <p>
          The village is well connected by road to Nagpur city and has seen rapid growth in
          education, agriculture, and small-scale industries. The Panchayat focuses on{" "}
          <span className="font-semibold">sustainable development</span> through projects related to
          roads, sanitation, health, clean drinking water, and digital governance.
        </p>

        <hr className="border-green-300" />

        <p>
          🔹 Major development initiatives include{" "}
          <span className="font-semibold">cementing over 90% of internal village roads</span>, daily
          waste collection, and installation of{" "}
          <span className="font-semibold">CCTV cameras</span> for better safety and monitoring.
        </p>

        <p>
          🔹 The Panchayat also focuses on{" "}
          <span className="font-semibold">rainwater harvesting</span>, tree plantation drives, and
          renewable energy usage such as solar street lights.
        </p>

        <p>
          🔹 Dhanoli hosts multiple{" "}
          <span className="font-semibold">primary and secondary schools</span>, anganwadis, a
          government health center, cooperative banks, post office, and various temples and cultural
          centers that reflect the rich heritage of the village.
        </p>

        <p>
          With strong community participation and effective leadership, Dhanoli has become one of
          the model villages in the Hingna region, known for cleanliness, unity, and rural progress.
        </p>
      </div>
      </section>

      {/* ================= Team / Gallery Section ================= */}
      <section className="py-6 flex justify-center px-4">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[270px_1fr] gap-4 items-center">
            {/* Left Column */}
            <motion.div
              className="flex justify-center"
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                show: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/img8.jpg"
                alt=""
                width={270}
                height={367}
                className="rounded object-cover w-[200px] h-[270px] md:w-[270px] md:h-[367px]"
              />
            </motion.div>

            {/* Right Column */}
            <div className="flex flex-col gap-4 md:gap-6">
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row gap-2">
                {[
                  { src: "/img4.jpg", w: 284, h: 254 },
                  { src: "/img2.jpg", w: 284, h: 387 },
                  { src: "/IMG-20250917-WA0022.jpg", w: 284, h: 330 },
                ].map((img, i) => (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      width={img.w}
                      height={img.h}
                      className="rounded object-cover w-full sm:w-[200px] md:w-[284px] h-[220px] md:h-[330px]"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col sm:flex-row gap-2">
                {[
                  { src: "/IMG-20250917-WA0008.jpg", w: 438, h: 288 },
                  { src: "/IMG-20250917-WA0018.jpg", w: 290, h: 210 },
                ].map((img, i) => (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      width={img.w}
                      height={img.h}
                      className="rounded object-cover w-full sm:w-[200px] md:w-[290px] h-[160px] md:h-[210px]"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= What We Offer Section ================= */}
      <section className="py-16 px-4 md:px-6">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Subtitle */}
          <p className="uppercase text-xs md:text-sm text-green-900 font-semibold mb-2">
            The Challenge
          </p>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">
            What We Offer
          </h2>

          {/* Description */}
          <p className="max-w-xl mx-auto text-gray-800 mb-12 text-base md:text-xl">
            We are dedicated to delivering services that uplift the community, strengthen rural infrastructure, and ensure inclusive growth. Here’s how we serve our people:
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {offers.map((card, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 text-left"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-green-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-green-800 text-sm md:text-base">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      <section className="max-w-3xl mx-auto my-10 p-6 rounded-2xl shadow-lg bg-gradient-to-tr from-green-50 via-white to-lime-100 border-l-4 border-green-500">
  <h2 className="text-2xl font-extrabold text-green-900 mb-6 text-center tracking-wide">
    Major Works by Gram Panchayat Dhanoli
  </h2>

  <ul className="list-disc pl-6 space-y-4 text-green-900 text-lg font-medium">
    <li>
      <span className="font-bold text-green-900">
        90% of internal village roads concretized
      </span>{" "}
      ensuring smooth transport and better connectivity.
    </li>

    <li>
      <span className="font-semibold">
        Daily garbage collection and solid waste management system
      </span>{" "}
      successfully implemented to maintain village cleanliness.
    </li>

    <li>
      <span className="font-semibold">CCTV surveillance</span> installed at key junctions and Panchayat premises for safety and monitoring.
    </li>

    <li>
      Continuous <span className="font-semibold">drinking water supply</span> through
      pipelines, wells, and borewell recharge systems.
    </li>

    <li>
      <span className="font-semibold">Rainwater harvesting</span> and{" "}
      <span className="font-semibold">solar street light installations</span> promoting sustainability.
    </li>

    <li>
      <span className="font-semibold">Tree plantation drives</span> and green initiatives to
      enhance environmental balance.
    </li>

    <li>
      <span className="font-semibold">Health camps and vaccination drives</span> organized regularly for villagers’ well-being.
    </li>

    <li>
      Digital record keeping and <span className="font-semibold">online grievance redressal</span> introduced under the Smart Panchayat initiative.
    </li>
  </ul>
</section>

    </div>
  );
}