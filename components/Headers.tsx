// components/Headers.tsx
import { Breadcrumbs } from "./Breadcrumbs";
import CtaGithub from "./CtaGithub";
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
                "sticky top-0 z-50 w-full h-14 shrink-0",
                "border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60",
                "overflow-hidden",
                "transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
                className
            )}
        >
            <div className="flex h-full items-center justify-between gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumbs />
                </div>

                <div className="flex items-center gap-2 px-4">
                    <CtaGithub />
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
