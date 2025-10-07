"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function ProGallery() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch images from Supabase
  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("image_url")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching gallery:", error.message);
      setLoading(false);
      return;
    }

    const urls =
      data?.map((row) => {
        const { data: publicUrlData } = supabase
          .storage
          .from("gallery")
          .getPublicUrl(row.image_url);
        return publicUrlData?.publicUrl || "";
      }).filter((url) => url !== "") || [];

    setImages(urls);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const openLightbox = (img: string, idx: number) => {
    setSelectedImage(img);
    setCurrentIndex(idx);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const middle = currentTarget.clientWidth / 2;
    if (clientX < middle) prevImage();
    else nextImage();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[800px] overflow-hidden">
        <Image
          src="/bgimg1.jpg"
          alt="Gallery Banner"
          fill
          priority
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-2xl md:text-4xl font-extrabold tracking-wide"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            OUR GALLERY
          </motion.h1>
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gradient-to-br from-orange-300 via-white to-green-300">
        {loading ? (
          <p className="text-center text-lg font-semibold">Loading images...</p>
        ) : (
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group aspect-square"
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 30, rotate: -2 },
                  show: { opacity: 1, scale: 1, y: 0, rotate: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                onClick={() => openLightbox(img, idx)}
              >
                <img
                  src={img}
                  alt={`gallery-${idx}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-lg font-semibold tracking-wide">
                    View Image
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 backdrop-blur-sm bg-black/90 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative max-w-6xl w-full">
                <motion.button
                  className="absolute top-4 right-4 text-white hover:text-red-400 transition z-50"
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={32} />
                </motion.button>
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-indigo-400 z-50"
                  whileHover={{ scale: 1.2 }}
                  onClick={prevImage}
                >
                  <ChevronLeft size={40} />
                </motion.button>
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-indigo-400 z-50"
                  whileHover={{ scale: 1.2 }}
                  onClick={nextImage}
                >
                  <ChevronRight size={40} />
                </motion.button>
                <motion.div
                  key={currentIndex}
                  className="relative w-full max-h-[85vh] flex items-center justify-center cursor-pointer"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  onClick={handleImageClick}
                >
                  <Image
                    src={selectedImage!}
                    alt="Selected"
                    width={1400}
                    height={900}
                    className="w-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                    unoptimized
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
