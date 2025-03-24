import type { Metadata } from "next";

import "../globals.css";

import NavMenu from "@/components/nav-menu";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "QR Safe",
  description: "Generate safe QR codes for your audience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
      >
        <NavMenu />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
