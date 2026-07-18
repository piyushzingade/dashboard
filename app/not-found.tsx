import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center px-5 text-center">
                <p className="mb-4 text-sm font-medium text-muted-foreground">Page not found</p>
                <h1 className="text-7xl font-semibold tracking-[-0.04em] text-foreground tabular-nums">
                    404
                </h1>
                <p className="mt-4 max-w-md text-base leading-6 text-muted-foreground">The page you’re looking for doesn’t exist or may have moved.</p>
                <Button asChild variant="outline" className="mt-8">
                    <Link href="/dashboard/overview"><ArrowLeft className="size-4" />Return to dashboard</Link>
                </Button>
        </main>
    );
}
