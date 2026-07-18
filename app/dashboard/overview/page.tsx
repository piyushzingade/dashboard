"use client"

import { CalendarDays, ChevronDown, MoreHorizontal, SlidersHorizontal } from "lucide-react"
import { ValueLineBarChart } from '@/components/graphs/BarChart'
import { PartialLineChart } from '@/components/graphs/LineChart'
import { GlowingMultipleStrokeRadarChart } from '@/components/graphs/RadarChart'
import { TopCard } from '@/components/graphs/TopCard'
import { BudgetPanel, FunnelPanel, QuickActionsPanel, SalesByHourPanel, TeamPanel, TrafficSourcesPanel } from '@/components/dashboard/overview-panels'
import { Button } from '@/components/ui/button'

function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
}

export default function OverviewPage() {
    return (
        <div className='mx-auto flex w-full max-w-[1680px] flex-1 flex-col gap-6'>
            <header className='flex flex-col gap-4 border-b border-border/70 pb-5 lg:flex-row lg:items-center lg:justify-between'>
                <div>
                    <p className='mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground'>Workspace overview</p>
                    <h1 className='font-heading text-3xl font-semibold tracking-[-0.045em] sm:text-4xl'>{getGreeting()}</h1>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                    <Button variant='outline' size='sm' className='gap-1.5'><span>Last 30 days</span><ChevronDown className='size-3.5' aria-hidden='true' /></Button>
                    <Button variant='outline' size='sm' className='gap-2'><CalendarDays className='size-3.5' aria-hidden='true' /><span>Apr 16 – May 15, 2026</span></Button>
                    <Button variant='outline' size='sm'><SlidersHorizontal className='size-3.5' aria-hidden='true' />Customize</Button>
                    <Button variant='outline' size='icon-sm' aria-label='More overview actions'><MoreHorizontal className='size-4' /></Button>
                </div>
            </header>

            <TopCard />

            <section className='grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)]' aria-label='Revenue and budget'>
                <ValueLineBarChart />
                <BudgetPanel />
            </section>

            <section className='grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)]' aria-label='Performance breakdown'>
                <FunnelPanel />
                <GlowingMultipleStrokeRadarChart />
            </section>

            <section className='grid gap-4 lg:grid-cols-2' aria-label='Audience trend'>
                <PartialLineChart />
                <TrafficSourcesPanel />
            </section>

            <section className='grid gap-4 xl:grid-cols-3' aria-label='Workspace operations'>
                <TeamPanel />
                <SalesByHourPanel />
                <QuickActionsPanel />
            </section>
        </div>
    )
}
