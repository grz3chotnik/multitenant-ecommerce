import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toast } from "next/dist/next-devtools/dev-overlay/components/toast";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2004",
  description: "2004 ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
