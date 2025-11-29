"use client"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useGithubStars } from "@/hooks/use-github-star"
import { IconBrandGithub, IconStarFilled } from "@tabler/icons-react"

export const XIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        height="23"
        viewBox="0 0 1200 1227"
        fill="currentColor"
        width="23"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"></path>
    </svg>
)

export function Navbar() {
    const { scrollY } = useScroll()
    const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(8px)"])
    const star = useGithubStars("piyushzingade", "dashboard")

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                backdropFilter: blur.get(),
            }}
            className="sticky top-3 z-50 w-full rounded-xl"
        >
            <div className="container mx-auto px-4 flex h-14 max-w-screen-2xl items-center justify-between">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center gap-3"
                >
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="rounded-md bg-linear-to-r from-primary to-accent p-1">
                            <div className="h-6 w-6 rounded-sm bg-background" />
                        </div>
                        <span className="font-bold text-xl hidden sm:inline-block text-gray-100">
                            NexUI
                        </span>
                    </Link>
                </motion.div>

                {/* Navigation */}
                <motion.nav
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="group hover:bg-neutral-800/60 hover:text-neutral-100 transition-colors border border-neutral-800"
                    >
                        <Link
                            href="https://github.com/piyushzingade/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-foreground"
                        >
                            <IconStarFilled className="h-4 w-4 text-[#e2b241] group-hover:scale-105 transition-transform" />

                            <span className="font-medium">
                                Star Project {" "}
                                <span className="ml-1 text-neutral-200 font-medium group-hover:text-neutral-300">
                                    {star.stargazersCount}
                                </span>
                            </span>
                        </Link>
                    </Button>


                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="hover:text-neutral-200 hover:bg-neutral-800"
                    >
                        <Link
                            href="https://x.com/Zingadepiyush"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center"
                        >
                            <XIcon className="h-4 w-4 text-gray-200" />
                            <span className="sr-only">X</span>
                        </Link>
                    </Button>
                </motion.nav>
            </div>
        </motion.header>
    )
}