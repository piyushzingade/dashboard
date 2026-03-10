"use client"

import { useRef, useCallback } from "react"
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
        color: "text-violet-500",
        bg: "bg-violet-500/8 dark:bg-violet-500/12",
    },
    {
        icon: ShieldCheck,
        title: "Authentication",
        description:
            "Google OAuth and Cloudflare Turnstile captcha pre-configured. Secure sign-in from day one.",
        color: "text-emerald-500",
        bg: "bg-emerald-500/8 dark:bg-emerald-500/12",
    },
    {
        icon: BarChart3,
        title: "Data Visualization",
        description:
            "Beautiful, responsive charts powered by Recharts. Visualize data with bar, line, area, and pie charts.",
        color: "text-sky-500",
        bg: "bg-sky-500/8 dark:bg-sky-500/12",
    },
    {
        icon: Terminal,
        title: "CLI Scaffolding",
        description:
            "Run one npx command and get a full project with routing, layouts, components, and database schema.",
        color: "text-amber-500",
        bg: "bg-amber-500/8 dark:bg-amber-500/12",
    },
    {
        icon: Search,
        title: "Command Palette",
        description:
            "Press \u2318K to search pages, navigate, and trigger actions. Keyboard-first, instant access to everything.",
        color: "text-rose-500",
        bg: "bg-rose-500/8 dark:bg-rose-500/12",
    },
    {
        icon: GripVertical,
        title: "Kanban Board",
        description:
            "Drag-and-drop task management with smooth DnD Kit integration. Organize workflows visually.",
        color: "text-cyan-500",
        bg: "bg-cyan-500/8 dark:bg-cyan-500/12",
    },
] as const

// 3D tilt handler — manipulates DOM directly via event target, zero re-renders
function useTiltHandlers() {
    const isPointerDevice = useRef<boolean | null>(null)

    const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (isPointerDevice.current === null) {
            isPointerDevice.current = window.matchMedia(
                "(hover: hover) and (pointer: fine)"
            ).matches
        }
        if (!isPointerDevice.current) return

        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1.02)`
    }, [])

    const onMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.transform =
            "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)"
    }, [])

    return { onMouseMove, onMouseLeave }
}

export function Features() {
    const { onMouseMove, onMouseLeave } = useTiltHandlers()

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
                    <p className="text-sm font-medium tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
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
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                            className="tilt-card group rounded-2xl border border-border/30 bg-card/40 p-6 transition-[border-color,background-color,box-shadow] duration-200 ease hover:border-border/50 hover:bg-card/70 hover:shadow-lg hover:shadow-black/[0.02] dark:hover:shadow-black/[0.08]"
                        >
                            <div
                                className={`mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.bg} ${feature.color}`}
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
