import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Around ME",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="main-darkContainer">
            <Header />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
