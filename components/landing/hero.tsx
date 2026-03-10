"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Copy, Check, ArrowRight, Sparkles } from "lucide-react"
import { IconBrandGithub } from "@tabler/icons-react"
import { motion } from "motion/react"

const CLI_COMMAND = "npx nexui-dashboard [project-name]"
const ease = [0.23, 1, 0.32, 1] as const

export function HeroSection() {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(CLI_COMMAND)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {}
    }

    return (
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pb-24 pt-28">
            {/* Animated background orbs */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="landing-orb-1 absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-amber-400/[0.07] blur-[100px] dark:bg-amber-500/[0.12]" />
                <div className="landing-orb-2 absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-sky-400/[0.06] blur-[100px] dark:bg-sky-500/[0.10]" />
                <div className="landing-orb-3 absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-rose-400/[0.04] blur-[80px] dark:bg-rose-500/[0.06]" />
            </div>

            {/* Subtle noise texture */}
            <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay dark:opacity-[0.06]" />

            <div className="relative z-10 mx-auto max-w-4xl space-y-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                >
                    <span className="badge-shine inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        Open Source Dashboard Kit
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    className="font-serif text-5xl italic leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
                >
                    Build dashboards,
                    <br />
                    <span className="text-muted-foreground">not boilerplate.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease }}
                    className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                    Production-ready admin dashboard in one command. Themes, auth,
                    charts, and more &mdash; pre-configured and ready to ship.
                </motion.p>

                {/* CLI Command Box */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease }}
                    className="mx-auto max-w-md"
                >
                    <button
                        onClick={copyToClipboard}
                        className="cli-glow group flex w-full items-center gap-3 rounded-2xl border border-border/40 bg-card/70 px-5 py-4 font-mono text-sm backdrop-blur-sm transition-all duration-200 hover:bg-card/90 active:scale-[0.98]"
                    >
                        <span className="select-none text-amber-500/80">$</span>
                        <span className="flex-1 truncate text-left text-foreground/90">
                            {CLI_COMMAND}
                        </span>
                        <span className="flex-shrink-0 text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                            {copied ? (
                                <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </span>
                    </button>
                    <p className="mt-2 text-center text-xs text-muted-foreground/70">
                        {copied ? "Copied to clipboard!" : "Click to copy the command"}
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Button asChild size="lg" className="gap-2 rounded-xl px-6">
                        <Link href="/dashboard/overview">
                            Open Dashboard
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="gap-2 rounded-xl border-border/50 px-6"
                    >
                        <Link
                            href="https://github.com/piyushzingade/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconBrandGithub className="h-4 w-4" />
                            View on GitHub
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
