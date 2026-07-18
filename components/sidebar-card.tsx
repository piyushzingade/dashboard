"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";


export function SidebarCard() {
    return (
        <aside className="mx-2 mb-3 w-[calc(100%-1rem)] rounded-xl border border-sidebar-border bg-sidebar-accent/45 p-3 group-data-[collapsible=icon]:hidden" aria-label="Plan usage">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <ThunderIcon />
                    <p className="text-sm font-semibold">Trial workspace</p>
                </div>
                <span className="text-xs tabular-nums text-sidebar-foreground/70">60%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sidebar-border" aria-hidden="true">
                <div className="h-full w-3/5 rounded-full bg-sidebar-primary" />
            </div>
            <p className="mt-2 text-xs leading-5 text-sidebar-foreground/65">Four days remain on your current plan.</p>
            <Link href="/dashboard/billing" className="mt-2 flex min-h-11 items-center justify-between rounded-lg text-sm font-semibold outline-none transition-colors hover:text-sidebar-primary focus-visible:ring-2 focus-visible:ring-sidebar-ring">
                Review plan <ArrowRight className="size-4" />
            </Link>
        </aside>
    )
}


const ThunderIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="fill-sidebar-foreground"
        >
            <path d="M13.5 2L4 13h5.5L8 22l9.5-11H12l1.5-9z" />
        </svg>
    );
};
