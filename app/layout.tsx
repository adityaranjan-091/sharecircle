import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { UserProvider } from "@/components/UserProvider";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { auth } from "@/auth";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ShareCircle",
  description: "Peer-to-peer tool lending platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased min-h-screen flex flex-col`}
      >
        <UserProvider session={session}>
          <Navbar />
          <main className="flex-1 w-full mx-auto max-w-6xl px-4 py-6 sm:px-6">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
