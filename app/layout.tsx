
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/session-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { KBarProvider } from "kbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A modern dashboard application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AuthProvider session={session}>
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
