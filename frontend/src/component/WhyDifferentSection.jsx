import { useEffect, useRef, useState } from "react";

function AnimCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const differentiators = [
  {
    icon: "🏺",
    title: "কম পরিশোধিত, স্বাভাবিক গঠন",
    desc: "রিফাইন্ড সাদা চিনি একাধিক ধাপে পরিশোধন ও ব্লিচিংয়ের মাধ্যমে সম্পূর্ণ সাদা করা হয়। আমাদের লাল চিনিতে আখের স্বাভাবিক বাদামি রং ও হালকা মোলাসেসের উপস্থিতি থাকে, যা স্বাদে গভীরতা আনে।",
    accent: "rgba(202,138,4,0.14)", border: "rgba(251,191,36,0.22)", iconBg: "rgba(202,138,4,0.18)",
  },
  {
    icon: "💎",
    title: "স্বাভাবিকভাবে কিছু খনিজ উপাদান থাকে",
    desc: "কম প্রসেসড হওয়ায় আখের রসে থাকা কিছু প্রাকৃতিক খনিজ উপাদান (যেমন আয়রন, ক্যালসিয়াম, পটাশিয়াম — সামান্য পরিমাণে) থেকে যেতে পারে। অতিরিক্ত পরিশোধিত চিনির তুলনায় এটি বেশি প্রাকৃতিক।",
    accent: "rgba(16,185,129,0.14)", border: "rgba(52,211,153,0.22)", iconBg: "rgba(16,185,129,0.18)",
  },
  {
    icon: "🔥",
    title: "ঐতিহ্যবাহী প্রস্তুত প্রক্রিয়া",
    desc: "গ্রাম থেকে সংগৃহীত আখের রস বড় কড়াইতে জ্বাল দিয়ে ঘন করা হয়। ধীরে ধীরে নেড়ে এবং সময় নিয়ে প্রস্তুত করা হয়। এই পদ্ধতি স্বাদ ও গন্ধে আলাদা বৈশিষ্ট্য তৈরি করে।",
    accent: "rgba(234,88,12,0.12)", border: "rgba(234,88,12,0.22)", iconBg: "rgba(234,88,12,0.16)",
  },
  {
    icon: "☕",
    title: "স্বাদে পার্থক্য আপনি নিজেই বুঝবেন",
    desc: "চায়ে ব্যবহার করলে হালকা ক্যারামেল ধরনের স্বাদ পাওয়া যায়। পিঠা বা মিষ্টিতে রঙ ও স্বাদে আলাদা গভীরতা আসে।",
    accent: "rgba(16,185,129,0.14)", border: "rgba(52,211,153,0.22)", iconBg: "rgba(16,185,129,0.18)",
  },
];

const comparison = [
  {
    label: "উৎপাদন প্রক্রিয়া",
    // icon: "⚙️",
    white: "একাধিক ধাপে পরিশোধিত, শিল্প কারখানায় দ্রুত উৎপাদন",
    red: "আখের রস জ্বাল দিয়ে ধীরে ধীরে ঘন করা, ঐতিহ্যবাহী পদ্ধতি",
  },
  {
    label: "রং ও গঠন",
    // icon: "🎨",
    white: "সম্পূর্ণ সাদা, প্রাকৃতিক রং নেই",
    red: "প্রাকৃতিক বাদামি রং, স্বাভাবিক texture থাকে",
  },
  {
    label: "স্বাদ ও ঘ্রাণ",
    // icon: "👃",
    white: "সরল মিষ্টতা, স্বাদের গভীরতা কম",
    red: "হালকা ক্যারামেল স্বাদ, চা ও পিঠায় গভীরতা",
  },
  {
    label: "প্রাকৃতিক উপাদান",
    // icon: "🌿",
    white: "প্রায় শূন্য খনিজ উপাদান",
    red: "কম প্রসেসড, কিছু প্রাকৃতিক খনিজ উপাদান থাকে",
  },
  {
    label: "উৎপাদনের ধরণ",
    // icon: "🏭",
    white: "বড় শিল্প কারখানা, মেশিন নির্ভর",
    red: "গ্রামীণ পরিবেশ, হাতে তৈরি ও যত্নশীল",
  },
  {
    label: "সংক্ষেপে",
    // icon: "⚡",
    white: "শুধুমাত্র মিষ্টতা",
    red: "স্বাদ + ঐতিহ্য + প্রাকৃতিক উপাদান",
  },
];

