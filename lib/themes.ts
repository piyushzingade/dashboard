
export type ThemeMode = 'light' | 'dark';

export interface ThemeVariables {
    [key: string]: string;
}

export interface Theme {
    displayName: string;
    light: ThemeVariables;
    dark: ThemeVariables;
}

export interface ThemesData {
    [key: string]: Theme;
}

/**
 * Helper function to convert theme variables to CSS custom properties
 * @param themeVars Object with variable names as keys and values
 * @returns Record with CSS custom property format (--key: value)
 */
export function getCSSVariables(vars: ThemeVariables): Record<string, string> {
    const cssVars: Record<string, string> = {};
    Object.entries(vars).forEach(([key, value]) => {
        const cssKey = `--${key}`;
        cssVars[cssKey] = value;
    });
    return cssVars;
}
