import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PackageCheck } from "lucide-react";
import axios from "axios";

const ThankYou = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${apiUrl}/order-no/${orderId}`);
        if (res.data.success) {
          const order = res.data.order;
          setOrder(order);
          window.dataLayer = window.dataLayer || [];
          setTimeout(() => {
            window.dataLayer.push({
              event: "purchase",
              user: {
                name: order.shippingInfo.fullName || "",
                email: order.shippingInfo.email || "",
                phone: order.shippingInfo.mobileNo || "",
                address: order.shippingInfo.address || "",
              },
              ecommerce: {
                transaction_id: order.orderNo,
                currency: "BDT",
                value: order.totalAmount,
                tax: order.vat,
                shipping: order.deliveryCharge,
                coupon: order.promoCode || "",
                items: order.items.map((item) => ({
                  item_name: item.productId?.name || "Unknown Product",
                  item_id: item.productId?.productId || "N/A",
                  price: item.price,
                  quantity: item.quantity,
                  item_variant: item.variantId || "Default",
                  item_category: item.productId?.category?.name || "N/A",
                  item_image: item.productId?.thumbnailImage || "",
                  item_size:
                    item.productId?.variants?.find(
                      (v) => v._id === item.variantId,
                    )?.sizeName || "N/A",
                })),
              },
            });
          }, 200);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };
    fetchOrder();
  }, [orderId, apiUrl]);

  const cardStyle = {
    background: "rgba(5,46,22,0.55)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(52,211,153,0.18)",
    borderRadius: "18px",
    padding: "24px 28px",
  };

  const labelStyle = {
    fontSize: "12px",
    color: "rgba(167,243,208,0.5)",
    letterSpacing: "0.07em",
    marginBottom: "4px",
    fontFamily: "'Hind Siliguri', sans-serif",
  };

  const valueStyle = {
    fontSize: "clamp(13px,1.5vw,15px)",
    color: "#fff",
    fontWeight: 600,
    lineHeight: 1.5,
    fontFamily: "'Hind Siliguri', sans-serif",
  };

  return (
    <>
      <style>{`
        @keyframes sg-pulseGlow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.08)} }
        @keyframes sg-floatUp   { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(-12px)} }
        @keyframes shimmerGold  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes dotPulse     { 0%,100%{opacity:1;box-shadow:0 0 6px #34d399} 50%{opacity:0.5;box-shadow:0 0 14px #34d399} }
        @keyframes checkBounce  { 0%{transform:scale(0) rotate(-10deg)} 60%{transform:scale(1.15) rotate(3deg)} 100%{transform:scale(1) rotate(0deg)} }
        @keyframes fadeSlideUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .gold-shimmer-ty {
          background: linear-gradient(90deg,#ca8a04,#fbbf24,#fde68a,#fbbf24,#ca8a04);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmerGold 2.5s linear infinite;
        }
        .ty-icon { animation: checkBounce 0.7s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
        .ty-card-1 { animation: fadeSlideUp 0.6s ease forwards; animation-delay: 0.2s; opacity: 0; }
        .ty-card-2 { animation: fadeSlideUp 0.6s ease forwards; animation-delay: 0.4s; opacity: 0; }
        .ty-card-3 { animation: fadeSlideUp 0.6s ease forwards; animation-delay: 0.6s; opacity: 0; }
        .ty-card-4 { animation: fadeSlideUp 0.6s ease forwards; animation-delay: 0.8s; opacity: 0; }
        .ty-card-5 { animation: fadeSlideUp 0.6s ease forwards; animation-delay: 1.0s; opacity: 0; }

        .ty-btn { transition: all 0.3s ease; }
        .ty-btn:hover { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(180,83,9,0.5) !important; }

        .leaf  { animation: leafSway 4s ease-in-out infinite; transform-origin: bottom center; }
        .leaf2 { animation: leafSway 5s ease-in-out infinite reverse; transform-origin: bottom center; }
        @keyframes leafSway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }

        .item-row { transition: background 0.2s ease; }
        .item-row:hover { background: rgba(16,185,129,0.07) !important; }
      `}</style>

      <div
        style={{
          fontFamily: "'Noto Serif Bengali','Hind Siliguri',Georgia,serif",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(145deg, #052e16 0%, #064e3b 35%, #065f46 60%, #047857 100%)",
          padding: "60px 20px 80px",
        }}
      >
        {/* BG blobs */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%)",
            borderRadius: "50%",
            animation: "sg-pulseGlow 5s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-8%",
            width: "420px",
            height: "420px",
            background:
              "radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 65%)",
            borderRadius: "50%",
            animation: "sg-pulseGlow 6s ease-in-out infinite 1.5s",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "38%",
            width: "350px",
            height: "350px",
            background:
              "radial-gradient(circle, rgba(202,138,4,0.06) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Vertical lines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "31%",
            width: "1px",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(52,211,153,0.12), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "33%",
            width: "1px",
            height: "100%",
            background:
              "linear-gradient(to bottom, transparent, rgba(52,211,153,0.06), transparent)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Sugarcane SVG */}
        <div
          style={{
            position: "absolute",
            right: "2%",
            bottom: 0,
            height: "80%",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 2,
            opacity: 0.1,
            pointerEvents: "none",
          }}
        >
          <svg width="180" height="500" viewBox="0 0 210 580" fill="none">
            <rect
              x="80"
              y="30"
              width="20"
              height="510"
              rx="10"
              fill="#4ade80"
            />
            {[90, 170, 250, 330, 410, 490].map((y, i) => (
              <ellipse key={i} cx="90" cy={y} rx="15" ry="6" fill="#86efac" />
            ))}
            <path
              d="M80 110 C52 90 24 72 12 44"
              stroke="#4ade80"
              strokeWidth="6"
              strokeLinecap="round"
              className="leaf"
            />
            <path
              d="M80 210 C48 188 20 182 6 158"
              stroke="#4ade80"
              strokeWidth="5"
              strokeLinecap="round"
              className="leaf2"
            />
            <path
              d="M80 310 C54 288 32 278 16 254"
              stroke="#4ade80"
              strokeWidth="6"
              strokeLinecap="round"
              className="leaf"
            />
            <path
              d="M100 150 C130 128 158 112 172 84"
              stroke="#4ade80"
              strokeWidth="6"
              strokeLinecap="round"
              className="leaf2"
            />
            <path
              d="M100 250 C132 228 160 222 178 198"
              stroke="#4ade80"
              strokeWidth="5"
              strokeLinecap="round"
              className="leaf"
            />
          </svg>
        </div>

        {/* Floating particles */}
        {[
          { top: "8%", left: "5%", size: 7, delay: "0s", dur: "3.5s" },
          { top: "25%", left: "13%", size: 4, delay: "1s", dur: "4s" },
          { top: "65%", left: "4%", size: 8, delay: "0.5s", dur: "5s" },
          { top: "80%", left: "20%", size: 5, delay: "1.8s", dur: "3.8s" },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size,
              zIndex: 2,
              background: "rgba(167,243,208,0.3)",
              borderRadius: "2px",
              transform: "rotate(45deg)",
              animation: `sg-floatUp ${c.dur} ease-in-out infinite`,
              animationDelay: c.delay,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* ══ CONTENT ══ */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          {/* Success hero */}
          <div
            className="ty-card-1"
            style={{ textAlign: "center", marginBottom: "32px" }}
          >
            <div
              className="ty-icon"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                background: "rgba(16,185,129,0.15)",
                border: "2px solid rgba(52,211,153,0.35)",
                marginBottom: "20px",
              }}
            >
              <PackageCheck size={48} color="#34d399" />
            </div>
            <h1
              style={{
                fontSize: "clamp(28px,5vw,44px)",
                fontWeight: 900,
                color: "#fff",
                margin: "0 0 8px",
                lineHeight: 1.2,
              }}
            >
              অর্ডার সফল হয়েছে! 🎉
            </h1>
            <p
              style={{
                fontSize: "clamp(14px,1.8vw,18px)",
                fontWeight: 700,
                margin: "0 0 10px",
              }}
            >
              <span className="gold-shimmer-ty">
                ধন্যবাদ আপনার অর্ডারের জন্য!
              </span>
            </p>
            <p
              style={{
                fontSize: "clamp(13px,1.5vw,15px)",
                color: "rgba(167,243,208,0.7)",
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              আমরা আপনার অর্ডার পেয়েছি। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
            </p>
          </div>

          {/* Order Number highlight */}
          <div
            className="ty-card-2"
            style={{
              ...cardStyle,
              textAlign: "center",
              marginBottom: "20px",
              background: "rgba(202,138,4,0.12)",
              border: "1px solid rgba(251,191,36,0.25)",
            }}
          >
            <p style={{ ...labelStyle, marginBottom: "8px" }}>অর্ডার নম্বর</p>
            <p
              style={{
                fontSize: "clamp(22px,3.5vw,32px)",
                fontWeight: 900,
                color: "#fbbf24",
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              #{order?.orderNo || orderId}
            </p>
          </div>

          {/* Customer info */}
          {order && (
            <div
              className="ty-card-3"
              style={{ ...cardStyle, marginBottom: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "3px",
                    height: "20px",
                    borderRadius: "100px",
                    background: "linear-gradient(to bottom, #34d399, #fbbf24)",
                  }}
                />
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "16px",
                    margin: 0,
                  }}
                >
                  গ্রাহকের তথ্য
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {[
                  { label: "নাম", value: order.shippingInfo?.fullName },
                  { label: "মোবাইল", value: order.shippingInfo?.mobileNo },
                  { label: "ইমেইল", value: order.shippingInfo?.email },
                  { label: "ঠিকানা", value: order.shippingInfo?.address },
                ]
                  .filter((r) => r.value)
                  .map((r, i) => (
                    <div
                      key={i}
                      style={{
                        gridColumn: r.label === "ঠিকানা" ? "1 / -1" : "auto",
                      }}
                    >
                      <p style={labelStyle}>{r.label}</p>
                      <p style={valueStyle}>{r.value}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Order summary */}
          {order && (
            <div
              className="ty-card-4"
              style={{ ...cardStyle, marginBottom: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "18px",
                }}
              >
                <div
                  style={{
                    width: "3px",
                    height: "20px",
                    borderRadius: "100px",
                    background: "linear-gradient(to bottom, #34d399, #fbbf24)",
                  }}
                />
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "16px",
                    margin: 0,
                  }}
                >
                  অর্ডারের বিবরণ
                </p>
              </div>

              {/* Items */}
              <div
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="item-row"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      background: "rgba(16,185,129,0.06)",
                      border: "1px solid rgba(52,211,153,0.1)",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          ...valueStyle,
                          fontSize: "14px",
                          margin: "0 0 2px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.productId?.name || "Unknown Product"}
                      </p>
                      <p style={{ ...labelStyle, margin: 0 }}>
                        পরিমাণ: {item.quantity} · সাইজ:{" "}
                        {item.productId?.variants?.find(
                          (v) => v._id === item.variantId,
                        )?.sizeName || "Default"}
                      </p>
                    </div>
                    <p
                      style={{
                        color: "#fbbf24",
                        fontWeight: 700,
                        fontSize: "15px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      ৳ {item.price?.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price breakdown */}
              <div
                style={{
                  borderTop: "1px solid rgba(52,211,153,0.1)",
                  paddingTop: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {[
                  {
                    label: "সাবটোটাল",
                    value: order.totalAmount - order.deliveryCharge,
                  },
                  {
                    label: "ডেলিভারি",
                    value: order.deliveryCharge,
                    green: order.deliveryCharge === 0,
                  },
                  ...(order.vat ? [{ label: "VAT", value: order.vat }] : []),
                  ...(order.promoCode
                    ? [{ label: `প্রমো (${order.promoCode})`, value: null }]
                    : []),
                ].map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ ...labelStyle, margin: 0 }}>{r.label}</span>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: r.green ? "#34d399" : "rgba(255,255,255,0.8)",
                        fontFamily: "'Hind Siliguri',sans-serif",
                      }}
                    >
                      {r.green
                        ? "ফ্রি"
                        : r.value != null
                          ? `৳ ${r.value?.toLocaleString()}`
                          : "—"}
                    </span>
                  </div>
                ))}
                {/* Total */}
                <div
                  style={{
                    borderTop: "1px solid rgba(52,211,153,0.15)",
                    paddingTop: "10px",
                    marginTop: "4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "15px",
                      fontFamily: "'Hind Siliguri',sans-serif",
                    }}
                  >
                    মোট
                  </span>
                  <span
                    style={{
                      color: "#fbbf24",
                      fontWeight: 900,
                      fontSize: "20px",
                      fontFamily: "'Hind Siliguri',sans-serif",
                    }}
                  >
                    ৳ {order.totalAmount?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="ty-card-5" style={{ textAlign: "center" }}>
            <Link
              to="/"
              className="ty-btn"
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "14px",
                padding: "15px 44px",
                fontSize: "clamp(14px,1.8vw,17px)",
                fontFamily: "inherit",
                fontWeight: 700,
                boxShadow: "0 10px 35px rgba(180,83,9,0.4)",
                letterSpacing: "0.02em",
              }}
            >
              ← হোম পেজে ফিরুন
            </Link>
            <div
              style={{
                width: "48px",
                height: "2px",
                borderRadius: "100px",
                margin: "24px auto 0",
                background: "linear-gradient(90deg, #34d399, #fbbf24)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYou;
