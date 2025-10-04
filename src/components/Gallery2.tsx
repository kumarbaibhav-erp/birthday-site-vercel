import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Increased the photo count to fill the denser, taller grid
const PHOTOS = Array.from({ length: 24 }).map(
  (_, i) => `/usPhotos/photo${i + 1}.jpeg`
);
// Increased PAGE_SIZE to 16 to fill the new 4x4 or 4x3 grid
const PAGE_SIZE = 8;
const INTERVAL = 3000;

export default function Gallery2() {
  const [page, setPage] = useState(0);
  const [idx, setIdx] = useState<number | null>(null);

  // Auto-slide every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((p) => (p + 1) % Math.ceil(PHOTOS.length / PAGE_SIZE));
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const start = page * PAGE_SIZE;
  const currentPhotos = PHOTOS.slice(start, start + PAGE_SIZE);

  return (
    <div className="mt-4">
      {/* 1. Changed to a 4-column grid (grid-cols-4) across all sizes to make columns narrower.
        2. This narrower column + increased image height gives a portrait look.
      */}
      <div className="grid grid-cols-4 gap-2">
        {currentPhotos.map((src, i) => (
          <motion.button
            key={src}
            onClick={() => setIdx(start + i)}
            className="rounded-lg overflow-hidden focus:outline-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={src}
              alt={`pic-${i}`}
              // Increased height significantly (h-48) to force a portrait aspect ratio (taller than wide)
              className="w-full h-48 object-cover"
            />
          </motion.button>
        ))}
      </div>

      {idx !== null && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setIdx(null)}
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={PHOTOS[idx]}
            alt="big"
            className="max-h-[80vh] max-w-full rounded-2xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
