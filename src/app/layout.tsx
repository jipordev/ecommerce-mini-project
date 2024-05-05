
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import FooterComponent from "@/components/footer/FooterComponent";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import {Suspense} from "react";
import Loading from "@/app/(user)/loading";
import Error from "@/app/(user)/error";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chh1p Ecommerce",
  description: "Modern Ecommerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <header className='sticky top-0'>
            <NavbarComponent/>
          </header>
          <ErrorBoundary errorComponent={Error}>
            <Suspense fallback={<Loading/>}>{children}</Suspense>
          </ErrorBoundary>
          <footer>
            <FooterComponent/>
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
