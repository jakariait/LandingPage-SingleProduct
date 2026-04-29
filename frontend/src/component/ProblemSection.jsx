import AnimCard from "./componentGeneral/AnimCard.jsx";

const painPoints = [
  {
    icon: "⚡",
    title: "অতিরিক্ত ক্যালরি, পুষ্টি নেই",
    desc: "সাদা চিনি শুধু ক্যালরি দেয়, কিন্তু প্রোটিন, ভিটামিন বা মিনারেল প্রায় থাকে না।",
    accent: "rgba(239,68,68,0.18)",
    border: "rgba(239,68,68,0.28)",
    iconBg: "rgba(239,68,68,0.15)",
  },
  {
    icon: "📈",
    title: "রক্তে শর্করার দ্রুত ওঠানামা",
    desc: "রিফাইন্ড চিনি দ্রুত রক্তে গ্লুকোজ বাড়ায়, ফলে এনার্জি দ্রুত বাড়ে আবার দ্রুত কমেও যায়।",
    accent: "rgba(234,88,12,0.18)",
    border: "rgba(234,88,12,0.28)",
    iconBg: "rgba(234,88,12,0.15)",
  },
  {
    icon: "⚖️",
    title: "ওজন বৃদ্ধির ঝুঁকি",
    desc: "অতিরিক্ত চিনি শরীরে ফ্যাট হিসেবে জমা হতে পারে।",
    accent: "rgba(202,138,4,0.18)",
    border: "rgba(202,138,4,0.28)",
    iconBg: "rgba(202,138,4,0.15)",
  },
  {
    icon: "🦷",
    title: "দাঁতের ক্ষতি",
    desc: "চিনি ব্যাকটেরিয়ার খাদ্য হিসেবে কাজ করে, যা দাঁতের ক্ষয়ের ঝুঁকি বাড়ায়।",
    accent: "rgba(239,68,68,0.15)",
    border: "rgba(239,68,68,0.25)",
    iconBg: "rgba(239,68,68,0.12)",
  },
  {
    icon: "🧪",
    title: "অতিরিক্ত প্রসেসিং",
    desc: "রিফাইন্ড সাদা চিনি বহু ধাপে প্রসেসিং করা হয়, যেখানে প্রাকৃতিক উপাদান অনেকটাই হারিয়ে যায়।",
    accent: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.25)",
    iconBg: "rgba(168,85,247,0.12)",
  },
];

const chemBadges = [
  "অতিরিক্ত কেমিক্যাল প্রসেসিং",
  "প্রাকৃতিক মিনারেল হারানো",
  "শুধুই পরিশোধিত মিষ্টতা",
];

const processSteps = [
  { label: "কাঁচা আখ", good: true },
  { label: "→", arrow: true },
  { label: "রিফাইনিং", good: false },
  { label: "→", arrow: true },
  { label: "ব্লিচিং", good: false },
  { label: "→", arrow: true },
  { label: "কেমিক্যাল", good: false },
  { label: "→", arrow: true },
  { label: "সাদা চিনি ☠️", good: false },
];

