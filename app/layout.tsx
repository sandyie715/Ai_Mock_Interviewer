import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Interview_Agent",
  description: "An AI-powered platform for first step interview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" >
      <body
        className={`${monaSans.className} antialiased pattern`}
      >
        {children}
      </body>
    </html>
  );
}
