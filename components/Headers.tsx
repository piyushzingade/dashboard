import { Breadcrumbs } from "./Breadcrumbs";
import CtaGithub from "./CtaGithub";
import SearchInput from "./search-input";
import { ModeToggle } from "./theme/theme-toggle";
import { ThemeSelector } from "./ThemeSelector";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { UserNav } from "./use-nav";

export default function Header() {
    return (
        <header className="flex items-center justify-between h-16 w-full px-6 bg-background border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            {/* Left Section */}
            <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-4" />
                <Breadcrumbs />
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                <CtaGithub />

                {/* Only show Search on medium+ screens */}
                <div className="hidden md:flex">
                    <SearchInput />
                </div>

                <UserNav />
                <ModeToggle />
                <ThemeSelector />
            </div>
        </header>
    );
}
