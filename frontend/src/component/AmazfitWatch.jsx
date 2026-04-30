import React, { useEffect, useRef, useState } from "react";
import useProductStore from "../store/useProductStore.js";
import ProductGallery from "./componentGeneral/ProductGallery.jsx";
import SinglePageCheckout from "./componentGeneral/SinglePageCheckout.jsx";
import AnimCard from "./componentGeneral/AnimCard.jsx";

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────
const GlobalStyles = () => (
  <>
    <link
      href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>{`
      .amz-page { font-family: 'Hind Siliguri', sans-serif; background: #080c14; color: #fff; }

      @keyframes amzFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      @keyframes amzPulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.9;transform:scale(1.08)} }
      @keyframes amzShimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
      @keyframes amzRotate { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
      @keyframes amzDot { 0%,100%{opacity:1;box-shadow:0 0 6px #3b82f6} 50%{opacity:.4;box-shadow:0 0 14px #60a5fa} }
      @keyframes amzBlink { 0%,100%{opacity:1} 50%{opacity:.6} }

      .amz-gold {
        background: linear-gradient(90deg, #ca8a04, #fbbf24, #fde68a, #fbbf24, #ca8a04);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: amzShimmer 2.5s linear infinite;
      }
      .amz-blue {
        background: linear-gradient(90deg, #1d4ed8, #3b82f6, #93c5fd, #3b82f6, #1d4ed8);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: amzShimmer 3s linear infinite;
      }

      .amz-card { transition: transform .3s ease, box-shadow .3s ease; }
      .amz-card:hover { transform: translateY(-5px); }

      .amz-cta {
        transition: all .3s ease;
        position: relative;
        overflow: hidden;
      }
      .amz-cta::after {
        content:'';
        position:absolute;
        top:-50%; left:-60%;
        width:40%; height:200%;
        background: rgba(255,255,255,.15);
        transform: skewX(-20deg);
        transition: left .6s ease;
      }
      .amz-cta:hover::after { left:130%; }
      .amz-cta:hover { transform: translateY(-3px); box-shadow: 0 20px 50px rgba(59,130,246,.45) !important; }

      .amz-spec-row:nth-child(odd) { background: rgba(255,255,255,.03); }
      .amz-spec-row:hover { background: rgba(59,130,246,.08) !important; }
    `}</style>
  </>
);

// ─────────────────────────────────────────────
// SHARED BG BLOBS + PARTICLES
// ─────────────────────────────────────────────
const BgBlobs = ({ color1 = "#3b82f6", color2 = "#06b6d4" }) => (
  <>
    <div style={{ position:"absolute", top:"-10%", right:"-5%", width:"500px", height:"500px",
      background:`radial-gradient(circle, ${color1}22 0%, transparent 65%)`,
      borderRadius:"50%", animation:"amzPulse 5s ease-in-out infinite", pointerEvents:"none", zIndex:1 }} />
    <div style={{ position:"absolute", bottom:"-15%", left:"-8%", width:"420px", height:"420px",
      background:`radial-gradient(circle, ${color2}22 0%, transparent 65%)`,
      borderRadius:"50%", animation:"amzPulse 6s ease-in-out infinite 1.5s", pointerEvents:"none", zIndex:1 }} />
    <div style={{ position:"absolute", top:0, right:"31%", width:"1px", height:"100%",
      background:"linear-gradient(to bottom, transparent, rgba(59,130,246,.1), transparent)", zIndex:1 }} />
    {[
      { top:"10%", left:"6%", size:6, delay:"0s", dur:"3.5s" },
      { top:"30%", left:"15%", size:4, delay:"1s", dur:"4s" },
      { top:"65%", left:"5%", size:8, delay:".5s", dur:"5s" },
      { top:"80%", left:"20%", size:5, delay:"1.5s", dur:"3.8s" },
    ].map((c, i) => (
      <div key={i} style={{ position:"absolute", top:c.top, left:c.left,
        width:c.size, height:c.size, zIndex:2,
        background:"rgba(147,197,253,.25)", borderRadius:"2px",
        transform:"rotate(45deg)",
        animation:`amzFloat ${c.dur} ease-in-out infinite`,
        animationDelay:c.delay, pointerEvents:"none" }} />
    ))}
  </>
);

const SectionWrapper = ({ children, style = {}, id }) => (
  <section id={id} style={{ position:"relative", overflow:"hidden",
    background:"linear-gradient(160deg, #080c14 0%, #0d1526 40%, #0a1020 100%)",
    padding:"60px 0", ...style }}>
    {children}
  </section>
);

const Inner = ({ children }) => (
  <div style={{ position:"relative", zIndex:3, width:"100%",
    maxWidth:"1180px", margin:"0 auto", padding:"0 20px" }}>
    {children}
  </div>
);

