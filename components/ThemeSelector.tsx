'use client';

import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useThemeConfig } from './active-theme';
import { useEffect, useState } from 'react';

type Theme = {
    displayName: string;
    light: Record<string, string>;
    dark: Record<string, string>;
};

export function ThemeSelector() {
    const { themeName, themeMode, setTheme } = useThemeConfig();
    const [themes, setThemes] = useState<Record<string, Theme> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/theme.json')
            .then((res) => res.json())
            .then((data) => {
                setThemes(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Failed to load themes:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading || !themes) {
        return (
            <div className='flex items-center gap-2'>
                <Label htmlFor='theme-selector' className='sr-only'>
                    Theme
                </Label>
                <div className='h-9 w-32 bg-muted animate-pulse rounded-md' />
            </div>
        );
    }

    const themeNames = Object.keys(themes);
    const selectedDisplay = themes[themeName]?.displayName || 'Select Theme';

    return (
        <div className='flex items-center gap-3'>
            <Label htmlFor='theme-selector' className='sr-only'>
                Theme
            </Label>
            <Select value={themeName} onValueChange={(value) => setTheme(value, themeMode)}>
                <SelectTrigger
                    id='theme-selector'
                    className='justify-between w-40'
                >
                    <span className='text-muted-foreground text-sm'>
                        Theme: {selectedDisplay}
                    </span>
                </SelectTrigger>
                <SelectContent align='end'>
                    <SelectGroup>
                        <SelectLabel>Themes</SelectLabel>
                        {themeNames.map((name) => (
                            <SelectItem key={name} value={name}>
                                {themes[name].displayName}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

        </div>
    );
}