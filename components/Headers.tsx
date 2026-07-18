// components/Headers.tsx
import { Breadcrumbs } from "./Breadcrumbs";
import SearchInput from "./search-input";
import { ModeToggle } from "./theme/theme-toggle";
import { ThemeSelector } from "./ThemeSelector";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { UserNav } from "./use-nav";
import { cn } from "@/lib/utils";

type HeaderProps = {
    className?: string;
};

export default function Header({ className }: HeaderProps) {
    return (
        <header
            role="banner"
            className={cn(
                "sticky top-0 z-40 h-16 w-full shrink-0 border-b border-border bg-background/95",
                "transition-[height] duration-200 ease-out",
                className
            )}
        >
            <div className="flex h-full items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2 px-3 md:px-5">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mx-1 h-5" />
                    <Breadcrumbs />
                </div>

                <div className="flex items-center gap-1.5 px-3 md:px-5">
                    <div className="hidden md:flex">
                        <SearchInput />
                    </div>
                    <UserNav />
                    <ModeToggle />
                    <ThemeSelector />
                </div>
            </div>
        </header>
    );
}