const SectionBadge = ({ text, color = "#3b82f6" }) => (
  <div style={{ marginBottom:"24px" }}>
    <span style={{ display:"inline-flex", alignItems:"center", gap:"8px",
      background:`${color}1a`, border:`1px solid ${color}44`,
      backdropFilter:"blur(8px)", padding:"8px 20px", borderRadius:"100px",
      fontSize:"13px", color:"#93c5fd", letterSpacing:".06em" }}>
      <span style={{ width:"7px", height:"7px", borderRadius:"50%",
        background:color, display:"inline-block", animation:"amzDot 2s infinite" }} />
      {text}
    </span>
  </div>
);

// ─────────────────────────────────────────────
// 1. HERO SECTION
// ─────────────────────────────────────────────
const HeroSection = ({ product }) => {
  const price = product.finalDiscount > 0 ? product.finalDiscount : product.finalPrice;
  const originalPrice = product.finalPrice;
  const saving = originalPrice - price;

  return (
    <section style={{ position:"relative", overflow:"hidden", minHeight:"100vh",
      display:"flex", alignItems:"center",
      background:"linear-gradient(145deg, #020408 0%, #060d1f 40%, #0a1428 70%, #061020 100%)" }}>
      <BgBlobs />

      {/* Rotating ring decorations */}
      <div style={{ position:"absolute", top:"50%", right:"5%", transform:"translateY(-50%)",
        width:"500px", height:"500px", borderRadius:"50%",
        border:"1px solid rgba(59,130,246,.08)", pointerEvents:"none", zIndex:1,
        animation:"amzRotate 30s linear infinite" }} />
      <div style={{ position:"absolute", top:"50%", right:"5%", transform:"translateY(-50%)",
        width:"380px", height:"380px", borderRadius:"50%",
        border:"1px solid rgba(6,182,212,.06)", pointerEvents:"none", zIndex:1,
        animation:"amzRotate 20s linear infinite reverse" }} />

      <Inner>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          style={{ padding:"80px 0 60px" }}>

          {/* Left — Text */}
          <div>
            <AnimCard>
              <SectionBadge text="সীমিত সময়ের অফার — এখনই সুযোগ নিন!" color="#3b82f6" />
            </AnimCard>

            <AnimCard>
              <h1 style={{ fontSize:"clamp(30px,5.5vw,62px)", fontWeight:900,
                lineHeight:1.2, margin:"0 0 20px", color:"#fff" }}>
                আপনার কব্জিতে এখন<br />
                <span className="amz-blue">স্মার্ট প্রযুক্তি</span>{" "}
                <span style={{ color:"rgba(255,255,255,.75)" }}>ও স্টাইল!</span>
              </h1>
            </AnimCard>

            <AnimCard>
              <p style={{ fontSize:"clamp(15px,1.8vw,19px)", color:"rgba(147,197,253,.85)",
                lineHeight:1.75, margin:"0 0 32px", maxWidth:"520px" }}>
                Amazfit Pop 3R — AMOLED ডিসপ্লে, ব্লুটুথ কলিং, ২৪ ঘণ্টা হেলথ মনিটরিং
                এবং ১২ দিনের ব্যাটারি লাইফ সহ একটি অসাধারণ স্মার্টওয়াচ।
                স্বাস্থ্য ও সৌন্দর্য — দুটোই এক হাতে।
              </p>
            </AnimCard>

            {/* Price Block */}
            <AnimCard>
              <div style={{ background:"rgba(59,130,246,.08)", border:"1px solid rgba(59,130,246,.2)",
                borderRadius:"20px", padding:"24px 28px", marginBottom:"32px",
                backdropFilter:"blur(12px)", display:"inline-block" }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:"12px", flexWrap:"wrap" }}>
                  <span className="amz-gold" style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:900 }}>
                    ৳ {price?.toLocaleString()}
                  </span>
                  <span style={{ fontSize:"20px", color:"rgba(255,255,255,.35)",
                    textDecoration:"line-through" }}>
                    ৳ {originalPrice?.toLocaleString()}
                  </span>
                </div>
                {saving > 0 && (
                  <div style={{ marginTop:"6px" }}>
                    <span style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)",
                      borderRadius:"100px", padding:"4px 14px",
                      fontSize:"13px", color:"#f87171", fontWeight:600 }}>
                      ৳ {saving.toLocaleString()} সাশ্রয় করুন
                    </span>
                  </div>
                )}
                <div style={{ marginTop:"10px", fontSize:"13px", color:"rgba(147,197,253,.6)" }}>
                  ক্যাশ মূল্য · স্টক শেষ হওয়ার আগেই অর্ডার করুন
                </div>
              </div>
            </AnimCard>

            {/* CTA Buttons */}
            <AnimCard>
              <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
                <a href="#checkout" className="amz-cta" style={{
                  display:"inline-block",
                  background:"linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
                  color:"#fff", borderRadius:"14px",
                  padding:"17px 40px", fontSize:"clamp(15px,1.9vw,18px)",
                  fontWeight:700, cursor:"pointer", textDecoration:"none",
                  boxShadow:"0 10px 35px rgba(59,130,246,.4)", letterSpacing:".02em" }}>
                  এখনই অর্ডার করুন →
                </a>
                <a href="#features" style={{
                  display:"inline-block",
                  background:"rgba(59,130,246,.1)",
                  color:"#93c5fd", border:"1px solid rgba(59,130,246,.3)",
                  borderRadius:"14px", padding:"17px 32px",
                  fontSize:"clamp(15px,1.9vw,18px)", fontWeight:600,
                  cursor:"pointer", textDecoration:"none",
                  transition:"all .3s ease" }}>
                  ফিচার দেখুন
                </a>
              </div>
            </AnimCard>

            {/* Trust Pills */}
            <AnimCard>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", marginTop:"28px" }}>
                {["✅ অরিজিনাল পণ্য", "🚚 দ্রুত ডেলিভারি", "🔒 ৬ মাসের ওয়ারেন্টি", "💳 EMI সুবিধা"].map((t, i) => (
                  <span key={i} style={{ background:"rgba(255,255,255,.05)",
                    border:"1px solid rgba(255,255,255,.1)", borderRadius:"100px",
                    padding:"7px 16px", fontSize:"13px", color:"rgba(255,255,255,.75)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </AnimCard>
          </div>

          {/* Right — Watch SVG */}
          <AnimCard>
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center",
              position:"relative" }}>
              <div style={{ position:"absolute", width:"300px", height:"300px",
                borderRadius:"50%",
                background:"radial-gradient(circle, rgba(59,130,246,.25) 0%, transparent 70%)",
                animation:"amzPulse 4s ease-in-out infinite", pointerEvents:"none" }} />

              <svg viewBox="0 0 260 340" width="280"
                style={{ filter:"drop-shadow(0 0 40px rgba(59,130,246,.35))",
                  animation:"amzFloat 4s ease-in-out infinite" }}>
                {/* Strap top */}
                <rect x="95" y="10" width="70" height="55" rx="10" fill="#1e293b" />
                <rect x="100" y="15" width="60" height="45" rx="7" fill="#0f172a" />
                {[25,35,45].map(y => <rect key={y} x="103" y={y} width="54" height="2" rx="1" fill="rgba(255,255,255,.07)" />)}

                {/* Watch body */}
                <rect x="50" y="60" width="160" height="160" rx="40" fill="#1e293b" />
                <rect x="52" y="62" width="156" height="156" rx="38" fill="#0f172a" />
                <rect x="58" y="68" width="144" height="144" rx="34" fill="#1a2540" />

                {/* Screen */}
                <rect x="64" y="74" width="132" height="132" rx="30" fill="url(#amzScreenGrad)" />
                <defs>
                  <linearGradient id="amzScreenGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0d1b3e" />
                    <stop offset="100%" stopColor="#061028" />
                  </linearGradient>
                </defs>

                {/* Clock */}
                <text x="130" y="115" textAnchor="middle" fontSize="28" fontWeight="bold"
                  fill="#fff" fontFamily="monospace">10:30</text>
                <text x="130" y="133" textAnchor="middle" fontSize="9" fill="#94a3b8">
                  বৃহস্পতিবার, ৩০ এপ্রিল
                </text>

                {/* Health metrics */}
                <text x="130" y="155" textAnchor="middle" fontSize="9" fill="#f87171">❤ ৭৮ bpm</text>
                <rect x="80" y="163" width="100" height="4" rx="2" fill="rgba(255,255,255,.08)" />
                <rect x="80" y="163" width="62" height="4" rx="2" fill="#3b82f6" />
                <text x="80" y="178" fontSize="8" fill="#94a3b8">৬,২৪৩ ধাপ</text>
                <text x="180" y="178" textAnchor="end" fontSize="8" fill="#06b6d4">SpO₂ ৯৮%</text>
                <path d="M 90 191 Q 130 206 170 191" stroke="rgba(59,130,246,.3)"
                  strokeWidth="1.5" fill="none" strokeDasharray="3 3" />

                {/* Crown button */}
                <rect x="208" y="105" width="8" height="30" rx="4" fill="#334155" />
                <rect x="209" y="107" width="6" height="26" rx="3" fill="#1e293b" />

                {/* Strap bottom */}
                <rect x="95" y="220" width="70" height="60" rx="10" fill="#1e293b" />
                <rect x="100" y="225" width="60" height="50" rx="7" fill="#0f172a" />
                {[235,245,255,265].map(y => <rect key={y} x="103" y={y} width="54" height="2" rx="1" fill="rgba(255,255,255,.07)" />)}
                <rect x="115" y="272" width="30" height="5" rx="2.5" fill="#334155" />
                <circle cx="130" cy="274" r="3" fill="#475569" />

                {/* BT label */}
                <text x="130" y="304" textAnchor="middle" fontSize="12" fill="#3b82f6">📞 BT কলিং</text>
              </svg>
            </div>
          </AnimCard>
        </div>
      </Inner>
    </section>
  );
};

// ─────────────────────────────────────────────
// 2. PAIN POINTS
// ─────────────────────────────────────────────
const pains = [
  { icon:"📵", title:"গুরুত্বপূর্ণ কল মিস হয়",
    desc:"পকেটে ফোন না থাকলে বা সাইলেন্টে থাকলে জরুরি কল মিস হয়ে যায়। এটা প্রতিদিনের হতাশা।",
    accent:"rgba(239,68,68,.15)", border:"rgba(239,68,68,.3)" },
  { icon:"💔", title:"স্বাস্থ্য সম্পর্কে অজানা",
    desc:"হার্টবিট, অক্সিজেন লেভেল, স্ট্রেস — কিছুই জানেন না। অথচ এগুলো জানা আজকের সময়ে জরুরি।",
    accent:"rgba(234,88,12,.15)", border:"rgba(234,88,12,.3)" },
  { icon:"😴", title:"স্লিপ ট্র্যাক করার উপায় নেই",
    desc:"ঘুম কম হচ্ছে নাকি বেশি? গভীর ঘুম হচ্ছে কিনা? সাধারণ ঘড়ি বলতে পারে না।",
    accent:"rgba(168,85,247,.15)", border:"rgba(168,85,247,.3)" },
  { icon:"🏃", title:"ওয়ার্কআউট ট্র্যাক হয় না",
    desc:"কতটুকু হেঁটেছেন, কত ক্যালরি পোড়ালেন — এসব ডেটা ছাড়া ফিটনেস লক্ষ্যে পৌঁছানো কঠিন।",
    accent:"rgba(202,138,4,.15)", border:"rgba(202,138,4,.3)" },
  { icon:"😟", title:"স্টাইলে পিছিয়ে পড়ছেন",
    desc:"বন্ধুরা স্মার্টওয়াচ পরছে, আপনি পুরনো ঘড়িতে আটকে আছেন। কনফিডেন্স কমে যাচ্ছে।",
    accent:"rgba(6,182,212,.15)", border:"rgba(6,182,212,.3)" },
  { icon:"🔋", title:"বারবার চার্জের ঝামেলা",
    desc:"অনেক স্মার্টওয়াচে দৈনিক চার্জ দিতে হয় — ব্যস্ত জীবনে এটা বিরক্তির কারণ হয়।",
    accent:"rgba(239,68,68,.12)", border:"rgba(239,68,68,.25)" },
];

const PainSection = () => (
  <SectionWrapper>
    <BgBlobs color1="#ef4444" color2="#f97316" />
    <Inner>
      <AnimCard><SectionBadge text="সমস্যাগুলো চিনুন" color="#ef4444" /></AnimCard>
      <AnimCard>
        <h2 style={{ fontSize:"clamp(26px,5vw,56px)", fontWeight:900, lineHeight:1.25,
          color:"#fff", margin:"0 0 16px" }}>
          সাধারণ ঘড়িতে <span style={{ color:"#f87171" }}>কী কী মিস</span> করছেন?
        </h2>
      </AnimCard>
      <AnimCard>
        <p style={{ fontSize:"clamp(14px,1.7vw,18px)", color:"rgba(147,197,253,.8)",
          lineHeight:1.8, maxWidth:"640px", margin:"0 0 44px" }}>
          প্রতিদিন এই সমস্যাগুলো আপনার জীবনকে আরও কঠিন করে তুলছে।
          Amazfit Pop 3R দিয়ে এই সব সমস্যার সমাধান হাতের মুঠোয়।
        </p>
      </AnimCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pains.map((p, i) => (
          <AnimCard key={i}>
            <div className="amz-card" style={{ padding:"24px", borderRadius:"20px",
              background:p.accent, border:`1px solid ${p.border}`,
              backdropFilter:"blur(10px)", height:"100%" }}>
              <div style={{ fontSize:"32px", marginBottom:"12px" }}>{p.icon}</div>
              <h3 style={{ color:"#fff", fontWeight:700, fontSize:"clamp(14px,1.5vw,17px)",
                lineHeight:1.4, margin:"0 0 10px" }}>{p.title}</h3>
              <p style={{ color:"rgba(147,197,253,.65)", fontSize:"clamp(12px,1.3vw,14px)",
                lineHeight:1.75, margin:0 }}>{p.desc}</p>
            </div>
          </AnimCard>
        ))}
      </div>

      <AnimCard>
        <div style={{ marginTop:"48px", background:"rgba(6,10,20,.6)",
          backdropFilter:"blur(16px)", border:"1px solid rgba(239,68,68,.2)",
          borderRadius:"24px", padding:"32px 40px", textAlign:"center" }}>
          <p style={{ fontSize:"clamp(20px,3.5vw,38px)", fontWeight:900, color:"#fff",
            lineHeight:1.3, margin:"0 0 8px" }}>
            এই সমস্যাগুলোর সমাধান
          </p>
          <p style={{ fontSize:"clamp(20px,3.5vw,38px)", fontWeight:900,
            color:"#60a5fa", lineHeight:1.3, margin:"0 0 20px" }}>
            এখন মাত্র ৳ ৪,৮০০ টাকায়!
          </p>
          <div style={{ width:"64px", height:"3px", borderRadius:"100px",
            margin:"0 auto", background:"linear-gradient(90deg, #3b82f6, #06b6d4)" }} />
        </div>
      </AnimCard>
    </Inner>
  </SectionWrapper>
);

