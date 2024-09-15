"use client";

import { usePathname } from 'next/navigation';
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import ClientOnlySidebar from "@/components/ClientOnlySidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the pathname is /login or /signup
  const hasPadding = pathname !== '/login' && pathname !== '/signup';

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex",
          inter.className,
          {
            "debug-screens": process.env.NODE_ENV === "development"
          }
        )}
      >
        {/* Conditionally render sidebar */}
        <ClientOnlySidebar />
        {/* main page */}
        <div className={hasPadding ? "p-8 w-full" : "w-full"}>{children}</div>
      </body>
    </html>
  );
}
