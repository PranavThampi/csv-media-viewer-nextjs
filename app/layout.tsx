import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "CSV Media Viewer",
  description: "Web App to view media content from a CSV file",
  icons: "favicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
}
