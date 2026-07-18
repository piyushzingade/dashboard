'use client';
import React from 'react';
import { ActiveThemeProvider } from '../active-theme';
import { MotionProvider } from '../motion-provider';

export default function Providers({
    activeThemeValue,
    children
}: {
    activeThemeValue?: string;
    children: React.ReactNode;
}) {

    return (
        <>
            <ActiveThemeProvider initialTheme={activeThemeValue}>
                <MotionProvider>{children}</MotionProvider>
            </ActiveThemeProvider>
        </>
    );
}
