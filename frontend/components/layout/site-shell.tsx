"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes where Navbar and Footer should be hidden
  // We hide on Dashboard (as requested) and Login (to preserve split-screen layout)
  const isHidden = pathname.startsWith("/dashboard") || pathname.startsWith("/login");

  if (isHidden) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