// ─────────────────────────────────────────────
// 3. FEATURES
// ─────────────────────────────────────────────
const features = [
  { icon:"📺", title:"HD AMOLED ডিসপ্লে", badge:"প্রিমিয়াম",
    desc:"সজীব রঙ, গভীর কালো এবং অত্যন্ত উজ্জ্বল স্ক্রিন — রোদেও স্পষ্ট দেখা যায়। প্রতিটি নোটিফিকেশন একনজরে পড়ুন।",
    color:"#3b82f6" },
  { icon:"📞", title:"ব্লুটুথ কলিং", badge:"জনপ্রিয়",
    desc:"ফোন পকেটে রেখেই সরাসরি ঘড়ি থেকে কল করুন বা রিসিভ করুন। Built-in মাইক ও স্পিকার দিয়ে হ্যান্ডস-ফ্রি কথা বলুন।",
    color:"#06b6d4" },
  { icon:"❤️", title:"২৪ ঘণ্টা হেলথ মনিটরিং", badge:"স্বাস্থ্য",
    desc:"হার্টরেট, SpO₂, স্ট্রেস লেভেল ও শ্বাস-প্রশ্বাস — সারাদিন ও রাতেও ট্র্যাক করে। আপনার স্বাস্থ্য সম্পর্কে সচেতন থাকুন।",
    color:"#ef4444" },
  { icon:"🏋️", title:"১০০+ স্পোর্টস মোড", badge:"ফিটনেস",
    desc:"দৌড়, সাইকেলিং, সাঁতার, যোগব্যায়াম সহ ১০০টিরও বেশি স্পোর্টস ট্র্যাক করে। প্রতিটি ওয়ার্কআউটের বিস্তারিত রিপোর্ট পান।",
    color:"#f97316" },
  { icon:"🎨", title:"১০০+ ওয়াচ ফেস", badge:"স্টাইল",
    desc:"আপনার মুড ও পোশাকের সাথে মিলিয়ে ওয়াচ ফেস বদলান। ক্লাসিক থেকে মডার্ন — সব স্টাইলে মানানসই।",
    color:"#8b5cf6" },
  { icon:"🔋", title:"১২ দিনের ব্যাটারি লাইফ", badge:"দীর্ঘস্থায়ী",
    desc:"একবার চার্জে টানা ১২ দিন চলে! বারবার চার্জ দেওয়ার ঝামেলা নেই। ভ্রমণে বা ব্যস্ত সময়েও নিশ্চিন্তে থাকুন।",
    color:"#10b981" },
  { icon:"💧", title:"IP68 ওয়াটার রেজিস্ট্যান্ট", badge:"টেকসই",
    desc:"বৃষ্টিতে ভিজুন, সাঁতার কাটুন — ঘড়ির কোনো ক্ষতি নেই। IP68 রেটিং মানে পানির নিচেও নিরাপদ।",
    color:"#0ea5e9" },
  { icon:"🤖", title:"AI ভয়েস অ্যাসিস্ট্যান্ট", badge:"স্মার্ট",
    desc:"ভয়েস কমান্ডে অ্যালার্ম সেট করুন, মেসেজ পড়ুন বা ওয়েদার জানুন। প্রযুক্তি এখন আরও স্মার্ট।",
    color:"#f59e0b" },
];

