import { Sidebar } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col bg-white dark:bg-black">
        <Sidebar />
        <div className="flex-1 p-8">
          {/* Add your dashboard content here */}
          <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
        </div>
      </main>
    </div>
  );
}
