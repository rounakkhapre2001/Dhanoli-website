"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

type Contact = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch contacts
  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
    } else {
      setContacts(data as Contact[]);
    }
    setLoading(false);
  };

  // 🔹 Delete contact
  const deleteContact = async (id: number) => {
    const { error } = await supabase.from("contacts").delete().eq("id", id);

    if (error) {
      console.error("Error deleting contact:", error);
    } else {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-[#f3f8f9]">
        📩 Contact Messages
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading messages...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-600">No messages found.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <motion.div
              key={c.id}
              className="p-4 sm:p-6 bg-white rounded-xl shadow border-l-4 border-[#0AD1C8] flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Contact Details */}
              <div className="flex-1">
                <p className="font-bold text-[#0B6477]">{c.name}</p>
                <p className="text-sm text-gray-600">{c.email}</p>
                <p className="text-sm text-gray-600">{c.subject}</p>
                <p className="text-gray-800 break-words">{c.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(c.created_at).toLocaleString()}
                </p>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteContact(c.id)}
                className="self-end sm:self-center px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