const FeaturesSection = () => (
  <SectionWrapper style={{ padding:"70px 0" }} id="features">
    <BgBlobs color1="#3b82f6" color2="#8b5cf6" />
    <Inner>
      <AnimCard><SectionBadge text="কেন Amazfit Pop 3R?" color="#3b82f6" /></AnimCard>
      <AnimCard>
        <h2 style={{ fontSize:"clamp(26px,5vw,56px)", fontWeight:900, lineHeight:1.25,
          color:"#fff", margin:"0 0 16px" }}>
          একটি ঘড়িতে <span className="amz-blue">সব ফিচার</span>
        </h2>
      </AnimCard>
      <AnimCard>
        <p style={{ fontSize:"clamp(14px,1.7vw,18px)", color:"rgba(147,197,253,.8)",
          lineHeight:1.8, maxWidth:"640px", margin:"0 0 50px" }}>
          Amazfit Pop 3R শুধু একটি ঘড়ি নয় — এটি আপনার ব্যক্তিগত স্বাস্থ্য সহকারী,
          স্টাইল আইকন এবং স্মার্ট কমিউনিকেশন ডিভাইস।
        </p>
      </AnimCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <AnimCard key={i}>
            <div className="amz-card" style={{ padding:"26px", borderRadius:"22px", height:"100%",
              background:`linear-gradient(135deg, ${f.color}12 0%, rgba(255,255,255,.03) 100%)`,
              border:`1px solid ${f.color}33`, backdropFilter:"blur(10px)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
                <div style={{ fontSize:"26px", width:"48px", height:"48px", borderRadius:"14px",
                  background:`${f.color}20`, display:"flex", alignItems:"center",
                  justifyContent:"center", flexShrink:0 }}>{f.icon}</div>
                <span style={{ background:`${f.color}25`, border:`1px solid ${f.color}44`,
                  borderRadius:"100px", padding:"3px 10px",
                  fontSize:"10px", color:f.color, fontWeight:600 }}>{f.badge}</span>
              </div>
              <h3 style={{ color:"#fff", fontWeight:700, fontSize:"clamp(14px,1.4vw,16px)",
                lineHeight:1.4, margin:"0 0 10px" }}>{f.title}</h3>
              <p style={{ color:"rgba(147,197,253,.65)", fontSize:"clamp(12px,1.2vw,13px)",
                lineHeight:1.75, margin:0 }}>{f.desc}</p>
            </div>
          </AnimCard>
        ))}
      </div>
    </Inner>
  </SectionWrapper>
);

