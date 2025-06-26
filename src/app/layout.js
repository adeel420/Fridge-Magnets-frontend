"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/dashboard");
  const hideFooter = pathname.startsWith("/dashboard");

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <title>PHOTOFY</title>
        <link rel="icon" href="/favicon.jpeg" type="image/jpeg" />
      </head>
      <body className="antialiased font-poppins">
        {!hideHeader && <Header />}
        {children}
        {!hideFooter && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
