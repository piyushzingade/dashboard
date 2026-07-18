"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, Cell, XAxis, ReferenceLine } from "recharts";
import React from "react";
import { AnimatePresence } from "motion/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useMotionValueEvent, useSpring } from "motion/react";

const CHART_MARGIN = 35;

const chartData = [
    { month: "January", desktop: 342 },
    { month: "February", desktop: 676 },
    { month: "March", desktop: 512 },
    { month: "April", desktop: 629 },
    { month: "May", desktop: 458 },
    { month: "June", desktop: 781 },
    { month: "July", desktop: 394 },
    { month: "August", desktop: 924 },
    { month: "September", desktop: 647 },
    { month: "October", desktop: 532 },
    { month: "November", desktop: 803 },
    { month: "December", desktop: 271 },
    { month: "January", desktop: 342 },
    { month: "February", desktop: 876 },
    { month: "March", desktop: 512 },
    { month: "April", desktop: 629 },
    { month: "May", desktop: 458 },
    { month: "June", desktop: 781 },
    { month: "July", desktop: 394 },
    { month: "August", desktop: 924 },
    { month: "September", desktop: 647 },
    { month: "October", desktop: 532 },

];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function ValueLineBarChart() {
    const [activeIndex, setActiveIndex] = React.useState<number | undefined>(
        undefined
    );

    const maxValueIndex = React.useMemo(() => {
        // if user is moving mouse over bar then set value to the bar value
        if (activeIndex !== undefined) {
            return { index: activeIndex, value: chartData[activeIndex].desktop };
        }
        // if no active index then set value to max value
        return chartData.reduce(
            (max, data, index) => {
                return data.desktop > max.value ? { index, value: data.desktop } : max;
            },
            { index: 0, value: 0 }
        );
    }, [activeIndex]);

    const maxValueIndexSpring = useSpring(maxValueIndex.value, {
        stiffness: 100,
        damping: 20,
    });

    const [springyValue, setSpringyValue] = React.useState(maxValueIndex.value);

    useMotionValueEvent(maxValueIndexSpring, "change", (latest) => {
        setSpringyValue(Number(latest.toFixed(0)));
    });

    React.useEffect(() => {
        maxValueIndexSpring.set(maxValueIndex.value);
    }, [maxValueIndex.value, maxValueIndexSpring]);

    return (
        <Card className="gap-0 overflow-hidden p-0">
            <CardHeader className="border-b border-border/70 px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle className="text-base">Monthly recurring revenue</CardTitle>
                        <CardDescription className="mt-1">Total sales in the last 30 days</CardDescription>
                        <div className="mt-3 flex items-center gap-2">
                            <span className="text-2xl font-semibold tabular-nums tracking-[-0.04em]">$413K</span>
                            <span className="flex items-center gap-1 text-xs font-medium text-positive"><TrendingUp className="size-3.5" aria-hidden="true" />1.5% <span className="font-normal text-muted-foreground">vs last 30 days</span></span>
                        </div>
                    </div>
                    <div className="hidden items-center gap-0.5 rounded-lg border border-border/80 p-0.5 sm:flex" role="group" aria-label="Revenue range">
                        {['14D', '1M', '3M', '6M'].map((range, index) => <button key={range} type="button" aria-pressed={index === 1} className={`min-h-8 rounded-md px-2.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === 1 ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/60'}`}>{range}</button>)}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-5 py-5">
                <AnimatePresence mode="wait">
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            onMouseLeave={() => setActiveIndex(undefined)}
                            margin={{
                                left: CHART_MARGIN,
                            }}
                        >
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
                                {chartData.map((_, index) => (
                                    <Cell
                                        className="duration-200"
                                        opacity={index === maxValueIndex.index ? 1 : 0.2}
                                        key={index}
                                        onMouseEnter={() => setActiveIndex(index)}
                                    />
                                ))}
                            </Bar>
                            <ReferenceLine
                                opacity={0.55}
                                y={springyValue}
                                stroke="var(--foreground)"
                                strokeWidth={1}
                                strokeDasharray="3 3"
                                label={<CustomReferenceLabel value={maxValueIndex.value} />}
                            />
                        </BarChart>
                    </ChartContainer>
                </AnimatePresence>
            </CardContent>
        </Card>
    );
}

interface CustomReferenceLabelProps {
    viewBox?: {
        x?: number;
        y?: number;
    };
    value: number;
}

const CustomReferenceLabel: React.FC<CustomReferenceLabelProps> = (props) => {
    const { viewBox, value } = props;
    const x = viewBox?.x ?? 0;
    const y = viewBox?.y ?? 0;

    // we need to change width based on value length
    const width = React.useMemo(() => {
        const characterWidth = 8; // Average width of a character in pixels
        const padding = 10;
        return value.toString().length * characterWidth + padding;
    }, [value]);

    return (
        <>
            <rect
                x={x - CHART_MARGIN}
                y={y - 9}
                width={width}
                height={18}
                fill="var(--background)"
                rx={4}
            />
            <text
                fontWeight={600}
                x={x - CHART_MARGIN + 6}
                y={y + 4}
                fill="var(--foreground)"
            >
                {value}
            </text>
        </>
    );
};
