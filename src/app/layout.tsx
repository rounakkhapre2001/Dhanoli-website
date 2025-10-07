import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper"; // ✅ wrapper import

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GP-Dhanoli Website",
  description: "Official website for Takalghat, a local community initiative.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/" type="image/png" />
      </head>
      <body className={inter.className}>
      
          <LayoutWrapper>{children}</LayoutWrapper>

      </body>
    </html>
  );
}
