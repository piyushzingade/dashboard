"use client";

import { Rocket, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const ease = [0.23, 1, 0.32, 1] as const;

export function UpdateSoon() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex max-w-sm flex-col items-center gap-6 text-center">
                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease }}
                    className="relative"
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                        <Rocket className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3, ease }}
                        className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-foreground"
                    >
                        <Sparkles className="h-3 w-3 text-background" />
                    </motion.div>
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.15, ease }}
                    className="space-y-2"
                >
                    <h2 className="font-heading text-xl font-bold tracking-tight">
                        Coming soon
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        We&apos;re building something great. This feature will
                        be available in an upcoming release.
                    </p>
                </motion.div>

                {/* Status pill */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, ease }}
                    className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    In development
                </motion.div>
            </div>
        </div>
    );
}
