"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith("/dashboard");
  const hideFooter = pathname.startsWith("/dashboard");

  return (
    <>
      {!hideHeader && <Header />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
