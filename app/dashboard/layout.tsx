import { Header } from "@/components/Headers";
import AppSidebar from "@/components/layout/app-sidebar";
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
        <div>
            <div className="flex h-screen">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">
                    <Header />
                    {children}
                </main>
            </div>
        </div>
    )
}

