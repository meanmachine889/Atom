import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/top-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: " Dashboard",
  description: "A simple dashboard template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className={`flex h-screen dark`}>
          {/* <Sidebar /> */}
          <div className="w-full flex flex-1 flex-col">
            <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
              <TopNav />
            </header>
            <main className="flex-1 overflow-auto bg-white dark:bg-[#0F0F12]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
