import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "IGUCHI SOFT TENNIS SCHOOL｜イグチソフトテニススクール";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * SNSでシェアされたときに表示されるOGP画像。
 * 日本語フォントを埋め込まずに済むよう、英字を中心にデザインしています。
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 88px",
          background:
            "linear-gradient(135deg, #071a32 0%, #0b2545 50%, #12325c 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#38bdf8",
            fontSize: 26,
            letterSpacing: 6,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              border: "4px solid #0ea5e9",
              display: "flex",
            }}
          />
          MIYAZAKI, JAPAN
        </div>

        <div
          style={{
            marginTop: 34,
            display: "flex",
            flexDirection: "column",
            color: "white",
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <div>IGUCHI SOFT</div>
          <div>TENNIS SCHOOL</div>
        </div>

        <div
          style={{
            marginTop: 36,
            color: "#adc7e6",
            fontSize: 30,
            letterSpacing: 2,
          }}
        >
          SOFT TENNIS LESSONS FOR EVERY LEVEL
        </div>

        <div
          style={{
            marginTop: 14,
            width: 140,
            height: 6,
            borderRadius: 99,
            background: "#0ea5e9",
            display: "flex",
          }}
        />
      </div>
    ),
    size,
  );
}
