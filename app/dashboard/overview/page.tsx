"use client"

import { CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ValueLineBarChart } from '@/components/graphs/BarChart'
import { PartialLineChart } from '@/components/graphs/LineChart'
import { GlowingMultipleStrokeRadarChart } from '@/components/graphs/RadarChart'
import { RecentSales } from '@/components/graphs/Sales'
import { TopCard } from '@/components/graphs/TopCard'

function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
}

export default function OverviewPage() {
    return (
        <div className='flex flex-1 flex-col gap-6'>
            <div className='flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between'>
                <div>
                    <div className='mb-2 flex items-center gap-2'>
                        <Badge variant='outline' className='gap-1.5 text-muted-foreground'>
                            <span className='size-1.5 rounded-full bg-positive' aria-hidden='true' />
                            Live workspace
                        </Badge>
                    </div>
                    <h1 className='font-heading text-2xl font-semibold tracking-[-0.03em] sm:text-3xl'>
                        {getGreeting()}
                    </h1>
                    <p className='mt-1.5 max-w-[65ch] text-sm text-muted-foreground'>
                        Revenue, account activity, and customer movement across the last 30 days.
                    </p>
                </div>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <CalendarDays className='size-4' aria-hidden='true' />
                    <span>Jun 19 – Jul 18, 2026</span>
                </div>
            </div>

            {/* Stat Cards */}
            <div>
                <TopCard />
            </div>

            {/* Charts Grid */}
            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                {/* Left — Main Charts */}
                <div className="flex flex-col gap-4">
                    <div>
                        <ValueLineBarChart />
                    </div>
                    <div>
                        <PartialLineChart />
                    </div>
                </div>

                {/* Right — Secondary */}
                <div className="flex flex-col gap-4">
                    <div>
                        <GlowingMultipleStrokeRadarChart />
                    </div>
                    <div>
                        <RecentSales />
                    </div>
                </div>
            </div>
        </div>
    )
}
