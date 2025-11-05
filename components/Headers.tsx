import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { ModeToggle } from "./theme/theme-toggle";
import { DropdownMenu, DropdownMenuItem } from "./ui/dropdown-menu";
import SearchInput from "./search-input";

const GithubSvg = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-brand-github " data-sentry-element="IconBrandGithub" data-sentry-source-file="cta-github.tsx">
            <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5">
            </path>
        </svg>
    )
}


export function Header() {
    return (
        <header>
            <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <Breadcrumbs />
            </div>

            <div className="flex items-center gap-2 px-4">
                <Link href={"https://github.com/piyushzingade/dashboard"}>
                    <GithubSvg />
                </Link>

                <div className="">
                    <SearchInput />
                </div>

                <div className="">

                </div>
                <div className="">
                    <ModeToggle />
                </div>

                <div className="">
                    {/* <DropdownMenu>
                        <DropdownMenuItem>Red</DropdownMenuItem>
                        <DropdownMenuItem>Yellow</DropdownMenuItem>
                        <DropdownMenuItem>  Green</DropdownMenuItem>
                        <DropdownMenuItem>Blue</DropdownMenuItem>

                    </DropdownMenu> */}

                    drop down menu
                </div>
            </div>
        </header>
    )
}