import Header from "@/components/Headers";
import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/signin");
    }

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

