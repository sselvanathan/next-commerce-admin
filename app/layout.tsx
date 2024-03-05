import type {Metadata} from "next";
import {Inter} from "next/font/google";

import {ModalProvider} from "@/providers/modal-provider";
import {ToasterProvider} from "@/providers/toast-provider";
import {ThemeProvider} from "@/providers/theme-provider";


import "./globals.css";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default async function RootLayout(
    {
      children,
    }: {
      children: React.ReactNode;
    }) {

  return (
      <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider/>
          <ModalProvider/>
          {children}
        </ThemeProvider>
      </body>
      </html>
  );
}