// ─────────────────────────────────────────────
// 4. SPECS
// ─────────────────────────────────────────────
const specs = [
  ["ব্র্যান্ড", "Amazfit"],
  ["মডেল", "Pop 3R BT Calling Smart Watch"],
  ["ডিসপ্লে", "HD AMOLED"],
  ["রেজোলিউশন", "Android & iOS Pixel"],
  ["ডায়মেনশন", "45.5 × 45.5 × 10.8 mm"],
  ["ব্যাটারি", "300 mAh (১২ দিনের ব্যাটারি লাইফ)"],
  ["কানেক্টিভিটি", "Bluetooth 5.2 | Wi-Fi"],
  ["ওয়াটার রেজিস্ট্যান্স", "IP68"],
  ["সেন্সর", "অ্যাক্সেলেরোমিটার, হার্টরেট, 3-অ্যাক্সিস মোশন"],
  ["ওজন", "107g"],
  ["OS সাপোর্ট", "Android & iOS"],
  ["ওয়ারেন্টি", "৬ মাস / ১২ মাস (বিকল্প)"],
];

const SpecsSection = () => (
  <SectionWrapper style={{ padding:"70px 0",
    background:"linear-gradient(160deg, #060b18 0%, #0a1020 100%)" }}>
    <BgBlobs color1="#06b6d4" color2="#3b82f6" />
    <Inner>
      <AnimCard><SectionBadge text="টেকনিক্যাল স্পেসিফিকেশন" color="#06b6d4" /></AnimCard>
      <AnimCard>
        <h2 style={{ fontSize:"clamp(26px,5vw,52px)", fontWeight:900, lineHeight:1.25,
          color:"#fff", margin:"0 0 40px" }}>
          সম্পূর্ণ <span className="amz-blue">স্পেক শিট</span>
        </h2>
      </AnimCard>

      <AnimCard>
        <div style={{ background:"rgba(10,20,40,.7)", border:"1px solid rgba(59,130,246,.15)",
          borderRadius:"24px", overflow:"hidden", backdropFilter:"blur(16px)" }}>
          {specs.map(([label, value], i) => (
            <div key={i} className="amz-spec-row" style={{ display:"flex",
              alignItems:"center", padding:"16px 28px",
              borderBottom: i < specs.length - 1 ? "1px solid rgba(255,255,255,.05)" : "none",
              transition:"background .2s ease" }}>
              <span style={{ width:"45%", color:"rgba(147,197,253,.7)", fontSize:"14px",
                fontWeight:500, flexShrink:0 }}>{label}</span>
              <span style={{ color:"#fff", fontSize:"14px", fontWeight:600 }}>{value}</span>
            </div>
          ))}
        </div>
      </AnimCard>
    </Inner>
  </SectionWrapper>
);

