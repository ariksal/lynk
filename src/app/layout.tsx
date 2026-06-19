import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito, Baloo_2, Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast";
import { ThemeApplier } from "@/components/ThemeApplier";

// Familias disponibles para personalizar tu página (display + cuerpo).
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"], weight: ["500", "600", "700"] });
const baloo = Baloo_2({ variable: "--font-baloo", subsets: ["latin"], weight: ["500", "600", "700"] });
const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["500", "600", "700"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
      className={`${fredoka.variable} ${baloo.variable} ${poppins.variable} ${nunito.variable} ${quicksand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeApplier />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
