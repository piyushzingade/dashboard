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
        title: "6 Stunning Themes",
        description:
            "Pre-built color themes with light & dark mode. Switch between them instantly.",
        accent: "bg-violet-500/10 text-violet-500 dark:bg-violet-500/15",
    },
    {
        icon: ShieldCheck,
        title: "Auth Ready",
        description:
            "Google OAuth & Turnstile captcha baked in. Secure from the first deploy.",
        accent: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15",
    },
    {
        icon: BarChart3,
        title: "Rich Data Viz",
        description:
            "Beautiful, responsive charts powered by Recharts. Make data speak.",
        accent: "bg-sky-500/10 text-sky-500 dark:bg-sky-500/15",
    },
    {
        icon: Terminal,
        title: "One Command Setup",
        description:
            "Run npx nexui-dashboard and you're live. Zero config, zero boilerplate.",
        accent: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/15",
    },
    {
        icon: Search,
        title: "Command Palette",
        description:
            "Press \u2318K to search, navigate, and act instantly. Keyboard-first design.",
        accent: "bg-rose-500/10 text-rose-500 dark:bg-rose-500/15",
    },
    {
        icon: GripVertical,
        title: "Drag & Drop",
        description:
            "Kanban boards with smooth drag-and-drop. Organize workflows your way.",
        accent: "bg-cyan-500/10 text-cyan-500 dark:bg-cyan-500/15",
    },
] as const

export function Features() {
    return (
        <section className="relative px-4 py-24 sm:py-32">
            <div className="mx-auto max-w-5xl">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-16 text-center"
                >
                    <h2 className="font-serif text-3xl italic tracking-tight sm:text-4xl md:text-5xl">
                        Everything you need,
                        <br />
                        <span className="text-muted-foreground">nothing you don&apos;t.</span>
                    </h2>
                </motion.div>

                {/* Feature grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.08,
                                ease,
                            }}
                            className="group rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur-sm transition-all duration-200 hover:border-border/60 hover:bg-card/80 hover:shadow-lg hover:shadow-black/[0.03] dark:hover:shadow-black/[0.1]"
                        >
                            <div
                                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.accent} transition-transform duration-200 group-hover:scale-105`}
                            >
                                <feature.icon className="h-5 w-5" />
                            </div>
                            <h3 className="mb-2 text-base font-semibold tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
