"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    BarChart3,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { PageHeader } from "@/components/dashboard/page-header";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Data ─── */

const revenueData = [
    { month: "Jan", revenue: 4200, expenses: 2800 },
    { month: "Feb", revenue: 5100, expenses: 3200 },
    { month: "Mar", revenue: 4800, expenses: 2900 },
    { month: "Apr", revenue: 6300, expenses: 3500 },
    { month: "May", revenue: 5900, expenses: 3100 },
    { month: "Jun", revenue: 7200, expenses: 3800 },
    { month: "Jul", revenue: 6800, expenses: 3400 },
    { month: "Aug", revenue: 8100, expenses: 4200 },
    { month: "Sep", revenue: 7500, expenses: 3900 },
    { month: "Oct", revenue: 8900, expenses: 4500 },
    { month: "Nov", revenue: 9200, expenses: 4800 },
    { month: "Dec", revenue: 10500, expenses: 5100 },
];

const periods = ["7D", "30D", "90D", "12M"] as const;

const stats = [
    {
        label: "Revenue",
        value: "$84,500",
        change: "+14.2%",
        up: true,
        spark: [42, 51, 48, 63, 59, 72, 68, 81, 75, 89, 92, 105],
    },
    {
        label: "Expenses",
        value: "$41,200",
        change: "+8.1%",
        up: true,
        spark: [28, 32, 29, 35, 31, 38, 34, 42, 39, 45, 48, 51],
    },
    {
        label: "Net Profit",
        value: "$43,300",
        change: "-2.4%",
        up: false,
        spark: [14, 19, 19, 28, 28, 34, 34, 39, 36, 44, 44, 54],
    },
    {
        label: "Growth",
        value: "51.2%",
        change: "+5.7%",
        up: true,
        spark: [33, 37, 40, 44, 47, 47, 50, 48, 48, 49, 48, 51],
    },
];

const categorySegments = [
    { label: "Electronics", value: 35, color: "var(--chart-1)" },
    { label: "Clothing", value: 25, color: "var(--chart-2)" },
    { label: "Furniture", value: 20, color: "var(--chart-3)" },
    { label: "Other", value: 20, color: "var(--chart-4)" },
];

const channelData = [
    { channel: "Direct", visitors: 4250, pct: 100 },
    { channel: "Organic Search", visitors: 3800, pct: 89 },
    { channel: "Referral", visitors: 2100, pct: 49 },
    { channel: "Social Media", visitors: 1800, pct: 42 },
    { channel: "Email", visitors: 1400, pct: 33 },
    { channel: "Paid Ads", visitors: 950, pct: 22 },
];

const topProducts = [
    { name: "Premium Headphones", sales: 1240, revenue: "$202,248", trend: "+18%", pct: 100 },
    { name: "Smart LED TV", sales: 856, revenue: "$769,943", trend: "+12%", pct: 69 },
    { name: "Gaming Console", sales: 743, revenue: "$371,257", trend: "+8%", pct: 60 },
    { name: "Leather Sofa Set", sales: 612, revenue: "$795,593", trend: "-3%", pct: 49 },
    { name: "Digital Camera", sales: 589, revenue: "$765,641", trend: "+22%", pct: 48 },
];

const revenueConfig = {
    revenue: { label: "Revenue", color: "var(--positive)" },
    expenses: { label: "Expenses", color: "var(--chart-3)" },
} satisfies ChartConfig;

/* ─── Sparkline ─── */

