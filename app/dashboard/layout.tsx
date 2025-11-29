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
                <div className="flex h-screen w-full overflow-hidden">
                    <AppSidebar />
                    <SidebarInset className="flex flex-col flex-1 overflow-hidden">
                        <Header />
                        <div className="flex-1 overflow-hidden">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </KBar>
    )
}

