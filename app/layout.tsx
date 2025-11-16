// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/session-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "@/components/layout/providers";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A modern dashboard application",
};

/**
 * Load theme.json from public/theme.json (server-side).
 * We load it at module initialization so we don't read it repeatedly per-request.
 * If your theme.json is in a different place, adjust themePath accordingly.
 */
let themes: Record<string, any> | null = null;
try {
  const themePath = path.join(process.cwd(), "public", "theme.json");
  const raw = fs.readFileSync(themePath, "utf8");
  themes = JSON.parse(raw);
} catch (e) {
  // If theme.json is not available, themes remains null — handle gracefully.
  // console.warn("Could not load theme.json:", e);
  themes = null;
}

function parseActiveTheme(cookieValue?: string) {
  if (!cookieValue) return { name: undefined, mode: undefined as undefined | "light" | "dark" };
  const parts = cookieValue.split("-");
  const name = parts[0] || undefined;
  const mode = parts[1] === "dark" ? "dark" : "light";
  return { name, mode };
}

function buildInlineVars(name?: string, mode?: "light" | "dark") {
  if (!name || !mode || !themes) return "";
  const themeObj = (themes as any)[name];
  if (!themeObj) return "";
  const vars = themeObj[mode];
  if (!vars) return "";
  // Only inline a reasonable set to keep HTML small; adjust as needed.
  return `:root{${Object.entries(vars).map(([k, v]) => `--${k}:${v};`).join("")}}`;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const activeThemeCookie = cookieStore.get("active_theme")?.value;
  const { name: htmlThemeName, mode: htmlThemeMode } = parseActiveTheme(activeThemeCookie);

  // Inline CSS variables for the chosen theme (applies at first paint)
  const inlineVars = buildInlineVars(htmlThemeName, htmlThemeMode as "light" | "dark");

  return (
    <html
      lang="en"
      data-theme={htmlThemeName ?? undefined}
      data-theme-mode={htmlThemeMode ?? undefined}
      suppressHydrationWarning
    >
      <head>
        {/* Inline the critical CSS variables for this theme so they exist at first paint */}
        {inlineVars ? <style dangerouslySetInnerHTML={{ __html: inlineVars }} /> : null}
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AuthProvider session={session}>
          {/* pass activeThemeValue down so client provider can reuse it */}
          <Providers activeThemeValue={activeThemeCookie}>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
