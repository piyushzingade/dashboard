"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Copy, Check, ArrowRight } from "lucide-react"
import { IconBrandGithub } from "@tabler/icons-react"
import { motion } from "motion/react"

const CLI_COMMAND = "npx nexui-dashboard my-app"
const ease = [0.23, 1, 0.32, 1] as const

export function HeroSection() {
    const [copied, setCopied] = useState(false)
    const heroRef = useRef<HTMLElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const typingRef = useRef<HTMLSpanElement>(null)
    const magneticRef = useRef<HTMLDivElement>(null)

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText("npx nexui-dashboard [project-name]")
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {}
    }, [])

    // Typing animation — ref-based, zero re-renders
    useEffect(() => {
        const el = typingRef.current
        if (!el) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.textContent = CLI_COMMAND
            return
        }

        let i = 0
        let timeoutId: ReturnType<typeof setTimeout>

        const type = () => {
            if (i <= CLI_COMMAND.length) {
                el.textContent = CLI_COMMAND.slice(0, i)
                i++
                timeoutId = setTimeout(type, 40 + Math.random() * 50)
            }
        }

        timeoutId = setTimeout(type, 900)
        return () => clearTimeout(timeoutId)
    }, [])

    // Cursor-following glow — ref-based, passive listener, pointer-device only
    useEffect(() => {
        const hero = heroRef.current
        const glow = glowRef.current
        if (!hero || !glow) return
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const handleMove = (e: MouseEvent) => {
            const rect = hero.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, oklch(0.72 0.17 162 / 0.06), transparent 60%)`
        }

        hero.addEventListener("mousemove", handleMove, { passive: true })
        return () => hero.removeEventListener("mousemove", handleMove)
    }, [])

    // Magnetic button — ref-based, pointer-device only
    useEffect(() => {
        const el = magneticRef.current
        if (!el) return
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect()
            const x = e.clientX - rect.left - rect.width / 2
            const y = e.clientY - rect.top - rect.height / 2
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
        }

        const handleLeave = () => {
            el.style.transform = "translate(0, 0)"
        }

        el.addEventListener("mousemove", handleMove, { passive: true })
        el.addEventListener("mouseleave", handleLeave)
        return () => {
            el.removeEventListener("mousemove", handleMove)
            el.removeEventListener("mouseleave", handleLeave)
        }
    }, [])

    return (
        <section
            ref={heroRef}
            className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-20 pt-28"
        >
            {/* Cursor glow layer */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute inset-0 -z-10"
            />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
                {/* Overline */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="mb-6 text-sm font-medium tracking-widest uppercase text-emerald-600 dark:text-emerald-400"
                >
                    Open-source dashboard kit
                </motion.p>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08, ease }}
                    className="font-heading text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
                >
                    Ship dashboards,
                    <br />
                    <span className="text-muted-foreground">not configs.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.16, ease }}
                    className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                    A production-ready admin dashboard scaffolded in one command.
                    Auth, charts, themes, kanban&nbsp;&mdash; all&nbsp;wired&nbsp;up.
                </motion.p>

                {/* CLI box with typing + copy */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.24, ease }}
                    className="mx-auto mt-10 max-w-sm"
                >
                    <button
                        onClick={copyToClipboard}
                        className="group flex w-full items-center gap-3 rounded-xl border border-border/50 bg-card/80 px-5 py-3.5 font-mono text-sm transition-all duration-200 ease hover:border-emerald-500/30 hover:shadow-[0_0_24px_-6px_oklch(0.72_0.17_162/0.12)] active:scale-[0.98]"
                    >
                        <span className="select-none text-emerald-500">$</span>
                        <span className="flex-1 truncate text-left text-foreground/90">
                            <span ref={typingRef} />
                            <span className="typing-cursor ml-px text-emerald-500/70">|</span>
                        </span>
                        <span className="flex-shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                            {copied ? (
                                <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </span>
                    </button>
                    <p className="mt-2 text-center text-xs text-muted-foreground/60">
                        {copied ? "Copied!" : "Click to copy"}
                    </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.32, ease }}
                    className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                    <div ref={magneticRef} className="magnetic-wrap inline-block">
                        <Button
                            asChild
                            size="lg"
                            className="gap-2 rounded-xl bg-emerald-600 px-6 text-white hover:bg-emerald-700 active:scale-[0.97] dark:bg-emerald-500 dark:hover:bg-emerald-600"
                        >
                            <Link href="/dashboard/overview">
                                Live Demo
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2 rounded-xl border-border/50 px-6 active:scale-[0.97]"
                    >
                        <Link
                            href="https://github.com/piyushzingade/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconBrandGithub className="h-4 w-4" />
                            Source Code
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
