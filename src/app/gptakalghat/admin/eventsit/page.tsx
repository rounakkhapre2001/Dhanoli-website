"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  id: number;
  organizer: string;
  organized_by: string;
  place: string;
  date: string;
  description: string;
}

export default function Events() {
  const [formData, setFormData] = useState<{
    id: number | null;
    organizer: string;
    organizedBy: string;
    place: string;
    date: string;
    description: string;
  }>({
    id: null,
    organizer: "",
    organizedBy: "",
    place: "",
    date: "",
    description: "",
  });

  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });
    if (!error && data) setEvents(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isEditing && formData.id) {
      const { error } = await supabase
        .from("events")
        .update({
          organizer: formData.organizer,
          organized_by: formData.organizedBy,
          place: formData.place,
          date: formData.date,
          description: formData.description,
        })
        .eq("id", formData.id);
  
      if (error) {
        alert("Failed to update event!");
      } else {
        alert("Event updated!");
        // Update local state by replacing the edited event at the top
        setEvents(prev =>
          [prev.find((e) => e.id === formData.id), ...prev.filter(e => e.id !== formData.id)] as Event[]
        );
        resetForm();
      }
    } else {
      const { data, error } = await supabase.from("events").insert([
        {
          organizer: formData.organizer,
          organized_by: formData.organizedBy,
          place: formData.place,
          date: formData.date,
          description: formData.description,
        },
      ]).select();
  
      if (error) {
        alert("Failed to save event!");
      } else if (data) {
        alert("Event saved!");
        // Add new event to local state at the top
        setEvents(prev => [data[0], ...prev]);
        resetForm();
      }
    }
  };
  

  const handleEdit = (event: Event) => {
    setFormData({
      id: event.id,
      organizer: event.organizer,
      organizedBy: event.organized_by,
      place: event.place,
      date: event.date,
      description: event.description,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      alert("Failed to delete event!");
    } else {
      alert("Event deleted!");
      fetchEvents();
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      organizer: "",
      organizedBy: "",
      place: "",
      date: "",
      description: "",
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen ">
      <h1 className="text-2xl font-bold mb-4 text-[#dfdfdf]">Admin Dashboard - Events</h1>
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#14919B] hover:bg-[#0B6477] text-white rounded px-4 py-2 mb-4"
        >
          + Add Event
        </button>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border p-4 rounded bg-white space-y-3 mb-6"
          >
            <input
              type="text"
              name="organizer"
              placeholder="Organizer"
              value={formData.organizer}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="organizedBy"
              placeholder="Organized By"
              value={formData.organizedBy}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="place"
              placeholder="Place"
              value={formData.place}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 w-full"
              rows={3}
              required
            ></textarea>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div>
        <h3 className="font-bold text-lg text-[#dfdfdf]">Events List</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">No events available</p>
        ) : (
          <div className="space-y-3 mt-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex justify-between items-center bg-green-100 border p-3 rounded"
              >
                <div>
                  <span className="font-semibold">{event.organizer}</span> |{" "}
                  {event.place} | {event.date}
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
