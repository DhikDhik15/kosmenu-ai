import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KosMenu AI",
  description: "AI meal planner untuk anak kos Indonesia",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
