"use client";

import { useState } from "react";

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div
        className={`grid gap-2 mb-4 ${
          images.length === 1
            ? "grid-cols-1"
            : images.length === 2
            ? "grid-cols-2"
            : "grid-cols-2"
        }`}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="relative overflow-hidden rounded-lg border border-stone-200 hover:border-[#6B8E6B]/40 transition-colors"
          >
            <img
              src={src}
              alt={`画像 ${i + 1}`}
              className={`w-full object-cover ${
                images.length === 1 ? "max-h-96" : "h-48"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
            onClick={() => setSelectedIndex(null)}
          >
            x
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
                  );
                }}
              >
                &lt;
              </button>
              <button
                className="absolute right-4 text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(
                    selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
                  );
                }}
              >
                &gt;
              </button>
            </>
          )}

          <img
            src={images[selectedIndex]}
            alt={`画像 ${selectedIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-4 text-white text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
