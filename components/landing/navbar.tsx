"use client"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useGithubStars } from "@/hooks/use-github-star"
import { IconBrandGithub, IconStarFilled } from "@tabler/icons-react"
import { ModeToggle } from "@/components/theme/theme-toggle"
import { useThemeConfig } from "@/components/active-theme"

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
    const { themeMode } = useThemeConfig()

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
                        {/* <LogoReverseN variant={themeMode === 'dark' ? 'light' : 'dark'} /> */}
                        <span className="font-bold text-xl hidden sm:inline-block text-foreground">
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
                        className={`group transition-colors border ${themeMode === 'dark'
                            ? 'hover:bg-neutral-800/60 hover:text-neutral-100 border-neutral-800'
                            : 'hover:bg-neutral-200/60 hover:text-neutral-900 border-neutral-300'
                            }`}
                    >
                        <Link
                            href="https://github.com/piyushzingade/dashboard"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-foreground"
                        >
                            <IconStarFilled className="h-4 w-4 text-[#e2b241] group-hover:scale-105 transition-transform" />

                            <span className="font-medium">
                                Give a Star {" "}
                                <span className={`ml-1 font-medium ${themeMode === 'dark'
                                    ? 'text-neutral-200 group-hover:text-neutral-300'
                                    : 'text-neutral-700 group-hover:text-neutral-900'
                                    }`}>
                                    {star.stargazersCount}
                                </span>
                            </span>
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className={themeMode === 'dark'
                            ? 'hover:text-neutral-200 hover:bg-neutral-800'
                            : 'hover:text-neutral-700 hover:bg-neutral-200'
                        }
                    >
                        <Link
                            href="https://x.com/Zingadepiyush"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center"
                        >
                            <XIcon className={`h-4 w-4 ${themeMode === 'dark' ? 'text-gray-200' : 'text-gray-700'}`} />
                            <span className="sr-only">X</span>
                        </Link>
                    </Button>

                    {/* Theme Toggle Button */}
                    <ModeToggle />
                </motion.nav>
            </div>
        </motion.header>
    )
}


interface LogoReverseNProps {
    variant: "light" | "dark"
    size?: number
}

// export default function LogoReverseN({ variant, size = 128 }: LogoReverseNProps) {
//     const color = variant === "light" ? "#ffffff" : "#1a1a1a"
//     const accentColor = variant === "light" ? "#e0e0e0" : "#333333"

//     return (
//         <svg width={size} height={size} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
//             {/* Background circle */}
//             <circle
//                 cx="64"
//                 cy="64"
//                 r="62"
//                 fill={variant === "light" ? "#ffffff" : "#0f0f0f"}
//                 stroke={accentColor}
//                 strokeWidth="2"
//             />

//             {/* Reversed "N" shape - mirrored horizontally */}
//             <g fill={color} stroke={color} strokeLinecap="round" strokeLinejoin="round">
//                 {/* Left vertical bar */}
//                 <rect x="32" y="36" width="12" height="56" rx="2" />

//                 {/* Right vertical bar */}
//                 <rect x="84" y="36" width="12" height="56" rx="2" />

//                 {/* Diagonal connection - reversed direction */}
//                 <path d="M 44 36 L 84 92" stroke={color} strokeWidth="12" strokeLinecap="round" opacity="0.8" />

//                 {/* Small accent element */}
//                 <circle cx="64" cy="64" r="4" fill={accentColor} opacity="0.6" />
//             </g>

//             {/* Decorative dots */}
//             <g fill={accentColor} opacity="0.5">
//                 <circle cx="48" cy="80" r="2" />
//                 <circle cx="80" cy="48" r="2" />
//             </g>
//         </svg>
//     )
// }
