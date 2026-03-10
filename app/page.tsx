import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Preview } from "@/components/landing/preview"

export default function Page() {
    return (
        <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground dot-grid">
            <Navbar />
            <HeroSection />
            <Features />
            <HowItWorks />
            <Preview />

            {/* ─── CTA ─── */}
            <section className="px-6 py-28 text-center sm:py-36">
                <div className="mx-auto max-w-lg">
                    <p className="mb-4 text-sm font-medium tracking-widest uppercase text-emerald-600 dark:text-emerald-400">
                        Get started
                    </p>
                    <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Ready to build?
                    </h2>
                    <p className="mx-auto mt-4 max-w-sm text-base text-muted-foreground">
                        One command. Full dashboard. Start shipping today.
                    </p>
                    <div className="mt-8">
                        <Button
                            asChild
                            size="lg"
                            className="gap-2 rounded-xl bg-emerald-600 px-8 text-white hover:bg-emerald-700 active:scale-[0.97] dark:bg-emerald-500 dark:hover:bg-emerald-600"
                        >
                            <Link href="/dashboard/overview">
                                Open Dashboard
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* ─── Footer ─── */}
            <footer className="border-t border-border/20">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
                    <span>
                        Made by{" "}
                        <Link
                            href="https://github.com/piyushzingade"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-foreground transition-opacity duration-150 hover:opacity-70"
                        >
                            Piyush Zingade
                        </Link>
                    </span>
                    <span className="text-muted-foreground/50">
                        NexUI Dashboard
                    </span>
                </div>
            </footer>
        </main>
    )
}
