import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import QueryProvider from "@/provider/query-provider";

import Footer from "@/components/shared/footer/page";
import Header from "@/components/shared/header/page";
import { Toaster } from "@/components/ui/sonner";

const outfitFont = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoalsBuddy",
  description: "AI-Powered Learning Matchmaker",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { has } = await auth();
  const isPro = has({ plan: "pro_plan" });

  return (
    <ClerkProvider>
      <html data-scroll-behavior="smooth" lang="en">
        <body className={`${outfitFont.className} antialiased`}>
          <QueryProvider>
            <Header isPro={isPro} />
            {children}
            <Footer />
          </QueryProvider>
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
