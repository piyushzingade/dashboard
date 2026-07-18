"use client"

import {
    Palette,
    ShieldCheck,
    BarChart3,
    Terminal,
    Search,
    GripVertical,
} from "lucide-react"
import { motion } from "motion/react"

const ease = [0.23, 1, 0.32, 1] as const

const features = [
    {
        icon: Palette,
        title: "6 Built-in Themes",
        description:
            "Switch between pre-built color themes with full light & dark mode support. One click, instant transformation.",
    },
    {
        icon: ShieldCheck,
        title: "Authentication",
        description:
            "Google OAuth and Cloudflare Turnstile captcha pre-configured. Secure sign-in from day one.",
    },
    {
        icon: BarChart3,
        title: "Data Visualization",
        description:
            "Beautiful, responsive charts powered by Recharts. Visualize data with bar, line, area, and pie charts.",
    },
    {
        icon: Terminal,
        title: "CLI Scaffolding",
        description:
            "Run one npx command and get a full project with routing, layouts, components, and database schema.",
    },
    {
        icon: Search,
        title: "Command Palette",
        description:
            "Press \u2318K to search pages, navigate, and trigger actions. Keyboard-first, instant access to everything.",
    },
    {
        icon: GripVertical,
        title: "Kanban Board",
        description:
            "Drag-and-drop task management with smooth DnD Kit integration. Organize workflows visually.",
    },
] as const

export function Features() {
    return (
        <section className="px-6 py-28 sm:py-36">
            <div className="mx-auto max-w-5xl">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, ease }}
                    className="mb-4"
                >
                    <p className="text-sm font-medium text-muted-foreground">
                        Features
                    </p>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.06, ease }}
                    className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                >
                    Everything you need.
                    <br />
                    <span className="text-muted-foreground">
                        Nothing you don&apos;t.
                    </span>
                </motion.h2>

                {/* Grid */}
                <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.45,
                                delay: i * 0.07,
                                ease,
                            }}
                            className="group rounded-xl border border-border bg-card p-6 transition-colors duration-150 hover:bg-accent/25"
                        >
                            <div
                                className="mb-5 inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground"
                            >
                                <feature.icon className="h-5 w-5 transition-transform duration-200 ease group-hover:scale-110" />
                            </div>

                            <h3 className="mb-1.5 font-heading text-[15px] font-semibold tracking-tight">
                                {feature.title}
                            </h3>

                            <p className="text-[13px] leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
