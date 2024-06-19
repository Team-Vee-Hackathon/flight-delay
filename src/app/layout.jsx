import { Inter } from "next/font/google";
import "./globals.css";
import AppContextProvider from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flight Insurance",
  description: "Purchase & Claim Flight Insurance with zkPass",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={inter.className}>
          {children}
        </body>
      </AppContextProvider>
    </html>
  );
}
