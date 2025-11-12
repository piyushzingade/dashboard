"use client";
import { ArrowRight } from "lucide-react";


export function SidebarCard() {
    return (
        <div className="w-[226px] flex flex-col gap-2 justify-between bg-background/10 p-4 rounded-lg border border-border/90 shadow-sm mb-6 hover:scale-105 transition-transform duration-200 ease-in-out">
            {/* <div className="bg-linear-to-r  "></div> */}
            <div className="">
                <ThunderIcon />
            </div>

            <div className="font-semibold text-lg text-foreground">
                <h2 className="">Free Trial Version</h2>
            </div>

            <div className=" relative w-full rounded-4xl border border-background/80 h-2 bg-white">
                <div className="absolute left-0 top-0 bottom-0 w-[60%] rounded-4xl bg-linear-to-r from-foreground/50 to-muted-foreground"></div>
            </div>

            <div className="text-sm text-muted-foreground/80">
                <p>You have 4 days left.</p>
                <p>Upgrade to continue</p>
            </div>

            <div className="text-muted-foreground/80 text-md flex gap-2 items-center justify-between cursor-pointer hover:underline">
                Select Plan <ArrowRight className="size-4 " />
            </div>
        </div>
    )
}


const ThunderIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="40"
            height="40"
            className="fill-foreground"
        >
            {/* Sharp lightning bolt */}
            <path d="M13.5 2L4 13h5.5L8 22l9.5-11H12l1.5-9z" />
        </svg>
    );
};