export default function ProblemSection() {
  return (
    <section
      style={{
        fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', Georgia, serif",
        position: "relative",
        overflow: "hidden",
        padding: "30px 0 30px",
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
        @keyframes pulseGlow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.08)} }
        @keyframes shimmerGold { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes dotPulse { 0%,100%{opacity:1;box-shadow:0 0 6px #f87171} 50%{opacity:0.5;box-shadow:0 0 14px #f87171} }
        @keyframes leafSway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes scanline { 0%{top:-5%} 100%{top:105%} }

        .gold-shimmer {
          background: linear-gradient(90deg, #ca8a04, #fbbf24, #fde68a, #fbbf24, #ca8a04);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerGold 2.5s linear infinite;
        }
        .pain-card { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: default; }
        .pain-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(0,0,0,0.35) !important; }
        .chem-badge { transition: all 0.25s ease; }
        .chem-badge:hover { background: rgba(239,68,68,0.18) !important; border-color: rgba(239,68,68,0.45) !important; }
        .leaf  { animation: leafSway 4s ease-in-out infinite; transform-origin: bottom center; }
        .leaf2 { animation: leafSway 5s ease-in-out infinite reverse; transform-origin: bottom center; }
      `}</style>

      {/* ── Same BG blobs as hero ── */}
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
            "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Same vertical decorative lines ── */}
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

      {/* ── Scanline accent ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(239,68,68,0.12), transparent)",
          animation: "scanline 10s linear infinite",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Same sugarcane SVG (right side, mirrored role) ── */}
      <div
        style={{
          position: "absolute",
          right: "3%",
          bottom: 0,
          height: "85%",
          display: "flex",
          alignItems: "flex-end",
          zIndex: 2,
          opacity: 0.12,
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

      {/* ── Same floating diamond particles ── */}
      {[
        { top: "8%", left: "5%", size: 7, delay: "0s", dur: "3.5s" },
        { top: "25%", left: "14%", size: 4, delay: "1s", dur: "4s" },
        { top: "60%", left: "4%", size: 9, delay: "0.5s", dur: "5s" },
        { top: "80%", left: "20%", size: 5, delay: "1.5s", dur: "3.8s" },
        { top: "12%", left: "52%", size: 6, delay: "0.8s", dur: "4.5s" },
        { top: "45%", left: "10%", size: 4, delay: "2s", dur: "4.2s" },
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
            animation: `floatUp ${c.dur} ease-in-out infinite`,
            animationDelay: c.delay,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ══════════ CONTENT ══════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "0 28px",
        }}
      >
        {/* Section badge — same pill style as hero origin badge */}
        <AnimCard delay={0}>
          <div style={{ marginBottom: "28px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.28)",
                backdropFilter: "blur(8px)",
                padding: "8px 20px",
                borderRadius: "100px",
                fontSize: "13px",
                color: "white",
                letterSpacing: "0.06em",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#f87171",
                  display: "inline-block",
                  animation: "dotPulse 2s infinite",
                }}
              />
              আপনি কি জানেন?
            </span>
          </div>
        </AnimCard>

        {/* Main headline — same weight/size scale as hero h1 */}
        <AnimCard delay={100}>
          <div style={{ marginBottom: "22px" }}>
            <h2
              style={{
                fontSize: "clamp(25px,5.5vw,64px)",
                fontWeight: 900,
                lineHeight: 1.25,
                color: "#fff",
                margin: 0,
              }}
            >
              বাজারের <span className={"text-red-600"}>সাদা চিনি</span> কীভাবে
              তৈরি হয়?
            </h2>
          </div>
        </AnimCard>

        {/* Body text — same muted green tones */}
        <AnimCard delay={200}>
          <div style={{ maxWidth: "660px", marginBottom: "40px" }}>
            <p
              style={{
                fontSize: "clamp(14px,1.7vw,18px)",
                color: "white",
                lineHeight: 1.8,
                margin: "0 0 14px",
              }}
            >
              বেশিরভাগ সাদা চিনি অতিরিক্ত প্রসেসিং ও ব্লিচিংয়ের মাধ্যমে তৈরি
              হয়। এই প্রক্রিয়ায় প্রাকৃতিক পুষ্টিগুণ প্রায় নষ্ট হয়ে যায়।
            </p>
            <p
              style={{
                fontSize: "clamp(13px,1.5vw,16px)",
                color: "white",
                lineHeight: 1.8,
                margin: "0 0 14px",
              }}
            >
              আমরা প্রতিদিন চা, মিষ্টি, পিঠায় এটি ব্যবহার করি — কিন্তু কখনও
              ভেবে দেখেছি কি আমরা আসলে কী খাচ্ছি?
            </p>
            <p
              style={{
                fontSize: "clamp(14px,1.6vw,17px)",
                color: "white",
                lineHeight: 1.8,
                margin: 0,
                fontWeight: 600,
              }}
            >
              সবচেয়ে ভয়ংকর ব্যাপার হলো — আমরা নিজের অজান্তেই পরিবারকে প্রসেসড
              খাবারের দিকে ঠেলে দিচ্ছি।
            </p>
          </div>
        </AnimCard>

        {/* Process flow — same pill/card treatment as hero feature pills */}
        {/*<AnimCard delay={300}>*/}
        {/*  <div*/}
        {/*    style={{*/}
        {/*      display: "inline-flex",*/}
        {/*      flexWrap: "wrap",*/}
        {/*      alignItems: "center",*/}
        {/*      gap: "8px",*/}
        {/*      background: "rgba(5,46,22,0.5)",*/}
        {/*      backdropFilter: "blur(16px)",*/}
        {/*      border: "1px solid rgba(52,211,153,0.14)",*/}
        {/*      borderRadius: "18px",*/}
        {/*      padding: "20px 28px",*/}
        {/*      marginBottom: "52px",*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <p*/}
        {/*      style={{*/}
        {/*        width: "100%",*/}
        {/*        fontSize: "12px",*/}
        {/*        color: "white",*/}
        {/*        letterSpacing: "0.08em",*/}
        {/*        margin: "0 0 12px 0",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      সাদা চিনির প্রসেসিং ধাপ*/}
        {/*    </p>*/}
        {/*    <div*/}
        {/*      style={{*/}
        {/*        display: "flex",*/}
        {/*        flexWrap: "wrap",*/}
        {/*        alignItems: "center",*/}
        {/*        gap: "8px",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {processSteps.map((s, i) =>*/}
        {/*        s.arrow ? (*/}
        {/*          <span*/}
        {/*            key={i}*/}
        {/*            style={{*/}
        {/*              color: "red",*/}
        {/*              fontWeight: 700,*/}
        {/*              fontSize: "18px",*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            →*/}
        {/*          </span>*/}
        {/*        ) : (*/}
        {/*          <span*/}
        {/*            key={i}*/}
        {/*            style={{*/}
        {/*              padding: "8px 16px",*/}
        {/*              borderRadius: "10px",*/}
        {/*              fontSize: "clamp(12px,1.3vw,14px)",*/}
        {/*              fontWeight: 600,*/}
        {/*              background: s.good*/}
        {/*                ? "rgba(16,185,129,0.15)"*/}
        {/*                : "rgba(239,68,68,0.1)",*/}
        {/*              border: `1px solid ${s.good ? "rgba(52,211,153,0.3)" : "rgba(239,68,68,0.25)"}`,*/}
        {/*              color: s.good ? "#6ee7b7" : "#fca5a5",*/}
        {/*            }}*/}
        {/*          >*/}
        {/*            {s.label}*/}
        {/*          </span>*/}
        {/*        ),*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*    <div*/}
        {/*      style={{*/}
        {/*        width: "100%",*/}
        {/*        display: "flex",*/}
        {/*        flexWrap: "wrap",*/}
        {/*        gap: "8px",*/}
        {/*        marginTop: "14px",*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {chemBadges.map((b, i) => (*/}
        {/*        <span*/}
        {/*          key={i}*/}
        {/*          className="chem-badge"*/}
        {/*          style={{*/}
        {/*            display: "inline-flex",*/}
        {/*            alignItems: "center",*/}
        {/*            gap: "6px",*/}
        {/*            padding: "7px 16px",*/}
        {/*            borderRadius: "100px",*/}
        {/*            fontSize: "12px",*/}
        {/*            background: "rgba(239,68,68,0.07)",*/}
        {/*            border: "1px solid rgba(239,68,68,0.2)",*/}
        {/*            color: "white",*/}
        {/*            letterSpacing: "0.02em",*/}
        {/*          }}*/}
        {/*        >*/}
        {/*          ✗ {b}*/}
        {/*        </span>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</AnimCard>*/}

        {/* Pain point cards — same glassmorphism card style */}
        <div className={"grid grid-cols-2 md:grid-cols-3 gap-3"}>
          {painPoints.map((p, i) => (
            <AnimCard key={i} delay={400 + i * 100}>
              <div
                className="pain-card "
                style={{
                  padding: "22px",
                  borderRadius: "18px",
                  height: "100%",
                  background: p.accent,
                  border: `1px solid ${p.border}`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className={"space-y-2"}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      flexShrink: 0,
                      background: p.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "22px",
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "clamp(14px,1.5vw,16px)",
                        lineHeight: 1.4,
                        margin: "0 0 8px",
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        color: "rgba(167,243,208,0.62)",
                        fontSize: "clamp(12px,1.3vw,14px)",
                        lineHeight: 1.75,
                        margin: 0,
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            </AnimCard>
          ))}
        </div>

        {/* Closing question — same stat-card container style */}
        <AnimCard delay={1000}>
          <div
            className={"mt-10"}
            style={{
              background: "rgba(5,46,22,0.5)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(239,68,68,0.22)",
              borderRadius: "22px",
              padding: "20px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* corner glows matching hero blob style */}
            <div
              style={{
                position: "absolute",
                top: "-30%",
                right: "-10%",
                width: "280px",
                height: "280px",
                background:
                  "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-30%",
                left: "-10%",
                width: "240px",
                height: "240px",
                background:
                  "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  fontSize: "clamp(20px,3.5vw,38px)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.3,
                  margin: "0 0 6px",
                }}
              >
                আপনার সন্তানের জন্য কি আপনি
              </p>
              <p
                style={{
                  fontSize: "clamp(20px,3.5vw,38px)",
                  fontWeight: 900,
                  color: "#f87171",
                  lineHeight: 1.3,
                  margin: "0 0 24px",
                }}
              >
                সত্যিই এই ঝুঁকি নিতে চান?
              </p>
              {/* same divider used in hero gold-shimmer accent */}
              <div
                style={{
                  width: "64px",
                  height: "3px",
                  borderRadius: "100px",
                  margin: "0 auto",
                  background: "linear-gradient(90deg, #ef4444, #10b981)",
                }}
              />
            </div>
          </div>
        </AnimCard>
      </div>
    </section>
  );
}
