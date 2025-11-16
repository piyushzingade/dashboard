"use client";

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const COOKIE_NAME = "active_theme";

const FALLBACK_THEME = "default";
const FALLBACK_MODE: "light" | "dark" = "light";

function setThemeCookie(themeName: string, mode: string) {
    if (typeof window === "undefined") return;
    const value = `${themeName}-${mode}`;
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === "https:" ? "Secure;" : ""
        }`;
}

type ThemeContextType = {
    themeName: string;
    themeMode: "light" | "dark";
    setTheme: (themeName: string, mode?: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

async function loadThemes() {
    try {
        const response = await fetch("/theme.json");
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error("Failed to load themes:", error);
        return null;
    }
}

/** Does not overwrite CSS variables when isDefault = true */
function applyThemeVariables(
    themeName: string,
    mode: "light" | "dark",
    themesData: any,
    isDefault: boolean
) {
    const root = document.documentElement;
    root.setAttribute("data-theme", themeName);
    root.setAttribute("data-theme-mode", mode);

    // If this is the default (coming from global.css), don't inject theme.json variables.
    if (isDefault) return;

    if (!themesData || !themesData[themeName]) {
        console.warn(`Theme "${themeName}" not found in theme.json`);
        return;
    }
    const themeVars = themesData[themeName][mode];
    if (!themeVars) return;

    Object.entries(themeVars).forEach(([key, value]: [string, any]) => {
        const cssKey = `--${key}`;
        document.documentElement.style.setProperty(cssKey, value);
    });
}

/** Read current theme+mode from DOM (data attributes or computed CSS) */
function readThemeFromDOM(): { themeName: string; mode: "light" | "dark" } {
    if (typeof window === "undefined") {
        return { themeName: FALLBACK_THEME, mode: FALLBACK_MODE };
    }

    const root = document.documentElement;

    // 1) Prefer explicitly set attributes
    const attrTheme = root.getAttribute("data-theme");
    const attrMode = root.getAttribute("data-theme-mode") as
        | "light"
        | "dark"
        | null;

    if (attrTheme && (attrMode === "light" || attrMode === "dark")) {
        return { themeName: attrTheme, mode: attrMode };
    }

    // 2) If attrTheme exists but no mode, detect mode from prefers-color-scheme OR an attribute/class
    if (attrTheme) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const inferredMode = prefersDark ? "dark" : "light";
        return { themeName: attrTheme, mode: inferredMode };
    }


    try {
        const computed = getComputedStyle(root);
        const cssThemeName = computed.getPropertyValue("--theme-name").trim();
        if (cssThemeName) {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            return { themeName: cssThemeName, mode: prefersDark ? "dark" : "light" };
        }
    } catch {
        alert("Failed to read theme name from CSS variables. Falling back to default theme.");
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return { themeName: FALLBACK_THEME, mode: prefersDark ? "dark" : "light" };
}

export function ActiveThemeProvider({
    children,
    initialTheme
}: {
    children: ReactNode;
    initialTheme?: string;
}) {
    let initialName = FALLBACK_THEME;
    let initialMode: "light" | "dark" = FALLBACK_MODE;
    let initialIsDefault = true;
    if (initialTheme) {
        const parts = initialTheme.split("-");
        initialName = parts[0];
        if (parts.length === 2 && (parts[1] === "light" || parts[1] === "dark")) {
            initialMode = parts[1] as "light" | "dark";
        }
        initialIsDefault = false;
    }

    const [themeName, setThemeName] = useState<string>(initialName);
    const [themeMode, setThemeMode] = useState<"light" | "dark">(initialMode);
    const [themesData, setThemesData] = useState<any>(null);

    const [isUsingDefaultTheme, setIsUsingDefaultTheme] = useState<boolean>(initialIsDefault);

    // 1) On mount: read DOM (globals.css) and set the initial state immediately, but only if no initialTheme
    useEffect(() => {
        if (!initialTheme) {
            const dom = readThemeFromDOM();
            setThemeName(dom.themeName);
            setThemeMode(dom.mode);
            setIsUsingDefaultTheme(true);
        }
    }, [initialTheme]);

    // 2) Load themes.json asynchronously (but don't override DOM variables)
    useEffect(() => {
        let mounted = true;
        loadThemes().then((data) => {
            if (!mounted) return;
            setThemesData(data);

            // If user passed an initialTheme prop (e.g. cookie read on server or URL param),
            // prefer that and mark as user theme
            if (initialTheme) {
                const parts = initialTheme.split("-");
                let name = parts[0];
                let mode: "light" | "dark" = FALLBACK_MODE;
                if (parts.length === 2 && (parts[1] === "light" || parts[1] === "dark")) {
                    mode = parts[1] as "light" | "dark";
                } else {
                    // keep detected mode
                    mode = readThemeFromDOM().mode;
                }
                setThemeName(name);
                setThemeMode(mode);
                setIsUsingDefaultTheme(false);

                // If themesData contains this theme, apply it immediately
                if (data && data[name]) {
                    applyThemeVariables(name, mode, data, false);
                }
            } else {
                // If we are still using default (global css), make sure we don't overwrite it
                // (applyThemeVariables will early-return when isDefault=true)
                applyThemeVariables(themeName, themeMode, data, true);
            }
        });

        return () => {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialTheme]);

    // 3) When user changes theme (via setTheme), persist cookie and apply theme.json variables
    useEffect(() => {
        if (!themesData) {
            // If themes JSON not loaded yet, still set the cookie and attributes (so DOM reflects data-theme)
            setThemeCookie(themeName, themeMode);
            document.documentElement.setAttribute("data-theme", themeName);
            document.documentElement.setAttribute("data-theme-mode", themeMode);
            return;
        }

        setThemeCookie(themeName, themeMode);

        if (isUsingDefaultTheme) {
            // If still using default (globals.css), don't inject theme.json variables.
            // Just keep attributes in sync and avoid overwriting CSS variables.
            applyThemeVariables(themeName, themeMode, themesData, true);
        } else {
            // User explicitly picked a theme — we should inject variables from theme.json
            applyThemeVariables(themeName, themeMode, themesData, false);
        }
    }, [themeName, themeMode, themesData, isUsingDefaultTheme]);

    const setTheme = (newThemeName: string, mode: "light" | "dark" = themeMode) => {
        setThemeName(newThemeName);
        setThemeMode(mode);
        setIsUsingDefaultTheme(false); // user chose a theme -> not default anymore
    };

    return (
        <ThemeContext.Provider value={{ themeName, themeMode, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeConfig() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeConfig must be used within an ActiveThemeProvider");
    }
    return context;
}
