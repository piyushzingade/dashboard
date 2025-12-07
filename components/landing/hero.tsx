"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Copy, Check, ArrowRight, Terminal } from "lucide-react"
import { Navbar } from "./navbar"
import { motion } from "motion/react"

const CLI_COMMAND = "npx nexui-dashboard [project-name]"

export function Hero() {
    const [copied, setCopied] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(CLI_COMMAND)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch { }
    }

    useEffect(() => {
        videoRef.current?.play().catch(() => { })
    }, [])

    return (
        <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
            <Navbar />

            {/* MAIN CONTENT */}
            <section className="flex-1">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 py-16 sm:px-6 lg:py-24">
                    {/* TEXT */}
                    <div className="max-w-3xl text-center space-y-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance"
                        >
                            Launch your dashboard in one command
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-muted-foreground text-base sm:text-lg leading-relaxed text-pretty"
                        >
                            A clean, production-ready dashboard generated instantly.
                            No setup, no boilerplate — just run the command and start building.
                        </motion.p>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex justify-center"
                        >
                            <Button asChild size="lg" className="gap-2">
                                <Link href="/dashboard/overview">
                                    Open Dashboard
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* CLI BOX */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="mx-auto max-w-lg space-y-2"
                        >
                            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
                                <div className="flex flex-1 items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary">
                                        <Terminal className="h-4 w-4 text-foreground" />
                                    </div>
                                    <code className="truncate text-sm font-mono">{CLI_COMMAND}</code>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={copyToClipboard}
                                    className="rounded-xl border border-border bg-secondary hover:bg-accent"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground text-center">
                                Copy the command to generate your dashboard instantly.
                            </p>
                        </motion.div>
                    </div>

                    {/* VIDEO */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.6 }}
                        className="relative flex justify-center w-full pb-10"
                    >
                        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl max-w-5xl w-full">
                            {/* top bar */}
                            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-600" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                                </div>
                                <span className="text-xs text-muted-foreground">Preview</span>
                            </div>

                            {/* video */}
                            <div className="bg-secondary h-[520px]">
                                <video
                                    ref={videoRef}
                                    className="h-full w-full object-cover"
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                >
                                    <source
                                        src="https://res.cloudinary.com/dbvotc5ja/video/upload/v1765101753/dashboard_w0olwl.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-border">
                <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground">
                    Made with <span className="mx-1">❤️</span> by{" "}
                    <Link
                        href="https://github.com/piyushzingade"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground hover:underline"
                    >
                        Piyush Zingade
                    </Link>
                </div>
            </footer>
        </div>
    )
}
