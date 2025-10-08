"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [contactsCount, setContactsCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserAndFetch() {
      // ✅ use getSession instead of getUser
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/login");
        return;
      }

      try {
        const { count: cCount } = await supabase
          .from("contacts")
          .select("*", { count: "exact", head: true });
        const { count: gCount } = await supabase
          .from("gallery")
          .select("*", { count: "exact", head: true });
        const { count: tCount } = await supabase
          .from("team")
          .select("*", { count: "exact", head: true });
        const { count: nCount, error: nError } = await supabase
          .from("items")
          .select("*", { count: "exact", head: true });
        if (nError) console.error("Error counting news items:", nError);
        const { count: eCount } = await supabase
          .from("events")
          .select("*", { count: "exact", head: true });

        setContactsCount(cCount || 0);
        setGalleryCount(gCount || 0);
        setTeamCount(tCount || 0);
        setNewsCount(nCount || 0);
        setEventsCount(eCount || 0);
      } catch (err) {
        console.error("Error fetching counts:", err);
      } finally {
        setLoading(false);
      }
    }

    checkUserAndFetch();

    // ✅ Optional: real-time auth listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) router.push("/login");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const stats = [
    { label: "Contacts", count: contactsCount },
    { label: "Gallery Images", count: galleryCount },
    { label: "Team Members", count: teamCount },
    { label: "News Items", count: newsCount },
    { label: "Events Items", count: eventsCount },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-2xl font-bold text-[#0B6477]">
          Welcome to Admin Dashboard 🎉
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="p-6 sm:p-8 lg:p-10 bg-white rounded-2xl shadow border-t-4 border-[#0AD1C8] flex flex-col items-center sm:items-start text-center sm:text-left"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-base sm:text-lg text-gray-500">{stat.label}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B6477]">
              {stat.count}
            </h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
