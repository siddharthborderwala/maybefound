import type { Metadata } from "next";
import { Familjen_Grotesk, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Familjen_Grotesk({
  variable: "--font-familijen-grotesk",
  subsets: ["latin"],
});

const geistMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maybe Found",
  description: "Your 404 page should be smart",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased font-sans`}
      >
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: "font-sans",
            classNames: {
              toast: "!rounded-none !text-base min-h-[3.625rem]",
            },
          }}
        />
      </body>
    </html>
  );
}
