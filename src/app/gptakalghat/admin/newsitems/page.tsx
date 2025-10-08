"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

type NewsItem = {
  id?: number;
  title: string;
  date: string;
  description?: string;
};

export default function NewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<NewsItem>({ title: "", date: "" });
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("date", { ascending: false });
    if (error) console.error(error);
    else setNews(data || []);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.date) return alert("Please fill all fields");
    const payload = { title: formData.title, date: formData.date, description: formData.description || undefined };

    if (editId) {
      const { error } = await supabase.from("items").update(payload).eq("id", editId);
      if (error) return console.error(error);
      setNews(prev => prev.map(n => (n.id === editId ? { ...n, ...payload } : n)));
    } else {
      const { data, error } = await supabase.from("items").insert([payload]).select();
      if (error) return console.error(error);
      if (data) setNews(prev => [data[0], ...prev]);
    }

    setFormData({ title: "", date: "", description: "" });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (item: NewsItem) => {
    setFormData(item);
    setEditId(item.id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("items").delete().eq("id", id);
    if (error) return console.error(error);
    setNews(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-[#dfdfdf]">📰 Admin Dashboard - News</h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 mb-4 bg-[#14919B] hover:bg-[#0B6477] text-white rounded"
        >
          + Add News
        </button>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-6 space-y-3 border p-4 rounded bg-white shadow"
          >
            <input
              type="text"
              placeholder="News Title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded p-2"
            />
            <input
              type="date"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              className="w-full border rounded p-2"
            />
            <textarea
              placeholder="Description"
              value={formData.description || ""}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded p-2"
            />
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
              >
                {editId ? "Update" : "Save"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                  setFormData({ title: "", date: "", description: "" });
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-xl font-bold mb-2 text-[#ffff]">📋 News List</h2>
      <div className="flex flex-col gap-4">
        {news.map(n => (
          <motion.div
            key={n.id}
            className="bg-green-50 border rounded-lg p-4 shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-2 sm:mb-0">
              <div className="font-semibold text-[#0B6477]">{n.title} | {n.date}</div>
              <div className="text-gray-700">{n.description}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(n)}
                className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(n.id!)}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
