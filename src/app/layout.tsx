import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";

// Display (títulos) — Fredoka: redonda, amistosa, juvenil.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Cuerpo / UI — Nunito: cálida y muy legible.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LYNK — encuentra dónde perteneces",
  description:
    "LYNK conecta a la juventud de la comunidad judía con tu tnuá, tu escuela y tus grupos. Encuentra a tu gente.",
  appleWebApp: {
    capable: true,
    title: "LYNK",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#1f87ad",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
