import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PrivyProvider from "@/components/PrivyProvider";
import Sidebar from "@/components/Sidebar";
import Nav from "@/components/Nav";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <PrivyProvider>
          <Nav />
          <div className="mt-20 flex">
            {/* sidebar logic: if loged in then show other wise display none */}
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
        </PrivyProvider>
      </body>
    </html>
  );
}
