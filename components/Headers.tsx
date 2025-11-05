import { Breadcrumbs } from "./Breadcrumbs";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";



export function Header() {
    return (
        <header>
            <div className='flex items-center gap-2 px-4'>
                <SidebarTrigger className='-ml-1' />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <Breadcrumbs />
            </div>
        </header>
    )
}