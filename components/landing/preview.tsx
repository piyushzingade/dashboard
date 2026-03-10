"use client"

import { useRef, useEffect } from "react"
import { motion } from "motion/react"

const ease = [0.23, 1, 0.32, 1] as const

export function Preview() {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        videoRef.current?.play().catch(() => {})
    }, [])

    return (
        <section className="px-6 pb-28 sm:pb-36">
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
                        Preview
                    </p>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.06, ease }}
                    className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                >
                    See it in action.
                </motion.h2>

                {/* Browser chrome */}
                <motion.div
                    initial={{ opacity: 0, y: 32, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    className="mt-12 overflow-hidden rounded-xl border border-border/30 bg-card/50 shadow-xl shadow-black/[0.04] dark:shadow-black/[0.15] sm:rounded-2xl"
                >
                    {/* Title bar */}
                    <div className="flex items-center justify-between border-b border-border/20 px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                            <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                            <span className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
                        </div>
                        <div className="rounded-md bg-secondary/60 px-3 py-0.5">
                            <span className="text-[11px] text-muted-foreground/50 font-mono">
                                dashboard.nexui.xyz
                            </span>
                        </div>
                        <div className="w-12" />
                    </div>

                    {/* Video */}
                    <div className="bg-secondary/20">
                        <video
                            ref={videoRef}
                            className="aspect-video w-full object-cover"
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
                </motion.div>
            </div>
        </section>
    )
}
