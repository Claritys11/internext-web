import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Internext — XI Internasional SMK Telkom Malang";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "#02040A",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(2, 4, 10, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234, 88, 12, 0.2) 0%, rgba(2, 4, 10, 0) 70%)",
          }}
        />

        {/* Top Header Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 20px",
              borderRadius: "9999px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.35)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#F59E0B",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#F59E0B",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              XI Internasional • SMK Telkom Malang
            </span>
          </div>
        </div>

        {/* Center Main Branding */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "92px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            INTERNEXT
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 400,
              color: "#94A3B8",
              letterSpacing: "0.02em",
            }}
          >
            Connected. Forward. Together.
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#64748B",
              maxWidth: "800px",
              marginTop: "8px",
              lineHeight: 1.4,
            }}
          >
            Portal portofolio, arsip karya inovatif, direktori 25 talenta digital, warta resmi, dan kolaborasi kelas berstandar modern.
          </div>
        </div>

        {/* Bottom Footer Info */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "28px" }}>
            <span style={{ color: "#E2E8F0", fontSize: "18px", fontWeight: 600 }}>25 Talenta</span>
            <span style={{ color: "#475569", fontSize: "18px" }}>•</span>
            <span style={{ color: "#E2E8F0", fontSize: "18px", fontWeight: 600 }}>24+ Proyek</span>
            <span style={{ color: "#475569", fontSize: "18px" }}>•</span>
            <span style={{ color: "#E2E8F0", fontSize: "18px", fontWeight: 600 }}>15 Prestasi</span>
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#F59E0B",
              letterSpacing: "0.05em",
            }}
          >
            internext.web.id
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
