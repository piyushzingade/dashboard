import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Preview } from "@/components/landing/preview"

export default function Page() {
    return (
        <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
            <Navbar />
            <HeroSection />
            <Features />
            <Preview />

            {/* Footer */}
            <footer className="border-t border-border/30">
                <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-muted-foreground">
                    Made with <span className="mx-0.5">&#10084;&#65039;</span> by{" "}
                    <Link
                        href="https://github.com/piyushzingade"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground transition-opacity hover:opacity-70"
                    >
                        Piyush Zingade
                    </Link>
                </div>
            </footer>
        </main>
    )
}
