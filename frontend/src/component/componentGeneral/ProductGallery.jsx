import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import ImageComponentWithCompression from "./ImageComponentWithCompression.jsx";

const ProductGallery = ({ images, discount, zoom = true, productName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);

  const validImages = Array.isArray(images) && images.length > 0;
  const displayImages = validImages ? images : [];
  const currentIndex = validImages && activeIndex >= images.length ? 0 : activeIndex;

  const changeImage = (direction) => {
    setActiveIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      }
    });
  };

  if (!validImages) {
    return <div className="w-full aspect-square bg-gray-100 animate-pulse" />;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div ref={containerRef} className="relative w-full">
          <div className="relative w-full" style={{ paddingBottom: "100%" }}>
            <div className="absolute inset-0 flex items-center justify-center ">
              <ImageComponentWithCompression
                imageName={images[activeIndex]}
                altName={productName}
                className="w-full h-full object-contain"
                skeletonHeight="100%"
                width={800}
                height={800}
                loadingStrategy="lazy"
                fetchPriority="auto"
              />
            </div>

            {images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-white px-2 py-1 text-xs z-10">
                {activeIndex + 1} / {images.length}
              </div>
            )}

            {zoom && (
              <button
                className="absolute bottom-2 left-2 p-2 bg-white rounded-full cursor-pointer shadow-md"
                aria-label="full screen"
                onClick={() => setIsZoomed(true)}
              >
                <BsArrowsFullscreen />
              </button>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex items-center justify-between mt-3 px-2">
              <button
                onClick={() => changeImage("prev")}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-30"
                disabled={activeIndex === 0}
              >
                <IoIosArrowBack />
              </button>

              <div className="flex gap-2 overflow-x-auto max-w-[calc(100%-80px)] py-1 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`shrink-0 w-14 h-14 md:w-16 md:h-16 border-2 rounded-md transition-all overflow-hidden ${
                      activeIndex === idx
                        ? 'border-orange-500 opacity-100'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    <ImageComponentWithCompression
                      imageName={img}
                      altName={`${productName} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      skeletonHeight="100%"
                      width={200}
                      height={200}
                      loadingStrategy="lazy"
                      fetchPriority="auto"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => changeImage("next")}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-30"
                disabled={activeIndex === images.length - 1}
              >
                <IoIosArrowForward />
              </button>
            </div>
          )}
        </div>
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl p-2 z-50 hover:bg-white/20 rounded-full"
            onClick={() => setIsZoomed(false)}
          >
            <FaTimes />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white text-3xl p-2 hover:bg-white/20 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  changeImage("prev");
                }}
                disabled={activeIndex === 0}
              >
                <IoIosArrowBack />
              </button>
              <button
                className="absolute right-4 text-white text-3xl p-2 hover:bg-white/20 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  changeImage("next");
                }}
                disabled={activeIndex === images.length - 1}
              >
                <IoIosArrowForward />
              </button>
            </>
          )}

          <ImageComponentWithCompression
            imageName={images[activeIndex]}
            altName={productName}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            width={1200}
            height={1200}
            loadingStrategy="lazy"
            fetchPriority="auto"
          />
        </div>
      )}
    </>
  );
};

export default ProductGallery;