"use client";

import { MotionConfig } from "motion/react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
    return (
        <MotionConfig
            reducedMotion="user"
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
            {children}
        </MotionConfig>
    );
}
