"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function GalleryPage() {
  const [gallery, setGallery] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // 📌 Fetch gallery images
  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("image_url")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching gallery:", error.message);
      return;
    }

    const urls =
      data?.map((row) =>
        supabase.storage.from("gallery").getPublicUrl(row.image_url).data.publicUrl
      ) || [];

    setGallery(urls);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // 📌 Handle file selection
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 📌 Save file to Storage + DB
  const handleSave = async () => {
    if (!file) return;

    const filePath = `${Date.now()}-${file.name}`;

    // Upload to Storage
    const { error: storageError } = await supabase.storage
      .from("gallery")
      .upload(filePath, file);

    if (storageError) {
      console.error("❌ Storage Upload Error:", storageError.message);
      return;
    }

    // Insert into DB
    const { error: dbError } = await supabase
      .from("gallery")
      .insert([{ image_url: filePath }]);

    if (dbError) {
      console.error("❌ Database Insert Error:", dbError.message);
      return;
    }

    // Update gallery state
    const { data: urlData } = supabase.storage
      .from("gallery")
      .getPublicUrl(filePath);

    setGallery([urlData.publicUrl, ...gallery]);
    setFile(null);
    setPreview(null);
    setIsModalOpen(false);
  };

  // 📌 Delete image
  const handleDelete = async (url: string, index: number) => {
    const filePath = url.split("/gallery/")[1];
    if (!filePath) return;

    const { error: storageError } = await supabase.storage
      .from("gallery")
      .remove([filePath]);
    if (storageError) console.error("❌ Storage Delete Error:", storageError.message);

    const { error: dbError } = await supabase
      .from("gallery")
      .delete()
      .eq("image_url", filePath);
    if (dbError) console.error("❌ DB Delete Error:", dbError.message);

    setGallery(gallery.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-[#eaeced]">
        🖼️ Manage Gallery
      </h1>

      {/* Add Image Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-[#14919B] hover:bg-[#0B6477] text-white rounded"
      >
        + Add Image
      </button>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {gallery.map((img, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={img}
              alt={`Gallery ${index}`}
              className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg shadow"
            />
            <button
              onClick={() => handleDelete(img, index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs sm:text-sm hover:bg-red-600"
            >
              ❌
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg w-11/12 sm:w-96"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B6477]">
                Upload Image
              </h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full p-2 border rounded mb-4"
              />
              {preview && (
                <img
                  src={preview}
                  className="w-full h-32 sm:h-40 object-cover mb-4 rounded"
                />
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-2 bg-[#0B6477] text-white rounded"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
