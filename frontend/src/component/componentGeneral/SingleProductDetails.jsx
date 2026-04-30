import React, { useEffect, useRef, useState } from "react";
import useProductStore from "../../store/useProductStore.js";
import ProductGallery from "./ProductGallery.jsx";
import SinglePageCheckout from "./SinglePageCheckout.jsx";
import HeroSection from "../HeroSection.jsx";
import ProblemSection from "../ProblemSection.jsx";
import SolutionSection from "../SolutionSection.jsx";
import BenefitsCTASection from "../BenefitsCTASection.jsx";
import SectionBackground from "../SectionBackground.jsx";
import Footer from "../Footer.jsx";
import ProductCarousel from "./ProductCarousel.jsx";
import CountDown from "../CountDown.jsx";

const ProductDetails = ({ id }) => {
  const hasPushedRef = useRef(false);

  const { fetchProductById, product, loading, error, resetProduct } =
    useProductStore();

  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    if (id !== currentProductId) {
      resetProduct();
      setCurrentProductId(id);
      fetchProductById(id);
    }
  }, [id, currentProductId, fetchProductById, resetProduct]);

  // Data layer for View Content
  useEffect(() => {
    if (!product || hasPushedRef.current) return;

    const price =
      product.finalDiscount > 0 ? product.finalDiscount : product.finalPrice;

    const discount =
      product.finalDiscount > 0
        ? product.finalPrice - product.finalDiscount
        : 0;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "BDT",
        value: price,
        items: [
          {
            item_id: product._id,
            item_name: product.name,
            currency: "BDT",
            discount,
            item_variant: "Default",
            price,
            quantity: 1,
          },
        ],
      },
    });

    hasPushedRef.current = true;
  }, [product]);

  return (
    <div className="">
      {error && (
        <div className="text-red-500 flex items-center justify-center pt-40">
          Error: {error}
        </div>
      )}

      {product && (
        <div>
          <HeroSection product={product} />
          <ProblemSection />
          <SolutionSection />

          <SectionBackground>
            <div className="max-w-4xl mx-auto p-4">
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </div>
            <BenefitsCTASection />
            <ProductCarousel />
            <CountDown />
            <SinglePageCheckout product={product} />
            <Footer />
          </SectionBackground>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
