"use client";

import { useEffect, useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  photo_url: string;
  term?: string;
  description?: string;
}

export default function AdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    category: "Elected Members",
    term: "",
    description: "",
    photo: null as File | null,
  });

  const fetchMembers = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Members Error:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("role", form.role);
      data.append("category", form.category);
      data.append("term", form.term);
      data.append("description", form.description);
      if (form.photo) data.append("photo", form.photo);

      const method = editMember ? "PATCH" : "POST";
      const url = editMember ? `/api/team/${editMember.id}` : "/api/team";

      const res = await fetch(url, { method, body: data });
      const resData = await res.json();

      if (res.ok) {
        fetchMembers();
        setForm({
          name: "",
          role: "",
          category: "Elected Members",
          term: "",
          description: "",
          photo: null,
        });
        setShowForm(false);
        setEditMember(null);
      } else {
        alert("Error saving member: " + (resData.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error saving member");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      const resData = await res.json();
      if (res.ok) setMembers((prev) => prev.filter((m) => m.id !== id));
      else alert("Error deleting member: " + (resData.error || "Unknown error"));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Unexpected error deleting member");
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditMember(member);
    setForm({
      name: member.name,
      role: member.role,
      category: member.category,
      term: member.term || "",
      description: member.description || "",
      photo: null,
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-[#e1e5e5]">
        Admin Dashboard - Members
      </h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditMember(null);
          setForm({
            name: "",
            role: "",
            category: "Elected Members",
            term: "",
            description: "",
            photo: null,
          });
        }}
        className="bg-[#14919B] hover:bg-[#0B6477] text-white rounded px-4 py-2 mb-6"
      >
        {showForm ? "Close Form" : "+ Add Member"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 border p-4 rounded shadow-md w-full md:w-1/2 bg-white"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Elected Members">Elected Members</option>
            <option value="Administrative Staff">Administrative Staff</option>
          </select>
          <input
            type="text"
            name="term"
            placeholder="Term"
            value={form.term}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editMember ? "Update Member" : "Save Member"}
          </button>
        </form>
      )}

      <h2 className="text-lg sm:text-2xl font-semibold mt-10 mb-4 text-[#e8e8e8]">
        Team Members
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border p-2">Photo</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Term</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="text-center bg-gray-50">
                <td className="border p-2">
                  {m.photo_url ? (
                    <img
                      src={m.photo_url}
                      alt={m.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full object-cover"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="border p-2">{m.name}</td>
                <td className="border p-2">{m.role}</td>
                <td className="border p-2">{m.category}</td>
                <td className="border p-2">{m.term || "—"}</td>
                <td className="border p-2">{m.description || "—"}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(m)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
