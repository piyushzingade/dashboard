"use client";

import Link from "next/link";
import { ArrowRight, Clock3, Download, Plus, Settings2, Truck, UsersRound, WalletCards, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const funnelStages = [
    { label: "Product views", value: "72K", percent: "100%", width: 100 },
    { label: "Add to cart", value: "38.2K", percent: "53%", width: 53 },
    { label: "Checkout", value: "16.8K", percent: "23%", width: 23 },
    { label: "Purchase", value: "5.6K", percent: "8%", width: 8 },
] as const;

const sources = [
    ["Organic search", "4.1K", 100],
    ["Direct", "2.9K", 71],
    ["Referral", "1.6K", 48],
    ["Paid social", "980", 31],
    ["Email", "620", 20],
] as const;

const heat = [
    [2, 2, 3, 3, 4, 4, 5, 5, 4, 4, 3, 2, 2, 3, 4, 5, 5, 4, 3, 2, 2, 2, 1, 1],
    [1, 1, 2, 2, 3, 3, 4, 5, 5, 5, 4, 4, 3, 4, 5, 5, 5, 4, 4, 3, 3, 2, 1, 1],
    [1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 4, 4, 4, 5, 5, 5, 4, 4, 3, 2, 2, 1, 1, 1],
    [1, 1, 2, 2, 3, 3, 4, 5, 5, 4, 4, 4, 5, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 4, 4, 5, 5, 5, 4, 3, 3, 2, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 3, 3, 4, 4, 4, 4, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 1],
] as const;

const quickActions = [
    { label: "Add campaign", description: "Create a campaign.", icon: Plus, href: "/dashboard/product" },
    { label: "Review unfulfilled", description: "Orders waiting to ship.", icon: Truck, href: "/dashboard/transactions" },
    { label: "Workspace settings", description: "Team, roles, permissions.", icon: Wrench, href: "/dashboard/settings" },
    { label: "Export sales", description: "CSV for accounting.", icon: Download, href: "/dashboard/reports" },
] as const;

export function FunnelPanel() {
    return (
        <Card className="gap-0 overflow-hidden p-0">
            <CardHeader className="border-b border-border/70 px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle className="text-base">Purchase funnel</CardTitle>
                        <CardDescription className="mt-1">Conversion from product view to completed order.</CardDescription>
                    </div>
                    <span className="text-xs text-muted-foreground">Last 30 days</span>
                </div>
            </CardHeader>
            <CardContent className="grid grid-cols-4 divide-x divide-border/70 p-0">
                {funnelStages.map((stage) => (
                    <div key={stage.label} className="relative flex min-h-48 flex-col justify-between px-3 py-5 sm:px-5">
                        <div>
                            <p className="text-sm font-semibold tabular-nums">{stage.value}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{stage.percent}</p>
                        </div>
                        <div className="relative mt-4 flex h-20 items-end justify-center">
                            <div className="absolute bottom-0 h-16 w-full rounded-[50%] border border-border/60 bg-secondary/70" style={{ transform: `scaleY(${Math.max(stage.width / 100, 0.22)})` }} aria-hidden="true" />
                            <span className="relative z-10 rounded-full border border-border bg-background px-2 py-1 text-[11px] font-semibold tabular-nums">{stage.percent}</span>
                        </div>
                        <p className="mt-4 text-xs leading-4 text-muted-foreground">{stage.label}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export function TrafficSourcesPanel() {
    return (
        <Card className="gap-0 overflow-hidden p-0">
            <CardHeader className="border-b border-border/70 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                    <CardTitle className="text-base">Traffic sources</CardTitle>
                    <span className="text-xs text-muted-foreground">12 months</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-5 px-5 py-5">
                {sources.map(([name, value, width]) => (
                    <div key={name}>
                        <div className="flex items-center justify-between gap-3 text-sm">
                            <span className="font-medium">{name}</span>
                            <span className="tabular-nums text-muted-foreground">{value}</span>
                        </div>
                        <div className="mt-2 flex gap-0.5" aria-label={`${name}: ${value}`}>
                            {Array.from({ length: 24 }, (_, index) => (
                                <span key={index} className="h-1 flex-1 rounded-full bg-muted-foreground/20" style={{ opacity: index < Math.round(width / 4.2) ? 0.85 : 0.22 }} />
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export function TeamPanel() {
    return (
        <Card className="min-h-64 justify-between gap-0 p-0">
            <CardHeader className="px-5 py-4">
                <CardTitle className="flex items-center gap-2 text-base"><UsersRound className="size-4 text-muted-foreground" aria-hidden="true" /> Team</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col items-center justify-center px-5 pb-8 text-center">
                <div className="mb-5 flex -space-x-2">
                    {['AM', 'JD', 'SK'].map((initials, index) => <Avatar key={initials} className="size-10 border-2 border-card"><AvatarFallback className={index === 1 ? "bg-secondary text-foreground" : "bg-muted text-muted-foreground"}>{initials}</AvatarFallback></Avatar>)}
                </div>
                <p className="font-medium">No team members</p>
                <p className="mt-1 max-w-52 text-sm leading-5 text-muted-foreground">Invite your team to collaborate on this project.</p>
                <Button variant="outline" size="sm" className="mt-5"><Plus className="size-4" />Invite members</Button>
            </CardContent>
        </Card>
    );
}

export function SalesByHourPanel() {
    return (
        <Card className="min-h-64 gap-0 p-0">
            <CardHeader className="px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                    <CardTitle className="flex items-center gap-2 text-base"><Clock3 className="size-4 text-muted-foreground" aria-hidden="true" /> Sales by hour</CardTitle>
                    <span className="text-xs text-muted-foreground">Last 7 days</span>
                </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
                <div className="flex items-end justify-between gap-3">
                    <div><p className="text-2xl font-semibold tabular-nums tracking-[-0.04em]">$4.8K</p><p className="mt-1 text-xs text-muted-foreground">Peak · Sat 9p–10p</p></div>
                    <div className="text-right"><p className="text-lg font-semibold tabular-nums">$1.5K</p><p className="mt-1 text-xs text-muted-foreground">Avg / hour</p></div>
                </div>
                <div className="mt-5 space-y-1.5" role="img" aria-label="Sales heatmap by day and hour">
                    {heat.map((row, rowIndex) => <div key={rowIndex} className="flex gap-1">{row.map((level, index) => <span key={`${rowIndex}-${index}`} className="h-2.5 flex-1 rounded-[2px] bg-foreground" style={{ opacity: 0.08 + level * 0.11 }} />)}</div>)}
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-muted-foreground"><span>12a</span><span>6a</span><span>12p</span><span>6p</span><span>12a</span></div>
            </CardContent>
        </Card>
    );
}

export function QuickActionsPanel() {
    return (
        <Card className="min-h-64 gap-0 p-0">
            <CardHeader className="px-5 py-4"><CardTitle className="flex items-center gap-2 text-base"><Settings2 className="size-4 text-muted-foreground" aria-hidden="true" /> Quick actions</CardTitle></CardHeader>
            <CardContent className="px-2 pb-2">
                {quickActions.map(({ label, description, icon: Icon, href }) => <Link key={label} href={href} className="group flex min-h-14 items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{label}</span><span className="block truncate text-xs text-muted-foreground">{description}</span></span>
                    <ArrowRight className="size-4 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>)}
            </CardContent>
        </Card>
    );
}

export function BudgetPanel() {
    return (
        <Card className="gap-0 overflow-hidden p-0">
            <CardHeader className="border-b border-border/70 px-5 py-4"><CardTitle className="flex items-center gap-2 text-base"><WalletCards className="size-4 text-muted-foreground" aria-hidden="true" /> Today&apos;s budget</CardTitle></CardHeader>
            <CardContent className="px-5 py-5">
                <div className="grid grid-cols-2 divide-x divide-border/70"><div><p className="text-xs text-muted-foreground">Used today</p><p className="mt-2 text-xl font-semibold tabular-nums">$223.65</p></div><div className="pl-5"><p className="text-xs text-muted-foreground">Today&apos;s allowance</p><p className="mt-2 text-xl font-semibold tabular-nums">$480.00</p></div></div>
                <div className="mt-8"><div className="flex items-center justify-between text-xs text-muted-foreground"><span>47% used</span><span className="tabular-nums">$256.35 left</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-[47%] rounded-full bg-foreground/70" /></div></div>
            </CardContent>
        </Card>
    );
}