function Sparkline({
    data,
    className,
}: {
    data: number[];
    className?: string;
}) {
    const w = 96;
    const h = 32;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const d = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * w;
            const y = h - ((v - min) / range) * (h - 4) - 2;
            return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ");

    const fillD = `${d} L ${w} ${h} L 0 ${h} Z`;

    return (
        <svg
            viewBox={`0 0 ${w} ${h}`}
            className={className}
            fill="none"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                </linearGradient>
            </defs>
            <path d={fillD} fill="url(#sparkGrad)" />
            <path
                d={d}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

/* ─── Donut Ring (custom SVG) ─── */

function DonutRing({
    segments,
    size = 156,
}: {
    segments: { value: number; color: string; label: string }[];
    size?: number;
}) {
    const total = segments.reduce((s, seg) => s + seg.value, 0);
    const r = (size - 24) / 2;
    const circumference = 2 * Math.PI * r;
    const gapSize = 4;

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} className="-rotate-90">
                {segments.map((seg, i) => {
                    const segLength =
                        (seg.value / total) * circumference - gapSize;
                    const cumulative = segments
                        .slice(0, i)
                        .reduce((sum, item) => sum + (item.value / total) * circumference, 0);
                    const offset = -(cumulative + gapSize / 2);
                    return (
                        <motion.circle
                            key={seg.label}
                            cx={size / 2}
                            cy={size / 2}
                            r={r}
                            fill="none"
                            stroke={seg.color}
                            strokeWidth={14}
                            strokeLinecap="round"
                            strokeDasharray={`${segLength} ${circumference - segLength}`}
                            strokeDashoffset={offset}
                            initial={{
                                strokeDasharray: `0 ${circumference}`,
                            }}
                            animate={{
                                strokeDasharray: `${segLength} ${circumference - segLength}`,
                            }}
                            transition={{
                                duration: 0.9,
                                delay: 0.3 + i * 0.1,
                                ease,
                            }}
                        />
                    );
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold tabular-nums tracking-tight">
                    {total}%
                </span>
                <span className="text-[10px] text-muted-foreground">
                    Allocated
                </span>
            </div>
        </div>
    );
}

/* ─── Channel Bar ─── */

function ChannelBar({
    label,
    visitors,
    pct,
    index,
}: {
    label: string;
    visitors: number;
    pct: number;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.3 + index * 0.05, ease }}
            className="group flex items-center gap-3"
        >
            <span className="w-28 shrink-0 truncate text-right text-xs text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                {label}
            </span>
            <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-secondary/40">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{
                        duration: 0.7,
                        delay: 0.35 + index * 0.06,
                        ease,
                    }}
                    className="h-full rounded-md bg-gradient-to-r from-foreground/50 to-foreground/20"
                />
                <span className="absolute inset-y-0 left-2 flex items-center text-[10px] font-medium tabular-nums text-foreground/70">
                    {pct > 15 ? visitors.toLocaleString() : ""}
                </span>
            </div>
            <span className="w-12 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                {visitors.toLocaleString()}
            </span>
        </motion.div>
    );
}

/* ─── Product Row ─── */

