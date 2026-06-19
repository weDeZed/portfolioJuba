'use client';

import './globals.css';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import FloatingDock from '@/app/components/FloatingDock';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body className="bg-gradient-to-b from-[#0A1828] via-[#0F1F2E] to-[#0A1828] text-white overflow-x-hidden">
        {/* Animated background elements */}
        <div className="fixed inset-0 -z-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-[#178582]/10 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-tr from-[#BFA181]/10 to-transparent rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-[#178582]/5 to-transparent rounded-full blur-3xl" />
          </div>
        </div>

        <Navbar />
        <main className="min-h-screen pt-20 relative z-10">
          {children}
        </main>
        <FloatingDock />
        <Footer />
      </body>
    </html>
  );
}
