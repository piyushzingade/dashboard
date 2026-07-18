"use client";

import { IconCalendar, IconChartBar, IconChartDots3, IconSpeakerphone, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

type Metric = {
    title: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: typeof IconCalendar;
    bars: readonly number[];
};

const metrics: readonly Metric[] = [
    {
        title: "Active campaigns",
        value: "24",
        trend: "12.4%",
        trendUp: true,
        icon: IconSpeakerphone,
        bars: [3, 5, 4, 6, 8, 7, 10, 9, 12, 14, 12, 16],
    },
    {
        title: "Posts published",
        value: "147",
        trend: "7.8%",
        trendUp: true,
        icon: IconCalendar,
        bars: [4, 6, 5, 9, 7, 8, 11, 10, 12, 14, 13, 16],
    },
    {
        title: "Total reach",
        value: "412.8K",
        trend: "4.3%",
        trendUp: true,
        icon: IconChartDots3,
        bars: [5, 6, 8, 7, 9, 11, 10, 13, 12, 14, 13, 16],
    },
    {
        title: "Avg. engagement",
        value: "4.18%",
        trend: "0.6%",
        trendUp: false,
        icon: IconChartBar,
        bars: [16, 14, 15, 13, 12, 14, 11, 10, 8, 9, 7, 6],
    },
] as const;

function SparkBars({ bars }: { bars: readonly number[] }) {
    return (
        <div className="flex h-9 items-end gap-0.5" aria-hidden="true">
            {bars.map((height, index) => (
                <span
                    key={`${height}-${index}`}
                    className="w-1 rounded-[1px] bg-muted-foreground/35"
                    style={{ height: `${height * 2}px`, opacity: 0.35 + index / (bars.length * 2) }}
                />
            ))}
        </div>
    );
}

export function TopCard() {
    return (
        <section aria-label="Workspace metrics" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                    <Card key={metric.title} className="gap-0 overflow-hidden p-0">
                        <CardHeader className="gap-3 border-b border-border/70 bg-secondary/35 px-4 py-3">
                            <CardDescription className="flex items-center gap-2 text-xs">
                                <Icon className="size-3.5" aria-hidden="true" />
                                {metric.title}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex min-h-24 items-end justify-between gap-4 px-4 py-4">
                            <div className="min-w-0">
                                <CardTitle className="text-[1.75rem] font-semibold leading-none tracking-[-0.045em] tabular-nums">
                                    {metric.value}
                                </CardTitle>
                                <p className={`mt-3 flex items-center gap-1.5 text-xs font-medium ${metric.trendUp ? "text-positive" : "text-destructive"}`}>
                                    {metric.trendUp ? <IconTrendingUp className="size-3.5" aria-hidden="true" /> : <IconTrendingDown className="size-3.5" aria-hidden="true" />}
                                    {metric.trend} <span className="font-normal text-muted-foreground">since last month</span>
                                </p>
                            </div>
                            <SparkBars bars={metric.bars} />
                        </CardFooter>
                    </Card>
                );
            })}
        </section>
    );
}
