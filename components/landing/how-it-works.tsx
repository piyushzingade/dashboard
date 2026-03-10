"use client"

import { motion } from "motion/react"

const ease = [0.23, 1, 0.32, 1] as const

const steps = [
    {
        number: "01",
        title: "Install",
        description: "Run one command to scaffold a complete dashboard project with all dependencies.",
        code: "npx nexui-dashboard my-app",
    },
    {
        number: "02",
        title: "Configure",
        description: "Add your database URL, OAuth credentials, and environment variables.",
        code: ".env  \u2192  DATABASE_URL, GOOGLE_CLIENT_ID",
    },
    {
        number: "03",
        title: "Deploy",
        description: "Push to Vercel, Netlify, or any Node.js host. You\u2019re live in minutes.",
        code: "git push origin main",
    },
] as const

export function HowItWorks() {
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
                        How it works
                    </p>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.06, ease }}
                    className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                >
                    Three steps
                    <br />
                    <span className="text-muted-foreground">to launch.</span>
                </motion.h2>

                {/* Steps */}
                <div className="mt-16 grid gap-6 sm:grid-cols-3">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.12,
                                ease,
                            }}
                            className="relative"
                        >
                            {/* Step number */}
                            <span className="font-mono text-5xl font-bold text-border/60 dark:text-border/40 select-none">
                                {step.number}
                            </span>

                            <h3 className="mt-4 font-heading text-lg font-semibold tracking-tight">
                                {step.title}
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {step.description}
                            </p>

                            {/* Code snippet */}
                            <div className="mt-4 rounded-lg border border-border/30 bg-secondary/40 px-3.5 py-2.5">
                                <code className="text-xs font-mono text-foreground/80">
                                    {step.code}
                                </code>
                            </div>

                            {/* Connector line (between steps, hidden on last) */}
                            {i < steps.length - 1 && (
                                <div className="absolute right-0 top-8 hidden h-px w-6 -translate-x-full bg-border/40 sm:block lg:w-8" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
