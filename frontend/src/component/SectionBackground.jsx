// ─────────────────────────────────────────────
//  SectionBackground.jsx
//  Drop-in reusable background for every section
//  Usage:
//    <SectionBackground>
//      <YourContent />
//    </SectionBackground>
// ─────────────────────────────────────────────

export default function SectionBackground({ children, style = {} }) {
  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(145deg, #052e16 0%, #064e3b 35%, #065f46 60%, #047857 100%)",
      ...style,
    }}>

      <style>{`
        @keyframes sg-pulseGlow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.08)} }
        @keyframes sg-floatUp   { 0%,100%{transform:rotate(45deg) translateY(0)} 50%{transform:rotate(45deg) translateY(-12px)} }
        @keyframes sg-leafSway  { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        .sg-leaf  { animation: sg-leafSway 4s ease-in-out infinite; transform-origin: bottom center; }
        .sg-leaf2 { animation: sg-leafSway 5s ease-in-out infinite reverse; transform-origin: bottom center; }
      `}</style>

      {/* ── Ambient glow blobs ── */}
      <div style={{ position:"absolute", top:"-10%", right:"-5%", width:"500px", height:"500px", background:"radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 65%)", borderRadius:"50%", animation:"sg-pulseGlow 5s ease-in-out infinite", pointerEvents:"none", zIndex:1 }} />
      <div style={{ position:"absolute", bottom:"-15%", left:"-8%", width:"420px", height:"420px", background:"radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 65%)", borderRadius:"50%", animation:"sg-pulseGlow 6s ease-in-out infinite 1.5s", pointerEvents:"none", zIndex:1 }} />
      <div style={{ position:"absolute", top:"38%", left:"38%", width:"350px", height:"350px", background:"radial-gradient(circle, rgba(202,138,4,0.06) 0%, transparent 70%)", borderRadius:"50%", pointerEvents:"none", zIndex:1 }} />

      {/* ── Vertical decorative lines ── */}
      <div style={{ position:"absolute", top:0, right:"31%", width:"1px", height:"100%", background:"linear-gradient(to bottom, transparent, rgba(52,211,153,0.12), transparent)", pointerEvents:"none", zIndex:1 }} />
      <div style={{ position:"absolute", top:0, right:"33%", width:"1px", height:"100%", background:"linear-gradient(to bottom, transparent, rgba(52,211,153,0.06), transparent)", pointerEvents:"none", zIndex:1 }} />

      {/* ── Sugarcane SVG (right side) ── */}
      <div style={{ position:"absolute", right:"3%", bottom:0, height:"85%", display:"flex", alignItems:"flex-end", zIndex:2, opacity:0.13, pointerEvents:"none" }}>
        <svg width="210" height="580" viewBox="0 0 210 580" fill="none">
          <rect x="80" y="30" width="20" height="510" rx="10" fill="#4ade80"/>
          {[90,170,250,330,410,490].map((y,i)=>(<ellipse key={i} cx="90" cy={y} rx="15" ry="6" fill="#86efac"/>))}
          <path d="M80 110 C52 90 24 72 12 44"   stroke="#4ade80" strokeWidth="6" strokeLinecap="round" className="sg-leaf"/>
          <path d="M80 210 C48 188 20 182 6 158"  stroke="#4ade80" strokeWidth="5" strokeLinecap="round" className="sg-leaf2"/>
          <path d="M80 310 C54 288 32 278 16 254" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" className="sg-leaf"/>
          <path d="M80 410 C58 390 40 386 26 364" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" className="sg-leaf2"/>
          <path d="M100 150 C130 128 158 112 172 84"  stroke="#4ade80" strokeWidth="6" strokeLinecap="round" className="sg-leaf2"/>
          <path d="M100 250 C132 228 160 222 178 198" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" className="sg-leaf"/>
          <path d="M100 350 C130 330 158 324 176 302" stroke="#4ade80" strokeWidth="6" strokeLinecap="round" className="sg-leaf2"/>
          <path d="M100 450 C128 432 154 428 170 408" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" className="sg-leaf"/>
          <rect x="124" y="70" width="14" height="470" rx="7" fill="#34d399" opacity="0.55"/>
          {[130,200,275,355,435,510].map((y,i)=>(<ellipse key={i} cx="131" cy={y} rx="11" ry="5" fill="#6ee7b7" opacity="0.55"/>))}
          <path d="M124 175 C152 153 176 138 190 112" stroke="#34d399" strokeWidth="4" strokeLinecap="round" opacity="0.55" className="sg-leaf"/>
          <path d="M138 275 C162 255 184 248 198 226" stroke="#34d399" strokeWidth="4" strokeLinecap="round" opacity="0.55" className="sg-leaf2"/>
          <path d="M124 375 C100 354 78 346 64 324"  stroke="#34d399" strokeWidth="4" strokeLinecap="round" opacity="0.55" className="sg-leaf"/>
        </svg>
      </div>

      {/* ── Floating diamond particles ── */}
      {[
        { top:"8%",  left:"5%",  size:7, delay:"0s",  dur:"3.5s" },
        { top:"25%", left:"14%", size:4, delay:"1s",   dur:"4s"   },
        { top:"60%", left:"4%",  size:9, delay:"0.5s", dur:"5s"   },
        { top:"80%", left:"20%", size:5, delay:"1.5s", dur:"3.8s" },
        { top:"12%", left:"52%", size:6, delay:"0.8s", dur:"4.5s" },
        { top:"45%", left:"10%", size:4, delay:"2s",   dur:"4.2s" },
      ].map((c,i) => (
        <div key={i} style={{
          position:"absolute", top:c.top, left:c.left,
          width:c.size, height:c.size, zIndex:2,
          background:"rgba(167,243,208,0.3)", borderRadius:"2px",
          transform:"rotate(45deg)",
          animation:`sg-floatUp ${c.dur} ease-in-out infinite`,
          animationDelay:c.delay, pointerEvents:"none",
        }}/>
      ))}

      {/* ── Content slot ── */}
      <div style={{ position:"relative", zIndex:3 }}>
        {children}
      </div>
    </div>
  );
}