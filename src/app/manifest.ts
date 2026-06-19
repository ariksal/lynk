import type { MetadataRoute } from "next";

// Makes LYNK an installable PWA — "Add to Home Screen" launches it fullscreen,
// no browser chrome, which is a big part of feeling like a real app.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LYNK — find where you belong",
    short_name: "LYNK",
    description:
      "Find your people. Communities, groups, and causes that match who you are.",
    start_url: "/feed",
    display: "standalone",
    background_color: "#f0f4f7",
    theme_color: "#1f87ad",
    orientation: "portrait",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
