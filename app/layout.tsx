import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Midas Mission Control",
  description: "AI Agent Management Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0e17] text-gray-100">
        {children}
      </body>
    </html>
  );
}