export default function WhyDifferentSection() {
  return (
    <section style={{
      fontFamily: "'Noto Serif Bengali', 'Hind Siliguri', Georgia, serif",
      position: "relative", overflow: "hidden", padding: "100px 0 80px",
      background: "linear-gradient(145deg, #052e16 0%, #064e3b 35%, #065f46 60%, #047857 100%)",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@400;600;700;900&family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes floatUp   { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(-12px)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.08)} }
        @keyframes shimmerGold { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes dotPulse  { 0%,100%{opacity:1;box-shadow:0 0 6px #34d399} 50%{opacity:0.5;box-shadow:0 0 14px #34d399} }
        @keyframes leafSway  { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes rowSlide  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

        .gold-shimmer {
          background: linear-gradient(90deg,#ca8a04,#fbbf24,#fde68a,#fbbf24,#ca8a04);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmerGold 2.5s linear infinite;
        }
        .diff-card { transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: default; }
        .diff-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(0,0,0,0.35) !important; }
        .cmp-row { transition: background 0.25s ease; }
        .cmp-row:hover { background: rgba(16,185,129,0.06) !important; }
        .cta-primary { transition: all 0.3s ease; }
        .cta-primary:hover { transform: translateY(-3px); box-shadow: 0 18px 44px rgba(180,83,9,0.5) !important; }
        .leaf  { animation: leafSway 4s ease-in-out infinite; transform-origin: bottom center; }
        .leaf2 { animation: leafSway 5s ease-in-out infinite reverse; transform-origin: bottom center; }
      `}</style>

      {/* BG blobs */}
      <div style={{ position:"absolute", top:"-10%", right:"-5%", width:"500px", height:"500px", background:"radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%)", borderRadius:"50%", animation:"pulseGlow 5s ease-in-out infinite", pointerEvents:"none", zIndex:1 }} />
      <div style={{ position:"absolute", bottom:"-15%", left:"-8%", width:"420px", height:"420px", background:"radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 65%)", borderRadius:"50%", animation:"pulseGlow 6s ease-in-out infinite 1.5s", pointerEvents:"none", zIndex:1 }} />
      <div style={{ position:"absolute", top:"35%", left:"38%", width:"350px", height:"350px", background:"radial-gradient(circle, rgba(202,138,4,0.06) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none", zIndex:1 }} />

      {/* Vertical lines */}
      <div style={{ position:"absolute", top:0, right:"31%", width:"1px", height:"100%", background:"linear-gradient(to bottom, transparent, rgba(52,211,153,0.12), transparent)", zIndex:1 }} />
      <div style={{ position:"absolute", top:0, right:"33%", width:"1px", height:"100%", background:"linear-gradient(to bottom, transparent, rgba(52,211,153,0.06), transparent)", zIndex:1 }} />

      {/* Sugarcane SVG */}
      <div style={{ position:"absolute", right:"3%", bottom:0, height:"85%", display:"flex", alignItems:"flex-end", zIndex:2, opacity:0.12, pointerEvents:"none" }}>
        <svg width="210" height="580" viewBox="0 0 210 580" fill="none">
          <rect x="80" y="30" width="20" height="510" rx="10" fill="#4ade80"/>
          {[90,170,250,330,410,490].map((y,i)=>(<ellipse key={i} cx="90" cy={y} rx="15" ry="6" fill="#86efac"/>))}
          <path d="M80 110 C52 90 24 72 12 44"   stroke="#4ade80" strokeWidth="6" strokeLinecap="round" className="leaf"/>
          <path d="M80 210 C48 188 20 182 6 158"  stroke="#4ade80" strokeWidth="5" strokeLinecap="round" className="leaf2"/>
          <path d="M80 310 C54 288 32 278 16 254" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" className="leaf"/>
          <path d="M80 410 C58 390 40 386 26 364" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" className="leaf2"/>
          <path d="M100 150 C130 128 158 112 172 84"  stroke="#4ade80" strokeWidth="6" strokeLinecap="round" className="leaf2"/>
          <path d="M100 250 C132 228 160 222 178 198" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" className="leaf"/>
          <path d="M100 350 C130 330 158 324 176 302" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" className="leaf2"/>
          <path d="M100 450 C128 432 154 428 170 408" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" className="leaf"/>
          <rect x="124" y="70" width="14" height="470" rx="7" fill="#34d399" opacity="0.55"/>
          {[130,200,275,355,435,510].map((y,i)=>(<ellipse key={i} cx="131" cy={y} rx="11" ry="5" fill="#6ee7b7" opacity="0.55"/>))}
          <path d="M124 175 C152 153 176 138 190 112" stroke="#34d399" strokeWidth="4" strokeLinecap="round" opacity="0.55" className="leaf"/>
          <path d="M138 275 C162 255 184 248 198 226" stroke="#34d399" strokeWidth="4" strokeLinecap="round" opacity="0.55" className="leaf2"/>
          <path d="M124 375 C100 354 78 346 64 324"  stroke="#34d399" strokeWidth="4" strokeLinecap="round" opacity="0.55" className="leaf"/>
        </svg>
      </div>

      {/* Floating particles */}
      {[
        {top:"8%",  left:"5%",  size:7, delay:"0s",  dur:"3.5s"},
        {top:"25%", left:"14%", size:4, delay:"1s",   dur:"4s"},
        {top:"60%", left:"4%",  size:9, delay:"0.5s", dur:"5s"},
        {top:"80%", left:"20%", size:5, delay:"1.5s", dur:"3.8s"},
        {top:"12%", left:"52%", size:6, delay:"0.8s", dur:"4.5s"},
        {top:"45%", left:"10%", size:4, delay:"2s",   dur:"4.2s"},
      ].map((c,i)=>(
        <div key={i} style={{ position:"absolute", top:c.top, left:c.left, width:c.size, height:c.size, zIndex:2, background:"rgba(167,243,208,0.3)", borderRadius:"2px", transform:"rotate(45deg)", animation:`floatUp ${c.dur} ease-in-out infinite`, animationDelay:c.delay, pointerEvents:"none" }}/>
      ))}

      {/* ══════════ CONTENT ══════════ */}
      <div style={{ position:"relative", zIndex:3, width:"100%", maxWidth:"1180px", margin:"0 auto", padding:"0 28px" }}>

        {/* Badge */}
        <AnimCard delay={0}>
          <div style={{ marginBottom:"28px" }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(16,185,129,0.12)", border:"1px solid rgba(52,211,153,0.25)", backdropFilter:"blur(8px)", padding:"8px 20px", borderRadius:"100px", fontSize:"13px", color:"#6ee7b7", letterSpacing:"0.06em" }}>
              <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#34d399", display:"inline-block", animation:"dotPulse 2s infinite" }}/>
              কেন আমাদের চিনি আলাদা
            </span>
          </div>
        </AnimCard>

        {/* Headline */}
        <AnimCard delay={100}>
          <div style={{ maxWidth:"820px", marginBottom:"16px" }}>
            <h2 style={{ fontSize:"clamp(28px,5.5vw,64px)", fontWeight:900, lineHeight:1.25, color:"#fff", margin:0 }}>
              শুধু স্বাদে নয়,{" "}
              <span className="gold-shimmer">প্রক্রিয়াতেও আলাদা</span>
            </h2>
          </div>
        </AnimCard>

        {/* Intro text */}
        <AnimCard delay={200}>
          <div style={{ maxWidth:"660px", marginBottom:"52px" }}>
            <p style={{ fontSize:"clamp(14px,1.7vw,17px)", color:"rgba(255,255,255,0.72)", lineHeight:1.85, margin:"0 0 10px" }}>
              আমাদের আখের লাল চিনি সাধারণ রিফাইন্ড সাদা চিনির মতো অতিরিক্ত পরিশোধিত নয়।
            </p>
            <p style={{ fontSize:"clamp(14px,1.7vw,17px)", color:"rgba(255,255,255,0.65)", lineHeight:1.85, margin:0 }}>
              এটি আখের রস জ্বাল দিয়ে ঘন করার মাধ্যমে ঐতিহ্যবাহী পদ্ধতিতে প্রস্তুত করা হয়। প্রসেসিং কম হওয়ায় এতে আখের স্বাভাবিক রং, গন্ধ ও স্বাদ বজায় থাকে।
            </p>
          </div>
        </AnimCard>

        {/* Why different cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(270px,1fr))", gap:"16px", marginBottom:"72px" }}>
          {differentiators.map((d,i)=>(
            <AnimCard key={i} delay={300 + i * 90}>
              <div className="diff-card" style={{ padding:"24px", borderRadius:"18px", height:"100%", background:d.accent, border:`1px solid ${d.border}`, backdropFilter:"blur(10px)" }}>
                <div style={{ width:"50px", height:"50px", borderRadius:"14px", background:d.iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", marginBottom:"16px" }}>
                  {d.icon}
                </div>
                <h3 style={{ color:"#fff", fontWeight:700, fontSize:"clamp(14px,1.5vw,16px)", lineHeight:1.4, margin:"0 0 10px" }}>
                  {d.title}
                </h3>
                <p style={{ color:"rgba(255,255,255,0.65)", fontSize:"clamp(12px,1.3vw,14px)", lineHeight:1.8, margin:0 }}>
                  {d.desc}
                </p>
              </div>
            </AnimCard>
          ))}
        </div>

        {/* Comparison Table */}
        <AnimCard delay={700}>
          <div style={{ marginBottom:"14px", display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"3px", height:"24px", borderRadius:"100px", background:"linear-gradient(to bottom, #34d399, #fbbf24)" }}/>
            <h3 style={{ color:"#fff", fontWeight:800, fontSize:"clamp(18px,2.5vw,26px)", margin:0 }}>
              তুলনা করে দেখুন
            </h3>
          </div>
        </AnimCard>

        <AnimCard delay={750}>
          <div style={{ background:"rgba(5,46,22,0.5)", backdropFilter:"blur(16px)", border:"1px solid rgba(52,211,153,0.14)", borderRadius:"20px", overflow:"hidden", marginBottom:"56px" }}>

            {/* Table header */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:"1px solid rgba(52,211,153,0.12)" }}>
              <div style={{ padding:"16px 22px", fontSize:"12px", color:"rgba(167,243,208,0.5)", letterSpacing:"0.08em" }}></div>
              <div style={{ padding:"16px 22px", textAlign:"center", borderLeft:"1px solid rgba(52,211,153,0.1)" }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"13px", fontWeight:700, color:"rgba(252,165,165,0.85)" }}>
                  <span style={{ width:"10px", height:"10px", borderRadius:"50%", background:"rgba(252,165,165,0.6)", display:"inline-block" }}/>
                  রিফাইন্ড সাদা চিনি
                </span>
              </div>
              <div style={{ padding:"16px 22px", textAlign:"center", borderLeft:"1px solid rgba(52,211,153,0.1)", background:"rgba(16,185,129,0.06)" }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", fontSize:"13px", fontWeight:700, color:"#6ee7b7" }}>
                  <span style={{ width:"10px", height:"10px", borderRadius:"50%", background:"#34d399", display:"inline-block", boxShadow:"0 0 6px #34d399" }}/>
                  আমাদের লাল চিনি
                </span>
              </div>
            </div>

            {/* Table rows */}
            {comparison.map((row, i) => (
              <div key={i} className="cmp-row" style={{
                display:"grid", gridTemplateColumns:"1fr 1fr 1fr",
                borderBottom: i < comparison.length - 1 ? "1px solid rgba(52,211,153,0.08)" : "none",
              }}>
                {/* Label */}
                <div style={{ padding:"18px 22px", display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ fontSize:"18px" }}>{row.icon}</span>
                  <span style={{ color:"rgba(255,255,255,0.8)", fontSize:"clamp(12px,1.4vw,14px)", fontWeight:600 }}>{row.label}</span>
                </div>
                {/* White sugar */}
                <div style={{ padding:"18px 22px", borderLeft:"1px solid rgba(52,211,153,0.08)", display:"flex", alignItems:"center" }}>
                  <span className={"text-red-400"} style={{  fontSize:"clamp(11px,1.3vw,13px)", lineHeight:1.65 }}>
                    ✗ &nbsp;{row.white}
                  </span>
                </div>
                {/* Red sugar */}
                <div style={{ padding:"18px 22px", borderLeft:"1px solid rgba(52,211,153,0.08)", display:"flex", alignItems:"center", background:"rgba(16,185,129,0.04)" }}>
                  <span style={{ color:"white", fontSize:"clamp(11px,1.3vw,13px)", lineHeight:1.65 }}>
                    ✔ &nbsp;{row.red}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimCard>

        {/* Final CTA block */}
        <AnimCard delay={900}>
          <div style={{ background:"rgba(5,46,22,0.5)", backdropFilter:"blur(16px)", border:"1px solid rgba(52,211,153,0.18)", borderRadius:"22px", padding:"48px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:"-30%", right:"-10%", width:"280px", height:"280px", background:"radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none" }}/>
            <div style={{ position:"absolute", bottom:"-30%", left:"-10%", width:"240px", height:"240px", background:"radial-gradient(circle, rgba(202,138,4,0.08) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none" }}/>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:"38px", marginBottom:"16px" }}>🌾</div>
              <p style={{ fontSize:"clamp(17px,2.5vw,26px)", fontWeight:700, color:"rgba(255,255,255,0.75)", lineHeight:1.5, margin:"0 0 8px" }}>
                আপনি শুধু মিষ্টি কিনছেন না —
              </p>
              <p style={{ fontSize:"clamp(19px,3vw,32px)", fontWeight:900, color:"#fff", lineHeight:1.3, margin:"0 0 28px" }}>
                আপনি বেছে নিচ্ছেন{" "}
                <span className="gold-shimmer">স্বাদ, ঐতিহ্য ও সচেতনতা</span>
              </p>
              <button className="cta-primary" style={{ background:"linear-gradient(135deg, #d97706 0%, #b45309 100%)", color:"#fff", border:"none", borderRadius:"14px", padding:"17px 48px", fontSize:"clamp(15px,1.9vw,18px)", fontFamily:"inherit", fontWeight:700, cursor:"pointer", boxShadow:"0 10px 35px rgba(180,83,9,0.4)", letterSpacing:"0.02em" }}>
                আজই প্রাকৃতিক লাল চিনি অর্ডার করুন →
              </button>
              <div style={{ width:"64px", height:"3px", borderRadius:"100px", margin:"28px auto 0", background:"linear-gradient(90deg, #34d399, #fbbf24)" }}/>
            </div>
          </div>
        </AnimCard>

      </div>
    </section>
  );
}