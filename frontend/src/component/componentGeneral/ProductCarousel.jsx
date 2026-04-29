import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CarouselStore from "../../store/CarouselStore.js";
import GeneralInfoStore from "../../store/GeneralInfoStore.js";
import ImageComponentWithCompression from "./ImageComponentWithCompression.jsx";
import AnimCard from "./AnimCard.jsx";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCarousel = () => {
  const {
    CarouselStoreList,
    CarouselStoreListLoading,
    CarouselStoreListError,
  } = CarouselStore();

  const { GeneralInfoList } = GeneralInfoStore();

  if (CarouselStoreListError) {
    return (
      <div
        style={{
          background:
            "linear-gradient(145deg, #052e16 0%, #064e3b 35%, #065f46 60%, #047857 100%)",
          padding: "80px 16px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "rgba(167,243,208,0.7)", fontSize: "16px" }}>
          Something went wrong! Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes sg-pulseGlow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.08)} }
        @keyframes sg-floatUp   { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(-12px)} }
        @keyframes shimmerGold  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes dotPulse     { 0%,100%{opacity:1;box-shadow:0 0 6px #34d399} 50%{opacity:0.5;box-shadow:0 0 14px #34d399} }

        .gold-shimmer-carousel {
          background: linear-gradient(90deg,#ca8a04,#fbbf24,#fde68a,#fbbf24,#ca8a04);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmerGold 2.5s linear infinite;
        }

        /* Nav arrows */
        .product-carousel-wrap .swiper-button-next,
        .product-carousel-wrap .swiper-button-prev {
          width: 44px !important;
          height: 44px !important;
          background: rgba(5,46,22,0.75) !important;
          backdrop-filter: blur(10px) !important;
          border: 1px solid rgba(52,211,153,0.28) !important;
          border-radius: 50% !important;
          color: #6ee7b7 !important;
          transition: all 0.25s ease !important;
        }
        .product-carousel-wrap .swiper-button-next:hover,
        .product-carousel-wrap .swiper-button-prev:hover {
          background: rgba(16,185,129,0.25) !important;
          border-color: rgba(52,211,153,0.55) !important;
          transform: scale(1.08) !important;
        }
        .product-carousel-wrap .swiper-button-next::after,
        .product-carousel-wrap .swiper-button-prev::after {
          font-size: 14px !important;
          font-weight: 900 !important;
          color: #6ee7b7 !important;
        }

        /* Pagination dots */
        .product-carousel-wrap .swiper-pagination-bullet {
          background: rgba(52,211,153,0.35) !important;
          opacity: 1 !important;
          width: 8px !important;
          height: 8px !important;
          transition: all 0.25s ease !important;
        }
        .product-carousel-wrap .swiper-pagination-bullet-active {
          background: #34d399 !important;
          width: 24px !important;
          border-radius: 4px !important;
          box-shadow: 0 0 8px #34d399 !important;
        }

        /* Slide image overlay */
        .carousel-slide-inner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(5,46,22,0.55) 0%,
            transparent 50%
          );
          pointer-events: none;
          z-index: 1;
          border-radius: inherit;
        }
        .carousel-slide-inner {
          position: relative;
          width: 100%;
          height: 400px;
          border-radius: 14px;
          overflow: hidden;
        }
      `}</style>

      {/* ── Outer wrapper with hero-matched background ── */}
      <div>
        {/* ── Content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 20px",
          }}
        >
          {/* Section header */}
          <AnimCard delay={0}>
            <h2
              className="gold-shimmer-carousel"
              style={{
                fontFamily:
                  "'Noto Serif Bengali','Hind Siliguri',Georgia,serif",
                fontSize: "clamp(22px,3.5vw,38px)",
                fontWeight: 900,
                lineHeight: 1.3,
                display: "block",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              আপনাদের ভালোবাসার জন্য ধন্যবাদ!
            </h2>
          </AnimCard>

          {/* Swiper */}
          <div className="product-carousel-wrap">
            {CarouselStoreListLoading ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                  gap: "16px",
                }}
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: "400px",
                      borderRadius: "14px",
                      background: "rgba(5,150,105,0.12)",
                      border: "1px solid rgba(52,211,153,0.15)",
                      animation: "sg-pulseGlow 2s ease-in-out infinite",
                    }}
                  />
                ))}
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                breakpoints={{ 768: { slidesPerView: 3 } }}
                style={{ paddingBottom: "40px" }}
              >
                {CarouselStoreList?.map((product, index) => (
                  <SwiperSlide key={index}>
                    <div>
                      <ImageComponentWithCompression
                        imageName={product.imgSrc}
                        className="w-full h-full object-cover"
                        skeletonHeight={400}
                        altName={
                          GeneralInfoList?.CompanyName || "Product Image"
                        }
                        width={1000}
                        height={1000}
                        loadingStrategy="eager"
                        fetchPriority="high"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCarousel;
