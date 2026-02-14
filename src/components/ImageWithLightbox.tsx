"use client";

import { useState } from 'react';
import Lightbox from './Lightbox';
import ExportedImage from 'next-image-export-optimizer';

interface ImageWithLightboxProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  unoptimized?: boolean;
  allImages: string[];
  allAlts: string[];
}

export default function ImageWithLightbox({ 
  src, 
  alt, 
  width, 
  height, 
  className = "", 
  unoptimized = false,
  allImages,
  allAlts 
}: ImageWithLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  const currentIndex = allImages.indexOf(src);

  const handleClick = () => {
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="my-4">
        {width && height ? (
          <div className="relative inline-block group">
            <ExportedImage
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`max-w-full h-auto rounded-lg transition-all duration-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,1),0_0_10px_rgba(59,130,246,0.5)] cursor-pointer ${className}`}
              unoptimized={unoptimized}
              onClick={handleClick}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          </div>
        ) : (
          <div className="relative inline-block group">
            <img 
              src={src}
              alt={alt}
              className={`max-w-full h-auto rounded-lg transition-all duration-300 hover:shadow-[0_0_0_2px_rgba(59,130,246,1),0_0_10px_rgba(59,130,246,0.5)] cursor-pointer ${className}`}
              onClick={handleClick}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
            </div>
          </div>
        )}
      </div>

      {lightboxOpen && allImages.length > 0 && (
        <Lightbox
          images={allImages}
          initialIndex={currentIndex >= 0 ? currentIndex : 0}
          altTexts={allAlts}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
