
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
            <p className="mt-2 text-gray-600">This is your dashboard home page.</p>
        </div>
    );
}