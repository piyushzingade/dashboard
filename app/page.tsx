"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Copy, Check, ArrowRight, Terminal, Github, Twitter } from "lucide-react"

const CLI_COMMAND = "npx nexui-dashboard [project-name]"

export default function HomePage() {
  return <Hero />
}

function Hero() {
  const [copied, setCopied] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(CLI_COMMAND)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { }
  }

  useEffect(() => {
    videoRef.current?.play().catch(() => { })
  }, [])

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col overflow-y-auto">
      {/* TOP BAR */}
      <nav className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            NexUI Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link href="https://github.com/piyushzingade" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="gap-1">
              <Link href="https://x.com" target="_blank" rel="noreferrer">
                <Twitter className="h-4 w-4" />
                <span className="hidden sm:inline">X</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <section className="flex-1">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 py-16 sm:px-6 lg:py-24">
          {/* TEXT */}
          <div className="max-w-3xl text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
              Launch your dashboard in one command
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed text-pretty">
              A clean, production-ready dashboard generated instantly.
              No setup, no boilerplate — just run the command and start building.
            </p>

            {/* CTA */}
            <div className="flex justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/dashboard">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* CLI BOX */}
            <div className="mx-auto max-w-lg space-y-2">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
                <div className="flex flex-1 items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary">
                    <Terminal className="h-4 w-4 text-foreground" />
                  </div>
                  <code className="truncate text-sm font-mono">{CLI_COMMAND}</code>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="rounded-xl border border-border bg-secondary hover:bg-accent"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Copy the command to generate your dashboard instantly.
              </p>
            </div>
          </div>

          {/* VIDEO */}
          <div className="relative flex justify-center w-full pb-10">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl max-w-4xl w-full">
              {/* top bar */}
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-600" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                </div>
                <span className="text-xs text-muted-foreground">Preview</span>
              </div>

              {/* video */}
              <div className="bg-secondary h-[520px]">
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  loop
                  muted
                  autoPlay
                  playsInline
                >
                  <source
                    src="https://res.cloudinary.com/dbvotc5ja/video/upload/v1764160295/dashboard_yopesg.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* floating tag */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-2xl border border-border bg-card px-3 py-2 text-xs text-muted-foreground shadow-lg">
              Ready in <span className="font-semibold text-foreground">10 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground">
          Made with <span className="mx-1">❤️</span> by{" "}
          <Link
            href="https://github.com/piyushzingade"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            Piyush Zingade
          </Link>
        </div>
      </footer>
    </div>
  )
}
