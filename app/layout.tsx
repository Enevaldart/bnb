import React, { useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/app/ui/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SimbaHomes001",
  description: "Tours and comfort",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
