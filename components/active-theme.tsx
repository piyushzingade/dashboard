'use client';

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

const COOKIE_NAME = 'active_theme';
const DEFAULT_THEME = 'default';

function setThemeCookie(theme: string) {
    if (typeof window === 'undefined') return;

    document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === 'https:' ? 'Secure;' : ''}`;
}

type ThemeContextType = {
    activeTheme: string;
    setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
    children,
    initialTheme
}: {
    children: ReactNode;
    initialTheme?: string;
}) {
    const [activeTheme, setActiveTheme] = useState<string>(
        () => initialTheme || DEFAULT_THEME
    );

    useEffect(() => {
        setThemeCookie(activeTheme);

        // Tweakcn-style: set data-theme and inject CSS variables at runtime
        const root = document.documentElement;
        root.setAttribute('data-theme', activeTheme);

        const baseVars: Record<string, string> = {
            '--background': 'oklch(1 0 0)',
            '--foreground': 'oklch(0.145 0 0)',
            '--card': 'oklch(1 0 0)',
            '--card-foreground': 'oklch(0.145 0 0)',
            '--primary': 'oklch(0.205 0 0)',
            '--primary-foreground': 'oklch(0.985 0 0)'
        };

        const themes: Record<string, Record<string, string>> = {
            'default': {},
            'blue': {
                '--background': '#f8fdff',
                '--foreground': '#012e3d',
                '--card': '#ffffff',
                '--card-foreground': '#012e3d',
                '--primary': '#0ea5e9',
                '--primary-foreground': '#003049'
            },
            'green': {
                '--background': '#f6fffb',
                '--foreground': '#04251a',
                '--card': '#ffffff',
                '--card-foreground': '#04251a',
                '--primary': '#10b981',
                '--primary-foreground': '#00331a'
            },
            'amber': {
                '--background': '#fffaf0',
                '--foreground': '#33210b',
                '--card': '#ffffff',
                '--card-foreground': '#33210b',
                '--primary': '#f59e0b',
                '--primary-foreground': '#3b2709'
            },
            'mono-scaled': {
                '--font-mono': "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace"
            }
        };

        // compute base + theme overrides
        const name = activeTheme.replace(/-scaled$/, '');
        const themeVars = { ...(baseVars as Record<string, string>), ...(themes[name] || {}), ...(activeTheme.endsWith('-scaled') ? { '--radius': 'calc(var(--radius) + 4px)' } : {}) };

        Object.entries(themeVars).forEach(([k, v]) => {
            root.style.setProperty(k, v);
        });
    }, [activeTheme]);

    return (
        <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeConfig() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error(
            'useThemeConfig must be used within an ActiveThemeProvider'
        );
    }
    return context;
}