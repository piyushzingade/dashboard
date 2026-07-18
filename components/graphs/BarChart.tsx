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
import { Badge } from "@/components/ui/badge";
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
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardDescription>Gross revenue</CardDescription>
                        <CardTitle className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-semibold tabular-nums tracking-[-0.03em]">
                        ${maxValueIndex.value}
                    </span>
                    <Badge variant="outline" className="border-positive/25 bg-positive/10 text-positive">
                        <TrendingUp className="h-4 w-4" />
                        <span>5.2%</span>
                    </Badge>
                        </CardTitle>
                    </div>
                    <span className="text-xs text-muted-foreground">Last 12 months</span>
                </div>
            </CardHeader>
            <CardContent>
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
