import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buck",
  description: "Created with v0",
  icons: "../public/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
