import ImageComponent from "./componentGeneral/ImageComponentWithCompression.jsx";
import AnimCard from "./componentGeneral/AnimCard.jsx";

export default function HeroSection({ product }) {
  const features = [{ text: "কেমিক্যাল বিহীন" }, { text: "নিজস্ব আখ ক্ষেত" }];

  return (
    <section
      className={"-pb-10 "}
      style={{
        fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', Georgia, serif",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background:
          "linear-gradient(145deg, #052e16 0%, #064e3b 35%, #065f46 60%, #047857 100%)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700;900&family=Hind+Siliguri:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        @keyframes floatUp { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(-12px)} }
        @keyframes shimmerGold {
          0%{background-position:200% center}
          100%{background-position:-200% center}
        }
        @keyframes pulseGlow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.08)} }
        @keyframes leafSway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes dotPulse { 0%,100%{opacity:1;box-shadow:0 0 6px #34d399} 50%{opacity:0.5;box-shadow:0 0 14px #34d399} }

        .gold-shimmer {
          background: linear-gradient(90deg, #ca8a04, #fbbf24, #fde68a, #fbbf24, #ca8a04);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 2.5s linear infinite;
        }

        .feature-pill { transition: all 0.3s ease; cursor: default; }
        .feature-pill:hover {
          transform: translateY(-3px);
          background: rgba(16,185,129,0.25) !important;
          border-color: rgba(52,211,153,0.5) !important;
        }

        .cta-primary { transition: all 0.3s ease; position:relative; overflow:hidden; }
        .cta-primary:hover { transform:translateY(-3px); box-shadow: 0 18px 44px rgba(180,83,9,0.5) !important; }

        .cta-secondary { transition: all 0.3s ease; }
        .cta-secondary:hover { background: rgba(255,255,255,0.1) !important; transform:translateY(-2px); }

        .leaf { animation: leafSway 4s ease-in-out infinite; transform-origin: bottom center; }
        .leaf2 { animation: leafSway 5s ease-in-out infinite reverse; transform-origin: bottom center; }

        .stat-card { transition: all 0.25s ease; }
        .stat-card:hover { background: rgba(5,150,105,0.2) !important; }
      `}</style>

      {/* BG glow blobs */}
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
          animation: "pulseGlow 5s ease-in-out infinite",
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
          animation: "pulseGlow 6s ease-in-out infinite 1.5s",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(202,138,4,0.07) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Vertical decorative lines */}
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
        }}
      />

      {/* Decorative Sugarcane SVG */}
      <div
        style={{
          position: "absolute",
          right: "3%",
          bottom: 0,
          height: "90%",
          display: "flex",
          alignItems: "flex-end",
          zIndex: 2,
          opacity: 0.15,
          pointerEvents: "none",
        }}
      >
        <svg width="210" height="580" viewBox="0 0 210 580" fill="none">
          <rect x="80" y="30" width="20" height="510" rx="10" fill="#4ade80" />
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
            d="M80 410 C58 390 40 386 26 364"
            stroke="#4ade80"
            strokeWidth="5"
            strokeLinecap="round"
            className="leaf2"
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
          <path
            d="M100 350 C130 330 158 324 176 302"
            stroke="#4ade80"
            strokeWidth="6"
            strokeLinecap="round"
            className="leaf2"
          />
          <path
            d="M100 450 C128 432 154 428 170 408"
            stroke="#4ade80"
            strokeWidth="5"
            strokeLinecap="round"
            className="leaf"
          />
          <rect
            x="124"
            y="70"
            width="14"
            height="470"
            rx="7"
            fill="#34d399"
            opacity="0.55"
          />
          {[130, 200, 275, 355, 435, 510].map((y, i) => (
            <ellipse
              key={i}
              cx="131"
              cy={y}
              rx="11"
              ry="5"
              fill="#6ee7b7"
              opacity="0.55"
            />
          ))}
          <path
            d="M124 175 C152 153 176 138 190 112"
            stroke="#34d399"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.55"
            className="leaf"
          />
          <path
            d="M138 275 C162 255 184 248 198 226"
            stroke="#34d399"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.55"
            className="leaf2"
          />
          <path
            d="M124 375 C100 354 78 346 64 324"
            stroke="#34d399"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.55"
            className="leaf"
          />
        </svg>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "28px",
        }}
      >
        {/* Origin badge */}
        <AnimCard delay={100}>
          <div style={{ marginBottom: "28px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(16,185,129,0.12)",
                border: "1px solid rgba(52,211,153,0.25)",
                backdropFilter: "blur(8px)",
                padding: "8px 20px",
                borderRadius: "100px",
                fontSize: "13px",
                color: "#6ee7b7",
                letterSpacing: "0.06em",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#34d399",
                  display: "inline-block",
                  animation: "dotPulse 2s infinite",
                }}
              />
              ফুলবাড়িয়া, ময়মনসিংহ &nbsp;·&nbsp; সরাসরি উৎপাদক থেকে
            </span>
          </div>
        </AnimCard>

        {/* Hero Headline */}
        <AnimCard delay={300}>
          <div style={{ maxWidth: "800px", marginBottom: "22px" }}>
            <h1
              style={{
                fontSize: "clamp(28px,5.5vw,64px)",
                fontWeight: 900,
                lineHeight: 1.25,
                color: "#fff",
                margin: 0,
              }}
            >
              আপনার পরিবার কি এখনও <br />
              <span className={"text-red-600"}>কেমিক্যালযুক্ত সাদা চিনি</span>{" "}
              <span style={{ color: "rgba(255,255,255,0.75)" }}>খাচ্ছে?</span>
            </h1>
          </div>
        </AnimCard>

        {/*Thumbnail Image*/}
        <AnimCard delay={500}>
          <div className={"max-w-3xl mx-auto pb-5"}>
            <ImageComponent
              imageName={product?.thumbnailImage}
              altName={product?.name}
              className="w-full aspect-square object-cover"
              skeletonHeight={"400px"}
              width={1000}
              height={1000}
              loadingStrategy="eager"
              fetchPriority="high"
            />
          </div>
        </AnimCard>

        {/* Subheading */}
        <AnimCard delay={700}>
          <div style={{ maxWidth: "660px", marginBottom: "36px" }}>
            <p
              style={{
                fontSize: "clamp(17px,2.3vw,24px)",
                fontWeight: 700,
                lineHeight: 1.5,
                margin: "0 0 10px",
              }}
            >
              <span className="gold-shimmer">
                ফুলবাড়িয়ার ঐতিহ্যবাহী হাতে তৈরি আখের লাল চিনি
              </span>
            </p>
            <p
              style={{
                fontSize: "clamp(14px,1.6vw,17px)",
                color: "white",
                margin: 0,
                lineHeight: 1.65,
              }}
            >
              ফুলবাড়িয়ার ঐতিহ্যবাহী পদ্ধতিতে তৈরি — কোনো ব্লিচিং নেই, কোনো
              কেমিক্যাল নেই। শুধু আখের রসের আসল মিষ্টতা, সরাসরি আপনার ঘরে।
            </p>
          </div>
        </AnimCard>

        {/* Feature Pills */}
        <AnimCard delay={900}>
          <div className="grid grid-cols-2 gap-3 mb-11 md:max-w-3xl ">
            {features.map((f, i) => (
              <div
                key={i}
                className="
                flex items-center gap-2
                bg-emerald-500/15
                border border-emerald-300/20
                backdrop-blur-md
                rounded-xl
                px-4 py-3
              "
              >
                <span className={"font-bold  text-white"}>{f.text}</span>
              </div>
            ))}
          </div>
        </AnimCard>

        {/* CTA Buttons */}
        <AnimCard delay={1100}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px",
              marginBottom: "52px",
              alignItems: "center",
            }}
          >
            <a
              href={"#checkout"}
              className="cta-primary w-full md:w-auto text-center"
              style={{
                background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "14px",
                padding: "17px 42px",
                fontSize: "clamp(15px,1.9vw,18px)",
                fontFamily: "inherit",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 10px 35px rgba(180,83,9,0.4)",
                letterSpacing: "0.02em",
              }}
            >
              এখনই অর্ডার করুন →
            </a>
          </div>
        </AnimCard>

        {/* Trust Stats */}
        <AnimCard delay={1300}>
          <div
            style={{
              display: "inline-flex",
              flexWrap: "nowrap",
              justifyContent: "center",
              background: "rgba(5,46,22,0.5)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(52,211,153,0.14)",
              borderRadius: "18px",
              overflow: "hidden",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            {[
              { num: "৩০,০০০+", label: "সন্তুষ্ট পরিবার", icon: "👨‍👩‍👧‍👦" },
              { num: "১০০%", label: "ক্যামিকেল মুক্ত", icon: "✅" },
              { num: "২০১৯", label: "সাল থেকে", icon: "🏆" },
            ].map((s, i) => (
              <div
                key={i}
                className="stat-card"
                style={{
                  padding: "10px 8px",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid rgba(52,211,153,0.1)" : "none",
                  flex: "1 1 0",
                  minWidth: 0,
                }}
              >
                <div style={{ fontSize: "16px", marginBottom: "3px" }}>
                  {s.icon}
                </div>
                <div
                  style={{
                    fontSize: "clamp(16px,2.8vw,24px)",
                    fontWeight: 900,
                    color: "#fbbf24",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "rgba(167,243,208,0.6)",
                    marginTop: "4px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </AnimCard>
      </div>

      {/* Floating particles */}
      {[
        { top: "12%", left: "8%", size: 7, delay: "0s", dur: "3.5s" },
        { top: "28%", left: "16%", size: 4, delay: "1s", dur: "4s" },
        { top: "62%", left: "6%", size: 9, delay: "0.5s", dur: "5s" },
        { top: "78%", left: "22%", size: 5, delay: "1.5s", dur: "3.8s" },
        { top: "8%", left: "55%", size: 6, delay: "0.8s", dur: "4.5s" },
        { top: "45%", left: "12%", size: 4, delay: "2s", dur: "4.2s" },
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
            background: "rgba(167,243,208,0.35)",
            borderRadius: "2px",
            transform: "rotate(45deg)",
            animation: `floatUp ${c.dur} ease-in-out infinite`,
            animationDelay: c.delay,
            pointerEvents: "none",
          }}
        />
      ))}
    </section>
  );
}
