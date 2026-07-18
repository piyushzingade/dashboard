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
import { DollarSign, Users, Activity, TrendingUp } from "lucide-react";

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
            className="shrink-0 opacity-70"
            role="img"
            aria-label="Recent trend sparkline"
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
        description: "vs. previous 30 days",
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
        description: "vs. previous 30 days",
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
        description: "vs. previous 30 days",
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
        description: "vs. previous 30 days",
        icon: TrendingUp,
        sparkData: [2.1, 2.5, 2.8, 3.0, 3.2, 3.5, 3.8, 4.0, 4.2, 4.5],
        sparkColor: "oklch(0.65 0.19 145)",
    },
] as const;

/* ─── Component ─── */

export function TopCard() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
                <div key={card.title}>
                    <Card className="@container/card h-full overflow-hidden">
                        <CardHeader>
                            <CardDescription className="flex items-center gap-2">
                                <span className="inline-flex size-7 items-center justify-center rounded-md bg-secondary">
                                    <card.icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                                </span>
                                {card.title}
                            </CardDescription>
                            <CardTitle className="mt-1 text-2xl font-semibold tabular-nums tracking-[-0.03em] @[250px]/card:text-3xl">
                                {card.prefix}
                                {card.value.toLocaleString()}
                                {card.suffix}
                            </CardTitle>
                            <CardAction>
                                <Badge
                                    variant="outline"
                                    className={`border-none ${
                                        card.trendUp
                                            ? "bg-positive/10 text-positive"
                                            : "bg-destructive/10 text-destructive"
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
                                    <div className="line-clamp-1 text-xs text-muted-foreground">{card.description}</div>
                                </div>
                                <Sparkline
                                    data={card.sparkData}
                                    color={card.sparkColor}
                                />
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}
