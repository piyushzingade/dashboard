"use client";

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { motion, useMotionValueEvent, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { DollarSign, Users, Activity, TrendingUp } from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Animated spring number ─── */

function AnimatedNumber({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    const springValue = useSpring(0, { stiffness: 100, damping: 20 });

    useMotionValueEvent(springValue, "change", (latest) => {
        setDisplayValue(
            value % 1 === 0 ? Math.floor(latest) : Number(latest.toFixed(1))
        );
    });

    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    return <motion.span>{displayValue.toLocaleString()}</motion.span>;
}

/* ─── Tiny sparkline SVG ─── */

function Sparkline({
    data,
    color,
}: {
    data: readonly number[];
    color: string;
}) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const w = 80;
    const h = 28;
    const pad = 2;

    const coords = data.map((v, i) => ({
        x: pad + (i / (data.length - 1)) * (w - pad * 2),
        y: h - pad - ((v - min) / range) * (h - pad * 2),
    }));

    const points = coords.map((c) => `${c.x},${c.y}`).join(" ");
    const last = coords[coords.length - 1];

    return (
        <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            fill="none"
            className="shrink-0 opacity-40 transition-opacity duration-200 group-hover:opacity-100"
        >
            <polyline
                points={points}
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            {last && <circle cx={last.x} cy={last.y} r={2} fill={color} />}
        </svg>
    );
}

/* ─── Card data ─── */

const cards = [
    {
        title: "Total Revenue",
        value: 1250,
        prefix: "$",
        suffix: ".00",
        trend: "+12.5%",
        trendUp: true,
        description: "Trending up this month",
        subtitle: "Visitors for the last 6 months",
        icon: DollarSign,
        sparkData: [400, 500, 450, 680, 600, 750, 800, 920, 880, 1050, 1100, 1250],
        sparkColor: "oklch(0.65 0.19 145)",
    },
    {
        title: "New Customers",
        value: 1234,
        prefix: "",
        suffix: "",
        trend: "-20%",
        trendUp: false,
        description: "Down 20% this period",
        subtitle: "Acquisition needs attention",
        icon: Users,
        sparkData: [1500, 1400, 1350, 1300, 1280, 1260, 1250, 1240, 1235, 1234],
        sparkColor: "oklch(0.65 0.19 25)",
    },
    {
        title: "Active Accounts",
        value: 45678,
        prefix: "",
        suffix: "",
        trend: "+12.5%",
        trendUp: true,
        description: "Strong user retention",
        subtitle: "Engagement exceeds targets",
        icon: Activity,
        sparkData: [30000, 32000, 35000, 36500, 38000, 40000, 41500, 43000, 44200, 45678],
        sparkColor: "oklch(0.65 0.19 145)",
    },
    {
        title: "Growth Rate",
        value: 4.5,
        prefix: "",
        suffix: "%",
        trend: "+4.5%",
        trendUp: true,
        description: "Steady performance increase",
        subtitle: "Meets growth projections",
        icon: TrendingUp,
        sparkData: [2.1, 2.5, 2.8, 3.0, 3.2, 3.5, 3.8, 4.0, 4.2, 4.5],
        sparkColor: "oklch(0.65 0.19 145)",
    },
] as const;

/* ─── Component ─── */

export function TopCard() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, i) => (
                <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.45,
                        delay: i * 0.06,
                        ease,
                    }}
                >
                    <Card className="@container/card group relative overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md dark:hover:border-foreground/10">
                        {/* Subtle hover glow */}
                        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/[0.03] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <CardHeader>
                            <CardDescription className="flex items-center gap-2">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/80 transition-colors duration-200 group-hover:bg-secondary">
                                    <card.icon className="h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
                                </span>
                                {card.title}
                            </CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                {card.prefix}
                                <AnimatedNumber value={card.value} />
                                {card.suffix}
                            </CardTitle>
                            <CardAction>
                                <Badge
                                    variant="outline"
                                    className={`border-none transition-transform duration-200 group-hover:scale-105 ${
                                        card.trendUp
                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                            : "bg-red-500/10 text-red-500"
                                    }`}
                                >
                                    {card.trendUp ? (
                                        <IconTrendingUp className="h-3.5 w-3.5" />
                                    ) : (
                                        <IconTrendingDown className="h-3.5 w-3.5" />
                                    )}
                                    {card.trend}
                                </Badge>
                            </CardAction>
                        </CardHeader>

                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="flex w-full items-end justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="line-clamp-1 flex gap-2 font-medium">
                                        {card.description}
                                        {card.trendUp ? (
                                            <IconTrendingUp className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                        ) : (
                                            <IconTrendingDown className="size-4 shrink-0 text-red-500" />
                                        )}
                                    </div>
                                    <div className="text-muted-foreground">
                                        {card.subtitle}
                                    </div>
                                </div>
                                <Sparkline
                                    data={card.sparkData}
                                    color={card.sparkColor}
                                />
                            </div>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
