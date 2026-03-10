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
        <section className="px-4 pb-24 sm:pb-32">
            <div className="mx-auto max-w-5xl">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-12 text-center"
                >
                    <h2 className="font-serif text-3xl italic tracking-tight sm:text-4xl md:text-5xl">
                        See it in action.
                    </h2>
                </motion.div>

                {/* Browser chrome */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease }}
                    className="overflow-hidden rounded-2xl border border-border/40 bg-card/60 shadow-2xl shadow-black/[0.06] backdrop-blur-sm dark:shadow-black/[0.2] sm:rounded-3xl"
                >
                    {/* Title bar */}
                    <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
                        <div className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-xs text-muted-foreground/60">
                            dashboard.nexui.xyz
                        </span>
                        <div className="w-12" />
                    </div>

                    {/* Video */}
                    <div className="bg-secondary/30">
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
