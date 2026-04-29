import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Stores
import useAuthUserStore from "../../store/AuthUserStore.js";

// Components
import AddressForm from "./AddressForm.jsx";
import ShippingOptions from "./ShippingOptions.jsx";
import PaymentMethod from "./PaymentMethod.jsx";
import AbandonedCartTracker from "./AbandonedCartTracker.jsx";
import CouponSection from "./CouponSection.jsx";
import RewardPoints from "./RewardPoints.jsx";

const SinglePageCheckout = ({ product }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { user } = useAuthUserStore();

  // --- 1. Product & Selection State ---
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const MAX_QUANTITY = 3;

  // --- 2. Checkout & Order State ---
  const [addressData, setAddressData] = useState({});
  const [selectedShipping, setSelectedShipping] = useState({
    name: "",
    value: 0,
  });
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Coupon & Reward Logic
  const [rewardPointsUsed, setRewardPointsUsed] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Configuration values
  const [freeDelivery, setFreeDelivery] = useState(null);
  const [vatPercentage, setVatPercentage] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Initialize variant
  useEffect(() => {
    if (product?.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Fetch Config (VAT & Free Delivery)
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const [freeRes, vatRes] = await Promise.all([
          axios.get(`${apiUrl}/getFreeDeliveryAmount`),
          axios.get(`${apiUrl}/getVatPercentage`),
        ]);
        if (freeRes.data?.success) setFreeDelivery(freeRes.data.data.value);
        if (vatRes.data?.success) setVatPercentage(vatRes.data.data.value);
      } catch (err) {
        console.error("Config fetch failed", err);
      }
    };
    fetchConfig();
  }, [apiUrl]);

  // --- 3. Calculations () ---
  const formatPrice = (price) =>
    isNaN(price) ? price : price.toLocaleString();

  const unitPrice =
    selectedVariant?.discount > 0
      ? selectedVariant.discount
      : selectedVariant?.price || 0;
  const subTotal = unitPrice * quantity;

  // Coupon Discount
  const couponDiscount = appliedCoupon?.discountAmount || 0;

  // Amount after initial discounts (Matches main Checkout logic)
  const amountAfterDiscounts = subTotal - rewardPointsUsed - couponDiscount;

  // Shipping
  const actualShippingCost =
    freeDelivery > 1 && subTotal >= freeDelivery ? 0 : selectedShipping.value;

  // VAT
  const vatAmount = vatPercentage
    ? (amountAfterDiscounts * vatPercentage) / 100
    : 0;

  // Final Total
  const grandTotal = amountAfterDiscounts + vatAmount + actualShippingCost;

  // --- 4. Handlers ---
  const handleQuantityChange = (type, e) => {
    e.stopPropagation();
    if (type === "increase" && quantity < MAX_QUANTITY)
      setQuantity((q) => q + 1);
    else if (type === "decrease" && quantity > 1) setQuantity((q) => q - 1);
  };

  // Data Layer for Initiat Checkout
  useEffect(() => {
    if (!product || !selectedVariant) return;

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "BDT",
        value: grandTotal,
        items: [
          {
            item_name: product.name,
            item_id: product._id || product.productId,
            price:
              selectedVariant.discount > 0
                ? selectedVariant.discount
                : selectedVariant.price,
            quantity: quantity,
            item_variant: selectedVariant.size?.name || "Default",
          },
        ],
      },
    });
  }, [product, selectedVariant, quantity, grandTotal]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!addressData.fullName || !addressData.phone || !addressData.address) {
      showSnackbar(
        "অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা দিন।",
        "error",
      );
      return;
    }

    setIsProcessingOrder(true);

    // --- Inside handleOrderSubmit ---
    const orderPayload = {
      shippingInfo: {
        fullName: addressData.fullName,
        mobileNo: addressData.phone,
        email: addressData.email || "",
        address: addressData.address,
      },
      shippingId: selectedShipping.id,
      items: [
        {
          productId: product._id || product.productId,
          quantity: quantity,
          // CHANGE THIS LINE:
          // Use variant._id (or the specific ID field your cart store uses)
          variantId: selectedVariant?._id || "Default",
        },
      ],
      promoCode: appliedCoupon?.code || null,
      paymentMethod,
    };

    if (user?._id) orderPayload.userId = user._id;

    // ---- bKash Flow ----
    if (paymentMethod === "bkash") {
      try {
        const createRes = await axios.post(`${apiUrl}/bkashcreate`, {
          amount: grandTotal.toFixed(2),
          payerReference: user?.phone || addressData.phone || "guestUser",
          callbackURL: `${window.location.origin}/bkash-callback`,
        });

        if (createRes.data?.bkashURL) {
          localStorage.setItem(
            "bkash_order_payload",
            JSON.stringify(orderPayload),
          );
          window.location.href = createRes.data.bkashURL;
          return;
        }
      } catch (err) {
        showSnackbar("bKash payment initialization failed", "error");
      } finally {
        setIsProcessingOrder(false);
      }
      return;
    }

    // ---- COD Flow ----
    try {
      const res = await axios.post(`${apiUrl}/orders`, orderPayload);
      if (res.data.success) {
        setOrderPlaced(true);
        showSnackbar("Order placed successfully!", "success");
        setTimeout(() => navigate(`/thank-you/${res.data.order.orderNo}`), 300);
      } else {
        showSnackbar(res.data.message || "Failed to place order.", "error");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again later.";
      showSnackbar(errorMessage, "error");
    } finally {
      setIsProcessingOrder(false);
    }
  };

  if (vatPercentage === null || freeDelivery === null) return null;

  return (
    <div
      id={"checkout"}
      className="max-w-6xl mx-auto p-4 pt-20 font-sans text-gray-900"
    >
      <form
        onSubmit={handleOrderSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          <div className="bg-green-100 rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">পণ্য নির্বাচন করুন</h2>
            <div className="flex flex-col gap-3 sm:gap-4">
              {product.variants?.map((variant) => {
                const isSelected =
                  selectedVariant?.size?.name === variant.size.name;

                return (
                  <div
                    key={variant.size.name}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative border-2 rounded-xl p-3 sm:p-4 cursor-pointer transition-all
        ${isSelected ? "border-red-600 bg-red-50" : "border-gray-200"}`}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center
            ${isSelected ? "border-red-600" : "border-gray-300"}`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-600" />
                        )}
                      </div>

                      <span className="font-bold text-sm sm:text-base">
                        {product.name} - {variant.size.name}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:pl-8">
                      {/* Quantity */}
                      <div className="flex items-center border rounded bg-white w-fit">
                        <button
                          type="button"
                          className="px-2 sm:px-3 py-1 border-r"
                          onClick={(e) =>
                            isSelected && handleQuantityChange("decrease", e)
                          }
                        >
                          <FiMinus />
                        </button>

                        <span className="px-3 sm:px-4 font-bold text-sm sm:text-base">
                          {isSelected ? quantity : 1}
                        </span>

                        <button
                          type="button"
                          className="px-2 sm:px-3 py-1 border-l"
                          onClick={(e) =>
                            isSelected && handleQuantityChange("increase", e)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right text-base sm:text-xl font-bold">
                        {variant.discount > 0 ? (
                          <>
                            {/* Discounted */}
                            <span className="text-red-600">
                              ৳ {formatPrice(variant.discount)}
                            </span>

                            {/* Original */}
                            <span className="text-gray-400 line-through text-xs sm:text-sm font-normal ml-2">
                              ৳ {formatPrice(variant.price)}
                            </span>

                            {/* Saved */}
                            <span className="block sm:inline text-green-600 text-xs sm:text-sm font-medium sm:ml-2">
                              Save ৳{" "}
                              {formatPrice(variant.price - variant.discount)}
                            </span>
                          </>
                        ) : (
                          <span>৳ {formatPrice(variant.price)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-green-100 p-6 rounded-xl ">
            <h2 className="text-xl font-bold mb-4">আপনার ঠিকানা দিন</h2>
            <AddressForm onAddressChange={setAddressData} user={user} />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <div className="bg-green-100  p-6 rounded-2xl  sticky top-6">
            <h2 className="text-xl font-bold border-b pb-4 mb-4">
              অর্ডার সামারি
            </h2>

            <div className="mb-6">
              <ShippingOptions onShippingChange={setSelectedShipping} />
            </div>

            {/* Added Coupon & Rewards to Single Page */}
            <div className="space-y-4 mb-6">
              <CouponSection
                orderAmount={subTotal}
                setAppliedCouponGlobal={setAppliedCoupon}
              />
              {user && (
                <RewardPoints
                  availablePoints={user.rewardPoints}
                  points={rewardPointsUsed}
                  onPointsChange={setRewardPointsUsed}
                />
              )}
            </div>

            <div className="space-y-3 text-lg border-t pt-4">
              <div className="flex justify-between">
                <span>সাব-টোটাল</span>
                <span>৳ {formatPrice(subTotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>ডিসকাউন্ট</span>
                  <span>- ৳ {formatPrice(couponDiscount)}</span>
                </div>
              )}
              {rewardPointsUsed > 0 && (
                <div className="flex justify-between text-blue-600">
                  <span>রিওয়ার্ড পয়েন্ট</span>
                  <span>- ৳ {formatPrice(rewardPointsUsed)}</span>
                </div>
              )}
              {vatPercentage > 0 && (
                <div className="flex justify-between">
                  <span>ভ্যাট ({vatPercentage}%)</span>
                  <span>৳ {formatPrice(vatAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>শিপিং চার্জ</span>
                <span>৳ {formatPrice(actualShippingCost)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-red-700 pt-2 border-t">
                <span>সর্বমোট</span>
                <span>৳ {formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="mt-8">
              <PaymentMethod
                selectedMethod={paymentMethod}
                setSelectedMethod={setPaymentMethod}
              />
            </div>

            <button
              type="submit"
              disabled={isProcessingOrder}
              className={`w-full cursor-pointer bg-red-700 text-white font-bold py-4 rounded-xl mt-8 text-xl shadow-lg transition-all active:scale-95 ${isProcessingOrder ? "opacity-50" : ""}`}
            >
              {isProcessingOrder
                ? "প্রসেসিং হচ্ছে..."
                : paymentMethod === "cash_on_delivery"
                  ? "অর্ডার নিশ্চিত করুন"
                  : "পেমেন্ট করতে এগিয়ে যান (bKash)"}
            </button>
          </div>
        </div>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <AbandonedCartTracker
        addressData={addressData}
        cart={[
          {
            productId: product._id || product.productId,
            name: product.name,
            quantity,
            originalPrice: selectedVariant?.price,
            discountPrice: selectedVariant?.discount,
            variantId: selectedVariant?._id || "Default",
          },
        ]}
        totalAmount={grandTotal}
        user={user}
        apiUrl={apiUrl}
        orderPlaced={orderPlaced}
        isCheckoutPage={true}
      />
    </div>
  );
};

export default SinglePageCheckout;
