"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  category: "Elected Members" | "Administrative Staff";
  photo_url: string;
  term?: string;
  description?: string;
  created_at: string;
};

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  const fetchTeam = async () => {
    try {
      const { data, error } = await supabase
        .from("team")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      setTeam(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching team:", err);
      setTeam([]);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const electedMembers = team.filter((m) => m.category === "Elected Members");
  const staffMembers = team.filter((m) => m.category === "Administrative Staff");

  const renderMember = (person: TeamMember, idx: number, isElected: boolean) => (
    <motion.div
      key={person.id}
      initial={{
        opacity: 0,
        x: idx % 2 === 0 ? (isElected ? -80 : 80) : isElected ? 80 : -80,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={`flex flex-col md:flex-row items-center gap-8 mb-14 ${
        idx % 2 === 1 ? "md:flex-row-reverse" : ""
      }`}
    >
      <div
        className="w-52 h-52 rounded-xl border-4 shadow-md overflow-hidden flex-shrink-0"
        style={{ borderColor: isElected ? "#f7931e" : "#ffe100" }}
      >
        <Image
          src={person.photo_url || "/default-avatar.png"}
          alt={person.name}
          width={208}
          height={208}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h3
          className={`font-bold mb-1 ${
            isElected ? "text-[#057c26] text-xl" : "text-[#f7931e] text-lg"
          }`}
        >
          {person.name}
        </h3>
        <div
          className={`font-semibold mb-2 text-sm ${
            isElected ? "text-[#f7931e]" : "text-[#057c26]"
          }`}
        >
          {person.role}
        </div>
        {person.term && (
          <span className="inline-block bg-[#ffe100] text-[#232323] text-xs font-semibold px-3 py-1 rounded-full mb-2">
            Term: {person.term}
          </span>
        )}
        {person.description && (
          <p className="text-[#363636] text-sm mb-1">{person.description}</p>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-200 via-white to-green-200">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[800px]">
        <Image
          src="/img3.jpg"
          alt="Our Team"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold"
          >
            Our Team
          </motion.h1>
        </div>
      </section>

      {/* Members Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        {/* Elected Members */}
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-extrabold tracking-tight border-l-8 border-orange-500 pl-4 py-2 bg-gradient-to-r from-orange-50 via-white to-white shadow-sm mb-12 text-orange-600"
        >
          Elected Members
        </motion.h2>

        {electedMembers.map((person, idx) => renderMember(person, idx, true))}

        {/* Administrative Staff */}
        <motion.h2
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-extrabold text-green-700 tracking-tight border-l-8 border-green-400 pl-4 py-2 bg-gradient-to-r from-green-50 via-white to-white shadow-sm mb-6"
        >
          Administrative Staff
        </motion.h2>

        {staffMembers.map((person, idx) => renderMember(person, idx, false))}
      </section>
    </div>
  );
}
