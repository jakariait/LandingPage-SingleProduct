import GeneralInfoStore from "../store/GeneralInfoStore.js";
import ImageComponentWithCompression from "./componentGeneral/ImageComponentWithCompression.jsx";
import AnimCard from "./componentGeneral/AnimCard.jsx";

export default function Footer() {
  const { GeneralInfoList } = GeneralInfoStore();

  return (
    <div className="pt-10">
      <AnimCard delay={0}>
      <div style={{ textAlign: "center", padding: "0 28px" }}>
        {/* Logo / brand mark */}
        <div className={"flex items-center justify-center"}>
          <ImageComponentWithCompression
            imageName={GeneralInfoList?.PrimaryLogo}
            width={100}
            height={100}
            altName={GeneralInfoList?.CompanyName}
            skeletonHeight={20}
            loadingStrategy="lazy"
            fetchPriority="auto"
          />
        </div>

        <p
          style={{
            fontFamily: "'Noto Serif Bengali','Hind Siliguri',Georgia,serif",
            fontSize: "clamp(20px,2.5vw,26px)",
            fontWeight: 900,
            margin: "0 0 6px",
          }}
        >
          <span className="gold-shimmer">Nihan Super Foods</span>
        </p>

        <p
          style={{
            color: "rgba(167,243,208,0.65)",
            fontSize: "14px",
            margin: "0 0 28px",
            fontFamily: "'Hind Siliguri',sans-serif",
          }}
        >
          Thanks For Build Relation With Us ❤️
        </p>

        {/* Divider */}
        <div
          style={{
            width: "64px",
            height: "2px",
            borderRadius: "100px",
            margin: "0 auto 28px",
            background: "linear-gradient(90deg, #34d399, #fbbf24)",
          }}
        />

        {/* Social buttons */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://www.facebook.com/Nihansuperfood/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(5,150,105,0.18)",
              border: "1px solid rgba(52,211,153,0.28)",
              backdropFilter: "blur(10px)",
              color: "#d1fae5",
              padding: "11px 24px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#6ee7b7">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            Facebook
          </a>
          <a
            href="https://www.youtube.com/@NihanSuperFood"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(234,88,12,0.14)",
              border: "1px solid rgba(234,88,12,0.28)",
              backdropFilter: "blur(10px)",
              color: "#fed7aa",
              padding: "11px 24px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fb923c">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon
                fill="#064e3b"
                points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
              />
            </svg>
            YouTube
          </a>
        </div>

        {/* Bottom line */}
        <div
          style={{
            borderTop: "1px solid rgba(52,211,153,0.1)",
            paddingTop: "20px",
          }}
        >
          <p
            style={{
              color: "rgba(167,243,208,0.35)",
              fontSize: "12px",
              margin: 0,
              fontFamily: "'Hind Siliguri',sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            © 2026 Nihan Foods — সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </AnimCard>
    </div>
  );
}
