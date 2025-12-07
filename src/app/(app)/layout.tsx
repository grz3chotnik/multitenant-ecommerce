import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";

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
        <div>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}
