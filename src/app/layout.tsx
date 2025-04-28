import type { Metadata } from "next";
import { Inter, Pacifico, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({ subsets: ['latin'], weight: '400' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Vantela - Step Into Style, Run With Confidence",
  description: "Discover our latest collection of athletic and casual footwear. Engineered for performance, designed for style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
      </head>
      <body className={`${inter.className} ${pacifico.className} ${poppins.className} bg-white`}>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main> {/* Added main tag for semantic structure */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