function ProductRow({
    product,
    rank,
    index,
}: {
    product: (typeof topProducts)[0];
    rank: number;
    index: number;
}) {
    const isPositive = product.trend.startsWith("+");
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.32 + index * 0.05, ease }}
            className="-mx-2 rounded-lg px-2 py-3 transition-colors duration-150 hover:bg-secondary/40"
        >
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                            rank <= 3
                                ? "bg-foreground text-background"
                                : "bg-secondary text-muted-foreground"
                        }`}
                    >
                        {rank}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                            {product.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                            {product.sales.toLocaleString()} sales
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 pl-2 shrink-0">
                    <span className="font-mono text-sm font-medium tabular-nums">
                        {product.revenue}
                    </span>
                    <span
                        className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                            isPositive
                                ? "text-positive"
                                : "text-destructive"
                        }`}
                    >
                        {isPositive ? (
                            <ArrowUpRight className="h-3 w-3" />
                        ) : (
                            <ArrowDownRight className="h-3 w-3" />
                        )}
                        {product.trend}
                    </span>
                </div>
            </div>
            {/* Inline progress bar */}
            <div className="mt-2 ml-10 h-1 overflow-hidden rounded-full bg-secondary/60">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${product.pct}%` }}
                    transition={{
                        duration: 0.6,
                        delay: 0.4 + index * 0.06,
                        ease,
                    }}
                    className="h-full rounded-full bg-foreground/40"
                />
            </div>
        </motion.div>
    );
}

/* ─── Page ─── */

export default function ReportsPage() {
    const [period, setPeriod] = useState<(typeof periods)[number]>("12M");

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:p-6 md:pb-10 xl:p-8 xl:pb-12">
            <PageHeader
                title="Reports"
                description="Business performance, channel health, and product movement over time."
                icon={BarChart3}
                actions={
                <div className="flex gap-1 rounded-lg bg-secondary/50 p-1">
                    {periods.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            aria-pressed={period === p}
                            className={`min-h-11 rounded-md px-3 text-xs font-semibold outline-none transition-[background-color,color] duration-150 focus-visible:ring-2 focus-visible:ring-ring ${
                                period === p
                                    ? "bg-background text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
                }
            />

            {/* Stat Tiles with Sparklines */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.45,
                            delay: 0.06 + i * 0.05,
                            ease,
                        }}
                    >
                        <Card className="relative overflow-hidden">
                            <CardContent className="pb-0 pt-5">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {stat.label}
                                </p>
                                <div className="mt-1.5 flex items-end justify-between">
                                    <span className="text-2xl font-bold tabular-nums tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span
                                        className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                                            stat.up
                                                ? "text-positive"
                                                : "text-destructive"
                                        }`}
                                    >
                                        {stat.up ? (
                                            <ArrowUpRight className="h-3 w-3" />
                                        ) : (
                                            <ArrowDownRight className="h-3 w-3" />
                                        )}
                                        {stat.change}
                                    </span>
                                </div>
                            </CardContent>
                            {/* Edge-to-edge sparkline */}
                            <div className="mt-3 h-8 w-full text-foreground/30 transition-colors duration-200 group-hover:text-foreground/50">
                                <Sparkline
                                    data={stat.spark}
                                    className="h-full w-full"
                                />
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Chart + Category Donut */}
            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                {/* Revenue Area Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                Revenue vs Expenses
                                <Badge
                                    variant="outline"
                                    className="border-positive/25 bg-positive/10 text-positive"
                                >
                                    <TrendingUp className="h-3 w-3" />
                                    +14.2%
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                Monthly breakdown for {period === "12M" ? "the past year" : `the last ${period.toLowerCase()}`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={revenueConfig}
                                className="h-52 w-full sm:h-64"
                            >
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient
                                            id="fillRevenue"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="oklch(0.65 0.19 145)"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="oklch(0.65 0.19 145)"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="fillExpenses"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="oklch(0.55 0 0)"
                                                stopOpacity={0.15}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="oklch(0.55 0 0)"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        vertical={false}
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                        strokeOpacity={0.5}
                                    />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        fontSize={11}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Area
                                        dataKey="expenses"
                                        type="monotone"
                                        fill="url(#fillExpenses)"
                                        stroke="oklch(0.55 0 0)"
                                        strokeWidth={1.5}
                                    />
                                    <Area
                                        dataKey="revenue"
                                        type="monotone"
                                        fill="url(#fillRevenue)"
                                        stroke="oklch(0.65 0.19 145)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Category Donut Ring */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.28, ease }}
                >
                    <Card className="flex h-full flex-col transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Sales by Category
                            </CardTitle>
                            <CardDescription>
                                Product category distribution
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col items-center justify-center">
                            <DonutRing segments={categorySegments} />
                            {/* Legend */}
                            <div className="mt-5 grid w-full grid-cols-2 gap-x-4 gap-y-2.5">
                                {categorySegments.map((seg) => (
                                    <div
                                        key={seg.label}
                                        className="flex items-center gap-2 text-xs"
                                    >
                                        <span
                                            className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                                            style={{
                                                backgroundColor: seg.color,
                                            }}
                                        />
                                        <span className="text-muted-foreground">
                                            {seg.label}
                                        </span>
                                        <span className="ml-auto font-medium tabular-nums">
                                            {seg.value}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Traffic Sources + Top Products */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Traffic Sources (custom bars) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.32, ease }}
                >
                    <Card className="flex h-full flex-col transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Traffic Sources
                            </CardTitle>
                            <CardDescription>
                                Visitors by acquisition channel
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col justify-center space-y-2.5">
                            {channelData.map((ch, i) => (
                                <ChannelBar
                                    key={ch.channel}
                                    label={ch.channel}
                                    visitors={ch.visitors}
                                    pct={ch.pct}
                                    index={i}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Top Products (ranked with inline bars) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.36, ease }}
                >
                    <Card className="flex h-full flex-col transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Top Products
                            </CardTitle>
                            <CardDescription>
                                Best performing by sales volume
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col justify-center space-y-0.5">
                            {topProducts.map((product, i) => (
                                <ProductRow
                                    key={product.name}
                                    product={product}
                                    rank={i + 1}
                                    index={i}
                                />
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
