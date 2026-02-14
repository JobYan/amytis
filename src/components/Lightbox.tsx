"use client";

import React, { useEffect, useState } from 'react';

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  altTexts?: string[];
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex = 0, altTexts = [], onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentImage = images[currentIndex];
  const currentAlt = altTexts[currentIndex] || `Image ${currentIndex + 1}`;

  useEffect(() => {
    setIsLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={currentImage}
          alt={currentAlt}
          className={`max-w-full max-h-[85vh] object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
          <span className="text-white/90 text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      )}

      <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/50 rounded-full backdrop-blur-sm">
        <span className="text-white/70 text-xs">
          Press <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-white/90">ESC</kbd> to close
        </span>
      </div>
    </div>
  );
}
