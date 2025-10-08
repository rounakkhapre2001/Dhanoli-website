"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Menu, Users, Image as ImageIcon, Mail, Home, Newspaper, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { BsSoundwave } from "react-icons/bs";
import { motion } from "framer-motion";

const palette = {
  navy: "#03045E",
  blue: "#0077B6",
  cyan: "#00B4D8",
  lightBlue: "#90E0EF",
  veryLight: "#CAF0F8",
  white: "#ffff",
  red: "#ff0000"

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
    { name: "Dashboard", href: "/gpdhanoli/admin", icon: Home },
    { name: "Contacts", href: "/gpdhanoli/admin/contacts", icon: Mail },
    { name: "Gallery", href: "/gpdhanoli/admin/gallery", icon: ImageIcon },
    { name: "Team", href: "/gpdhanoli/admin/team", icon: Users },
    { name: "News", href: "/gpdhanoli/admin/newsitems", icon: Newspaper },
    { name: "Events", href: "/gpdhanoli/admin/eventsit", icon: BsSoundwave },
  ];
  
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen w-screen" style={{ background: palette.navy }}>
            <h1 className="text-2xl text-white">Authenticating...</h1>
        </div>
    );
  }

  // --- 3. Render Layout with Logout Button (No Border) ---
  return (
    <div className="flex h-screen w-screen" style={{ background: `linear-gradient(90deg, ${palette.veryLight}, ${palette.lightBlue}, ${palette.cyan})` }}>
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300 flex flex-col`}
        style={{
          backgroundColor: palette.navy,
          borderRight: `2px solid ${palette.blue}`,
        }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${palette.blue}` }}>
          <h1 className={`font-bold text-lg text-white tracking-wide ${!isOpen && "hidden"}`}>Admin Panel</h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Nav Links (flex-1 ensures it takes all available vertical space) */}
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
                    background: active ? palette.cyan : palette.navy,
                    color: active ? palette.navy : "#F4F4F4",
                    fontWeight: active ? 700 : 400,
                    boxShadow: active ? `0px 2px 8px 0 ${palette.cyan}60` : undefined,
                  }}
                >
                  <Icon className="w-5 h-5 min-w-5 min-h-5" />
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </motion.div>
            );
          })}
        </nav>
        
        {/* Logout Button (Side Bar के निचले हिस्से में - BORDER REMOVED) */}
        <div className="p-4"> 
            <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150"
                style={{
                    backgroundColor: palette.red,
                    color: palette.white,
                    boxShadow: `0 4px 6px -1px ${palette.red}40`,
                }}
            >
                <LogOut className="w-5 h-5" />
                {isOpen && <span>Logout</span>}
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto" >
        <main className="flex-1 overflow-y-auto p-6" style={{ background: `linear-gradient(90deg, ${palette.veryLight}, ${palette.lightBlue} 40%, ${palette.cyan} 80%)` }}>
          {children}
        </main>
      </div>
    </div>
  );
}