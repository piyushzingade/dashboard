"use client"

import { useEffect, useRef } from "react"
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
    const headerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const el = headerRef.current
        if (!el) return

        const handleScroll = () => {
            if (window.scrollY > 20) {
                el.setAttribute("data-scrolled", "true")
            } else {
                el.removeAttribute("data-scrolled")
            }
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.header
            ref={headerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease border-b border-transparent data-[scrolled]:border-border/30 data-[scrolled]:bg-background/80 data-[scrolled]:backdrop-blur-lg"
        >
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="font-heading text-lg font-bold tracking-tight text-foreground transition-opacity duration-150 hover:opacity-70 active:scale-[0.97]"
                >
                    NexUI
                </Link>

                {/* Right */}
                <div className="flex items-center gap-1">
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="nav-underline group gap-1.5 rounded-lg text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-transparent"
                    >
                        <Link
                            href="https://github.com/piyushzingade/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconStarFilled className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="hidden text-sm sm:inline">Star</span>
                            <span className="text-xs tabular-nums text-muted-foreground">
                                {star.stargazersCount}
                            </span>
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-9 w-9 rounded-lg text-muted-foreground transition-colors duration-150 hover:text-foreground hover:bg-transparent"
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
            </div>
        </motion.header>
    )
}
