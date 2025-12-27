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
  metadataBase: new URL("https://dashboard.nexui.xyz"),
  title: "Dashboard",
  description: "A modern dashboard application",
  openGraph: {
    title: "Dashboard",
    description: "A modern dashboard application",
    url: "https://dashboard.nexui.xyz",
    siteName: "NexUI Dashboard",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard",
    description: "A modern dashboard application",
    images: ["/og.png"],
  },
};

let themes: Record<string, any> | null = null;
try {
  const themePath = path.join(process.cwd(), "public", "theme.json");
  const raw = fs.readFileSync(themePath, "utf8");
  themes = JSON.parse(raw);
} catch {
  themes = null;
}

function parseActiveTheme(cookieValue?: string) {
  if (!cookieValue)
    return { name: undefined, mode: undefined as undefined | "light" | "dark" };

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

  return `:root{${Object.entries(vars)
    .map(([k, v]) => `--${k}:${v};`)
    .join("")}}`;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();
  const activeThemeCookie = cookieStore.get("active_theme")?.value;

  const {
    name: htmlThemeName,
    mode: htmlThemeMode,
  } = parseActiveTheme(activeThemeCookie);

  const inlineVars = buildInlineVars(
    htmlThemeName,
    htmlThemeMode as "light" | "dark"
  );

  const initialBg =
    htmlThemeMode === "dark"
      ? "#020617"
      : "#f9fafb";

  return (
    <html
      lang="en"
      className={htmlThemeMode === "dark" ? "dark" : ""}
      data-theme={htmlThemeName ?? undefined}
      data-theme-mode={htmlThemeMode ?? undefined}
      data-theme-ready={htmlThemeMode ? "true" : undefined}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark light" />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var d = document.documentElement;
                  
                  // If SSR already set a theme mode, just ensure class + flag and bail.
                  var ssrMode = d.getAttribute('data-theme-mode');
                  var ssrName = d.getAttribute('data-theme');
                  if (ssrMode) {
                    if (ssrMode === 'dark') {
                      d.classList.add('dark');
                    } else {
                      d.classList.remove('dark');
                    }
                    if (ssrName) d.setAttribute('data-theme', ssrName);
                    d.setAttribute('data-theme-ready', 'true');
                    return;
                  }

                  // --- Fallback path (no SSR theme) ---
                  var cookieTheme = document.cookie
                    .split('; ')
                    .find(function(row){ return row.startsWith('active_theme='); })
                    ?.split('=')[1];

                  var localTheme = null;
                  try {
                    localTheme = window.localStorage.getItem('theme');
                  } catch (_) {}

                  var themeMode = null;
                  var themeName = null;

                  if (cookieTheme) {
                    var parts = cookieTheme.split('-');
                    themeName = parts[0];
                    themeMode = parts[1];
                  } else if (localTheme) {
                    themeMode = localTheme;
                  }

                  if (themeMode === 'dark') {
                    d.classList.add('dark');
                  } else {
                    d.classList.remove('dark');
                  }

                  if (themeName) {
                    d.setAttribute('data-theme', themeName);
                  }
                  if (themeMode) {
                    d.setAttribute('data-theme-mode', themeMode);
                  }

                  d.setAttribute('data-theme-ready', 'true');
                } catch (e) {
                  console.error('Theme init error:', e);
                }
              })();
            `,
          }}
        />

        {inlineVars ? (
          <style dangerouslySetInnerHTML={{ __html: inlineVars }} />
        ) : null}
      </head>
      <body
        className={`${inter.className} antialiased`}
        style={{ backgroundColor: initialBg }}
        suppressHydrationWarning
      >
        <AuthProvider session={session}>
          <Providers activeThemeValue={activeThemeCookie}>
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
