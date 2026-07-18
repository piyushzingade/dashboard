import Header from "@/components/Headers";
import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";


export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <KBar>
            <SidebarProvider>
                <div className="flex min-h-svh w-full overflow-hidden bg-background">
                    <AppSidebar />
                    <SidebarInset className="flex flex-col flex-1 overflow-hidden">
                        <Header />
                        <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </KBar>
    )
}