// ─────────────────────────────────────────────
// 5. TESTIMONIALS
// ─────────────────────────────────────────────
const reviews = [
  { name:"রাহেলা বেগম", city:"ঢাকা", rating:5,
    text:"অসাধারণ ঘড়ি! ব্লুটুথ কলিং ফিচারটা সত্যিই দারুণ কাজ করে। বাজারের মধ্যে এত ভালো ঘড়ি এই দামে পাইনি। ব্যাটারিও অনেকদিন চলে।" },
  { name:"আরিফুল ইসলাম", city:"চট্টগ্রাম", rating:5,
    text:"AMOLED স্ক্রিন খুব ভালো। রোদে বাইরে গেলেও স্পষ্ট দেখা যায়। হার্টরেট মনিটরিং সঠিকভাবে কাজ করছে। দাম বিবেচনায় সেরা।" },
  { name:"সুমাইয়া খান", city:"সিলেট", rating:5,
    text:"১২ দিনের ব্যাটারি দেখে অবাক হয়েছি। সত্যিই ১০-১১ দিন চলে! স্পোর্টস মোড অনেক রয়েছে। আমার রানিং ট্র্যাক করার জন্য পারফেক্ট।" },
];

const TestimonialsSection = () => (
  <SectionWrapper style={{ padding:"70px 0" }}>
    <BgBlobs color1="#f59e0b" color2="#10b981" />
    <Inner>
      <AnimCard><SectionBadge text="কাস্টমার রিভিউ" color="#f59e0b" /></AnimCard>
      <AnimCard>
        <h2 style={{ fontSize:"clamp(26px,5vw,52px)", fontWeight:900, lineHeight:1.25,
          color:"#fff", margin:"0 0 16px" }}>
          তারা কী বলছেন <span className="amz-gold">আমাদের সম্পর্কে</span>
        </h2>
      </AnimCard>
      <AnimCard>
        <p style={{ fontSize:"clamp(14px,1.7vw,18px)", color:"rgba(147,197,253,.8)",
          lineHeight:1.8, maxWidth:"600px", margin:"0 0 44px" }}>
          হাজারো সন্তুষ্ট গ্রাহক Amazfit Pop 3R ব্যবহার করছেন সারা বাংলাদেশ জুড়ে।
        </p>
      </AnimCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <AnimCard key={i}>
            <div className="amz-card" style={{ padding:"28px", borderRadius:"22px",
              background:"rgba(15,23,42,.8)", border:"1px solid rgba(59,130,246,.15)",
              backdropFilter:"blur(12px)", height:"100%" }}>
              <div style={{ fontSize:"20px", marginBottom:"14px", color:"#fbbf24" }}>
                {"★".repeat(r.rating)}
              </div>
              <p style={{ color:"rgba(255,255,255,.85)", fontSize:"14px",
                lineHeight:1.85, margin:"0 0 20px", fontStyle:"italic" }}>
                "{r.text}"
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <div style={{ width:"38px", height:"38px", borderRadius:"50%",
                  background:"linear-gradient(135deg, #3b82f6, #06b6d4)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontWeight:700, color:"#fff", fontSize:"15px" }}>
                  {r.name[0]}
                </div>
                <div>
                  <div style={{ color:"#fff", fontWeight:600, fontSize:"14px" }}>{r.name}</div>
                  <div style={{ color:"rgba(147,197,253,.55)", fontSize:"12px" }}>{r.city}</div>
                </div>
                <span style={{ marginLeft:"auto", background:"rgba(16,185,129,.15)",
                  border:"1px solid rgba(16,185,129,.3)", borderRadius:"100px",
                  padding:"3px 10px", fontSize:"11px", color:"#34d399" }}>
                  ✓ যাচাইকৃত
                </span>
              </div>
            </div>
          </AnimCard>
        ))}
      </div>

      {/* Trust Stats Bar */}
      <AnimCard>
        <div style={{ marginTop:"48px", display:"flex", flexWrap:"wrap",
          justifyContent:"center", width:"100%", maxWidth:"700px", margin:"48px auto 0",
          background:"rgba(6,10,20,.6)", backdropFilter:"blur(16px)",
          border:"1px solid rgba(59,130,246,.15)", borderRadius:"20px", overflow:"hidden" }}>
          {[
            { num:"৫০০০+", label:"সন্তুষ্ট গ্রাহক", icon:"🙌" },
            { num:"৪.৮/৫", label:"গড় রেটিং", icon:"⭐" },
            { num:"৩-৫ দিন", label:"ডেলিভারি সময়", icon:"🚚" },
            { num:"৬-১২ মাস", label:"ওয়ারেন্টি", icon:"🔒" },
          ].map((s, i, arr) => (
            <div key={i} style={{ padding:"20px 10px", textAlign:"center",
              borderRight: i < arr.length - 1 ? "1px solid rgba(59,130,246,.1)" : "none",
              flex:"1 1 0", minWidth:"80px" }}>
              <div style={{ fontSize:"18px", marginBottom:"4px" }}>{s.icon}</div>
              <div style={{ fontSize:"clamp(15px,2.5vw,22px)", fontWeight:900,
                color:"#fbbf24", lineHeight:1 }}>{s.num}</div>
              <div style={{ fontSize:"10px", color:"rgba(147,197,253,.55)",
                marginTop:"4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </AnimCard>
    </Inner>
  </SectionWrapper>
);

// ─────────────────────────────────────────────
// 6. FINAL CTA
// ─────────────────────────────────────────────
const FinalCTA = ({ product }) => {
  const price = product.finalDiscount > 0 ? product.finalDiscount : product.finalPrice;
  return (
    <SectionWrapper style={{ padding:"60px 0",
      background:"linear-gradient(160deg, #051030 0%, #0a1428 50%, #051028 100%)" }}>
      <BgBlobs color1="#3b82f6" color2="#8b5cf6" />
      <Inner>
        <AnimCard>
          <div style={{ background:"rgba(59,130,246,.07)", border:"1px solid rgba(59,130,246,.2)",
            borderRadius:"28px", padding:"50px 40px", textAlign:"center",
            backdropFilter:"blur(16px)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-40%", right:"-10%",
              width:"350px", height:"350px", borderRadius:"50%",
              background:"radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)",
              pointerEvents:"none" }} />
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:"48px", marginBottom:"20px",
                animation:"amzFloat 3s ease-in-out infinite" }}>⌚</div>
              <h2 style={{ fontSize:"clamp(24px,4.5vw,50px)", fontWeight:900,
                color:"#fff", lineHeight:1.3, margin:"0 0 14px" }}>
                আজই আপনার Amazfit Pop 3R পান
              </h2>
              <p style={{ fontSize:"clamp(14px,1.7vw,18px)", color:"rgba(147,197,253,.8)",
                lineHeight:1.8, maxWidth:"560px", margin:"0 auto 28px" }}>
                সীমিত স্টক! এখনই অর্ডার করুন এবং ৩-৫ দিনের মধ্যে আপনার দরজায় পৌঁছে যাবে।
                ক্যাশ অন ডেলিভারি ও bKash পেমেন্ট সুবিধা উপলব্ধ।
              </p>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
                gap:"16px", flexWrap:"wrap", marginBottom:"28px" }}>
                <span className="amz-gold" style={{ fontSize:"clamp(30px,5vw,48px)", fontWeight:900 }}>
                  ৳ {price?.toLocaleString()}
                </span>
                <span style={{ background:"rgba(239,68,68,.15)", border:"1px solid rgba(239,68,68,.3)",
                  borderRadius:"100px", padding:"6px 18px",
                  fontSize:"14px", color:"#f87171", fontWeight:600,
                  animation:"amzBlink 2s ease-in-out infinite" }}>
                  স্টক সীমিত!
                </span>
              </div>
              <a href="#checkout" className="amz-cta" style={{ display:"inline-block",
                background:"linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #06b6d4 100%)",
                color:"#fff", borderRadius:"16px",
                padding:"18px 52px", fontSize:"clamp(16px,2vw,20px)",
                fontWeight:700, cursor:"pointer", textDecoration:"none",
                boxShadow:"0 12px 40px rgba(59,130,246,.45)" }}>
                এখনই অর্ডার করুন — ক্যাশ অন ডেলিভারি →
              </a>
              <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap",
                gap:"20px", marginTop:"24px" }}>
                {["🔒 নিরাপদ পেমেন্ট", "🚚 দ্রুত ডেলিভারি", "✅ অরিজিনাল পণ্য", "📞 সাপোর্ট সবসময়"].map((t, i) => (
                  <span key={i} style={{ color:"rgba(147,197,253,.65)", fontSize:"13px" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </AnimCard>
      </Inner>
    </SectionWrapper>
  );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
const SimpleFooter = () => (
  <footer style={{ background:"#020408", borderTop:"1px solid rgba(59,130,246,.1)",
    padding:"32px 20px", textAlign:"center" }}>
    <p style={{ color:"rgba(147,197,253,.4)", fontSize:"13px", margin:0 }}>
      © ২০২৬ Apple Gadgets · সর্বস্বত্ব সংরক্ষিত ·{" "}
      <a href="tel:09678148148" style={{ color:"#60a5fa", textDecoration:"none" }}>
        📞 09678148148
      </a>
    </p>
  </footer>
);

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
const AmazfitWatch = ({ id }) => {
  const hasPushedRef = useRef(false);
  const { fetchProductById, product, error, resetProduct } = useProductStore();
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    if (id !== currentProductId) {
      resetProduct();
      setCurrentProductId(id);
      fetchProductById(id);
    }
  }, [id, currentProductId, fetchProductById, resetProduct]);

  useEffect(() => {
    if (!product || hasPushedRef.current) return;
    const price = product.finalDiscount > 0 ? product.finalDiscount : product.finalPrice;
    const discount = product.finalDiscount > 0 ? product.finalPrice - product.finalDiscount : 0;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "BDT",
        value: price,
        items: [{ item_id: product._id, item_name: product.name,
          currency: "BDT", discount, item_variant: "Default", price, quantity: 1 }],
      },
    });
    hasPushedRef.current = true;
  }, [product]);

  if (error) return (
    <div className="text-red-500 flex items-center justify-center pt-40">
      Error: {error}
    </div>
  );

  if (!product) return null;

  return (
    <div className="amz-page">
      <GlobalStyles />

      <HeroSection product={product} />
      <PainSection />
      <FeaturesSection />
      <SpecsSection />
      <TestimonialsSection />

      {/* Product Gallery */}
      <SectionWrapper style={{ padding:"60px 0",
        background:"linear-gradient(160deg, #060b18 0%, #0a1020 100%)" }}>
        <BgBlobs />
        <Inner>
          <AnimCard><SectionBadge text="পণ্যের ছবি" color="#3b82f6" /></AnimCard>
          <AnimCard>
            <h2 style={{ fontSize:"clamp(24px,4vw,46px)", fontWeight:900,
              color:"#fff", margin:"0 0 32px" }}>
              সব দিক থেকে <span className="amz-blue">দেখুন</span>
            </h2>
          </AnimCard>
          <AnimCard>
            <div style={{ maxWidth:"700px", margin:"0 auto" }}>
              <ProductGallery images={product.images} productName={product.name} />
            </div>
          </AnimCard>
        </Inner>
      </SectionWrapper>

      <FinalCTA product={product} />

      {/* Checkout */}
      <div style={{ background:"linear-gradient(160deg, #060b18 0%, #080c14 100%)" }}>
        <SinglePageCheckout product={product} />
      </div>

      <SimpleFooter />
    </div>
  );
};

export default AmazfitWatch;
