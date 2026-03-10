"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { useGithubStars } from "@/hooks/use-github-star"
import { IconStarFilled } from "@tabler/icons-react"
import { ModeToggle } from "@/components/theme/theme-toggle"

const ease = [0.23, 1, 0.32, 1] as const

export const XIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        height="23"
        viewBox="0 0 1200 1227"
        fill="currentColor"
        width="23"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
    </svg>
)

export function Navbar() {
    const star = useGithubStars("piyushzingade", "dashboard")

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-screen-lg"
        >
            <nav className="flex h-14 items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-4 shadow-sm backdrop-blur-xl sm:px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-serif text-xl italic tracking-tight text-foreground transition-opacity hover:opacity-70"
                >
                    NexUI
                </Link>

                {/* Right actions */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="group gap-2 rounded-xl border border-border/50 text-foreground transition-all hover:border-amber-500/30 hover:bg-amber-500/5"
                    >
                        <Link
                            href="https://github.com/piyushzingade/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconStarFilled className="h-3.5 w-3.5 text-amber-500 transition-transform group-hover:scale-110" />
                            <span className="hidden font-medium sm:inline">
                                Star
                            </span>
                            <span className="text-muted-foreground tabular-nums">
                                {star.stargazersCount}
                            </span>
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-9 w-9 rounded-xl text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <Link
                            href="https://x.com/Zingadepiyush"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <XIcon className="h-3.5 w-3.5" />
                            <span className="sr-only">X / Twitter</span>
                        </Link>
                    </Button>

                    <ModeToggle />
                </div>
            </nav>
        </motion.header>
    )
}
