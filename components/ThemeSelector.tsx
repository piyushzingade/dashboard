'use client';

import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useThemeConfig } from './active-theme';

const THEMES = [
    {
        name: 'Default',
        value: 'default'
    }, {
        name: 'Mauve',
        value: 'mauve'
    },
    {
        name: 'Amber',
        value: 'amber'
    },
    {
        name: 'Lilac',
        value: 'lilac'
    },
    {
        name: 'Candy',
        value: 'candy'
    },
    {
        name: 'Sky',
        value: 'sky'
    }
];


export function ThemeSelector() {
    const { activeTheme, setActiveTheme } = useThemeConfig();

    return (
        <div className='flex items-center gap-2'>
            <Label htmlFor='theme-selector' className='sr-only'>
                Theme
            </Label>
            <Select value={activeTheme} onValueChange={setActiveTheme}>
                <SelectTrigger
                    id='theme-selector'
                    className='justify-start *:data-[slot=select-value]:w-12'
                >
                    <span className='text-muted-foreground hidden sm:block'>
                        Select a theme:
                    </span>
                    <span className='text-muted-foreground block sm:hidden'>Theme</span>
                    <SelectValue placeholder='Select a theme' />
                </SelectTrigger>
                <SelectContent align='end'>
                    <SelectGroup>
                        <SelectLabel>Themes</SelectLabel>
                        {THEMES.map((theme) => (
                            <SelectItem key={theme.name} value={theme.value}>
                                {theme.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>

                </SelectContent>
            </Select>
        </div>
    );
}