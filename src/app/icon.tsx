import { ImageResponse } from "next/og";

// Generated app icon (favicon + PWA install icon): the LYNK monogram on the
// brand gradient. Keeps a single source of truth for the mark.
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1f87ad 0%, #186e8e 100%)",
          color: "white",
          fontSize: 230,
          fontWeight: 800,
          letterSpacing: -10,
          fontFamily: "sans-serif",
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}
