'use client';

import { Moon, Sun } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { useThemeConfig } from '@/components/active-theme';

export function ModeToggle() {
    const { themeName, themeMode, setTheme } = useThemeConfig();

    const handleThemeToggle = React.useCallback(
        (e?: React.MouseEvent) => {
            const newMode = themeMode === 'dark' ? 'light' : 'dark';
            const root = document.documentElement;

            if (!document.startViewTransition) {
                setTheme(themeName, newMode);
                return;
            }

            // Set coordinates from the click event
            if (e) {
                root.style.setProperty('--x', `${e.clientX}px`);
                root.style.setProperty('--y', `${e.clientY}px`);
            }

            document.startViewTransition(() => {
                setTheme(themeName, newMode);
            });
        },
        [themeName, themeMode, setTheme]
    );

    return (
        <Button
            variant='secondary'
            size='icon'
            className='group/toggle size-8'
            onClick={handleThemeToggle}
            title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
        >
            {themeMode === 'dark' ? (
                <Sun className='w-4 h-4' />
            ) : (
                <Moon className='w-4 h-4' />
            )}
            <span className='sr-only'>Toggle theme</span>
        </Button>
    );
}