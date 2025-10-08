"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Menu, Users, Image as ImageIcon, Mail, Home, Newspaper, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { BsSoundwave } from "react-icons/bs";
import { motion } from "framer-motion";

const palette = {
  darkTeal: "#213A57",
  deepCyan: "#0B6477",
  slateTeal: "#14919B",
  brightCyan: "#0AD1C8",
  aquaBlue: "#45DFB1",
  mintGreen: "#80ED99",
  white: "#FFFFFF",
  red: "#FF4D4D",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // --- 1. Authentication Check Logic ---
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }

    // Auth State Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    checkAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // --- 2. Logout Handler ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navItems = [
    { name: "Dashboard", href: "/gptakalghat/admin", icon: Home },
    { name: "Contacts", href: "/gptakalghat/admin/contacts", icon: Mail },
    { name: "Gallery", href: "/gptakalghat/admin/gallery", icon: ImageIcon },
    { name: "Team", href: "/gptakalghat/admin/team", icon: Users },
    { name: "News", href: "/gptakalghat/admin/newsitems", icon: Newspaper },
    { name: "Events", href: "/gptakalghat/admin/eventsit", icon: BsSoundwave },
  ];

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen w-screen"
        style={{ background: palette.darkTeal }}
      >
        <h1 className="text-2xl text-white">Authenticating...</h1>
      </div>
    );
  }

  // --- 3. Render Layout ---
  return (
    <div
      className="flex h-screen w-screen"
      style={{
        background: `linear-gradient(90deg, ${palette.darkTeal}, ${palette.deepCyan}, ${palette.mintGreen})`,
      }}
    >
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 flex flex-col shadow-xl`}
        style={{
          background: `linear-gradient(180deg, ${palette.darkTeal}, ${palette.deepCyan})`,
          borderRight: `2px solid ${palette.slateTeal}`,
        }}
      >
        {/* Sidebar Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: `1px solid ${palette.slateTeal}` }}
        >
          <h1
            className={`font-bold text-lg text-white tracking-wide ${
              !isOpen && "hidden"
            }`}
          >
            Admin Panel
          </h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <motion.div
                key={item.name}
                initial={false}
                animate={active ? { scale: 1.05, x: 4 } : { scale: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors`}
                  style={{
                    background: active ? palette.brightCyan : "transparent",
                    color: active ? palette.darkTeal : palette.white,
                    fontWeight: active ? 700 : 400,
                    border: active ? `1px solid ${palette.aquaBlue}` : "none",
                    boxShadow: active
                      ? `0 2px 10px ${palette.aquaBlue}50`
                      : undefined,
                  }}
                >
                  <Icon className="w-5 h-5 min-w-5 min-h-5" />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: palette.red,
              color: palette.white,
              boxShadow: `0 4px 10px ${palette.red}50`,
            }}
          >
            <LogOut className="w-5 h-5" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main
          className="flex-1 overflow-y-auto p-6"
          style={{
            background: `linear-gradient(90deg, ${palette.slateTeal}, ${palette.brightCyan} 40%, ${palette.mintGreen} 90%)`,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
