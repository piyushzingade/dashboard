import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Header } from "@/components/Headers";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="p-8">
      <Header />
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
      <p className="mt-2 text-gray-600">This is your dashboard home page.</p>
    </div>
  );
}
