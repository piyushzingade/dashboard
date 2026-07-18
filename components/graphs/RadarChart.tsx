"use client";

import { WalletCards } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const segments = Array.from({ length: 40 }, (_, index) => {
    const angle = -132 + index * 6.75;
    const radians = (angle * Math.PI) / 180;
    return {
        x1: 100 + Math.cos(radians) * 72,
        y1: 100 + Math.sin(radians) * 72,
        x2: 100 + Math.cos(radians) * 88,
        y2: 100 + Math.sin(radians) * 88,
    };
});

export function GlowingMultipleStrokeRadarChart() {
    return (
        <Card className="gap-0 overflow-hidden p-0">
            <CardHeader className="border-b border-border/70 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                    <CardTitle className="flex items-center gap-2 text-base"><WalletCards className="size-4 text-muted-foreground" aria-hidden="true" /> Total revenue</CardTitle>
                    <span className="text-xs font-medium text-positive">↑ 5.2%</span>
                </div>
            </CardHeader>
            <CardContent className="px-5 py-5">
                <div className="flex flex-col items-center">
                    <div className="relative aspect-square w-full max-w-[230px]" role="img" aria-label="Total revenue $284,920, with 78 percent of the monthly goal reached">
                        <svg viewBox="0 0 200 200" className="size-full" aria-hidden="true">
                            {segments.map((segment, index) => <line key={index} x1={segment.x1} y1={segment.y1} x2={segment.x2} y2={segment.y2} stroke="var(--foreground)" strokeWidth="7" strokeLinecap="round" opacity={index < 32 ? 0.58 : 0.14} />)}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="mb-2 flex size-9 items-center justify-center rounded-full bg-secondary text-muted-foreground"><WalletCards className="size-4" aria-hidden="true" /></span>
                            <span className="text-xs text-muted-foreground">Total revenue</span>
                            <span className="mt-1 text-xl font-semibold tracking-[-0.04em] tabular-nums">$284,920</span>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-foreground/60" aria-hidden="true" />Subscriptions</span>
                        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-foreground/20" aria-hidden="true" />Usage &amp; services</span>
                    </div>
                    <button type="button" className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 text-sm font-medium transition-colors duration-150 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">View detail <span aria-hidden="true">→</span></button>
                </div>
                <div className="mt-6 border-t border-border/70 pt-5">
                    <div className="flex items-end justify-between gap-4"><div><p className="text-xs text-muted-foreground">Active customers</p><p className="mt-1 text-2xl font-semibold tracking-[-0.04em] tabular-nums">2,540</p></div><span className="text-xs text-muted-foreground">78%</span></div>
                    <div className="mt-3 flex h-5 items-end gap-0.5" aria-hidden="true">{Array.from({ length: 40 }, (_, index) => <span key={index} className="flex-1 rounded-t-[1px] bg-foreground/55" style={{ height: `${8 + (index % 5) * 3}px`, opacity: index < 31 ? 0.7 : 0.22 }} />)}</div>
                    <div className="mt-2 flex gap-4 text-xs text-muted-foreground"><span>● Paid</span><span className="opacity-60">● Free</span></div>
                </div>
            </CardContent>
        </Card>
    );
}
