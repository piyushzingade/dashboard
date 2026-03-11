"use client"

import { motion } from "motion/react"
import { ValueLineBarChart } from '@/components/graphs/BarChart'
import { PartialLineChart } from '@/components/graphs/LineChart'
import { GlowingMultipleStrokeRadarChart } from '@/components/graphs/RadarChart'
import { RecentSales } from '@/components/graphs/Sales'
import { TopCard } from '@/components/graphs/TopCard'

const ease = [0.23, 1, 0.32, 1] as const

function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
}

export default function OverviewPage() {
    return (
        <div className='flex flex-1 flex-col gap-6'>
            {/* Greeting */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
            >
                <h2 className='font-heading text-2xl font-bold tracking-tight sm:text-3xl'>
                    {getGreeting()} 👋
                </h2>
                <p className='mt-1 text-sm text-muted-foreground'>
                    Here&apos;s what&apos;s happening with your dashboard today.
                </p>
            </motion.div>

            {/* Stat Cards */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06, ease }}
            >
                <TopCard />
            </motion.div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                {/* Left — Main Charts */}
                <div className="flex flex-col gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.14, ease }}
                    >
                        <ValueLineBarChart />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.22, ease }}
                    >
                        <PartialLineChart />
                    </motion.div>
                </div>

                {/* Right — Secondary */}
                <div className="flex flex-col gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.18, ease }}
                    >
                        <GlowingMultipleStrokeRadarChart />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.26, ease }}
                    >
                        <RecentSales />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
