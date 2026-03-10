"use client";

import { motion } from "motion/react";
import {
    CreditCard,
    Check,
    Zap,
    Crown,
    Download,
    ArrowUpRight,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Mock Data ─── */

const plans = [
    {
        name: "Free",
        price: "$0",
        period: "/month",
        description: "For individuals getting started",
        features: ["1 project", "500 API requests/mo", "Community support", "Basic analytics"],
        current: false,
        icon: Zap,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/month",
        description: "For growing teams and businesses",
        features: ["Unlimited projects", "50K API requests/mo", "Priority support", "Advanced analytics", "Custom domains", "Team members"],
        current: true,
        icon: Crown,
        popular: true,
    },
];

const invoices = [
    { id: "INV-2025-003", date: "Mar 1, 2025", amount: "$29.00", status: "Paid" },
    { id: "INV-2025-002", date: "Feb 1, 2025", amount: "$29.00", status: "Paid" },
    { id: "INV-2025-001", date: "Jan 1, 2025", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-012", date: "Dec 1, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-2024-011", date: "Nov 1, 2024", amount: "$29.00", status: "Paid" },
];

const usage = [
    { label: "API Requests", used: 32450, limit: 50000 },
    { label: "Storage", used: 4.2, limit: 10, unit: "GB" },
    { label: "Team Members", used: 5, limit: 10 },
];

/* ─── Component ─── */

export default function BillingPage() {
    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="flex items-center gap-3"
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    <h1 className="font-heading text-2xl font-bold tracking-tight">
                        Billing
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your subscription, usage, and invoices.
                    </p>
                </div>
            </motion.div>

            {/* Plans */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06, ease }}
            >
                <div className="grid gap-4 sm:grid-cols-2">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`group relative overflow-hidden transition-[border-color,box-shadow] duration-200 hover:shadow-md ${
                                plan.current
                                    ? "border-foreground/15 shadow-sm"
                                    : "hover:border-foreground/10"
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute right-4 top-4">
                                    <Badge className="border-none bg-foreground text-background text-[10px]">
                                        Current plan
                                    </Badge>
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/80">
                                        <plan.icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <CardTitle className="text-base">
                                        {plan.name}
                                    </CardTitle>
                                </div>
                                <CardDescription>{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <span className="text-3xl font-bold tracking-tight">
                                        {plan.price}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {plan.period}
                                    </span>
                                </div>
                                <ul className="space-y-2">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-center gap-2 text-sm text-muted-foreground"
                                        >
                                            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    variant={plan.current ? "outline" : "default"}
                                    size="sm"
                                    className="mt-5 w-full gap-2 transition-transform duration-150 active:scale-[0.97]"
                                    disabled={plan.current}
                                >
                                    {plan.current ? "Current plan" : "Upgrade"}
                                    {!plan.current && (
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>

            {/* Usage + Payment */}
            <div className="grid gap-4 lg:grid-cols-2">
                {/* Usage */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.14, ease }}
                >
                    <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">Usage</CardTitle>
                            <CardDescription>
                                Current billing period usage
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {usage.map((item) => {
                                const pct = Math.round((item.used / item.limit) * 100);
                                return (
                                    <div key={item.label}>
                                        <div className="mb-1.5 flex items-center justify-between text-sm">
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                            <span className="tabular-nums text-muted-foreground">
                                                {item.used.toLocaleString()}
                                                {item.unit ? ` ${item.unit}` : ""} /{" "}
                                                {item.limit.toLocaleString()}
                                                {item.unit ? ` ${item.unit}` : ""}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: 0.3,
                                                    ease,
                                                }}
                                                className={`h-full rounded-full ${
                                                    pct > 80
                                                        ? "bg-amber-500"
                                                        : "bg-foreground/80"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Payment Method */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.18, ease }}
                >
                    <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Payment Method
                            </CardTitle>
                            <CardDescription>
                                Your current payment information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4 rounded-lg border border-border/50 bg-secondary/30 p-4">
                                <div className="flex h-10 w-14 items-center justify-center rounded-md bg-gradient-to-br from-foreground/80 to-foreground text-background">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium">
                                        Visa ending in 4242
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Expires 12/2027
                                    </p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="ml-auto border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                >
                                    Default
                                </Badge>
                            </div>

                            <Separator className="my-4" />

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 transition-transform duration-150 active:scale-[0.97]"
                                >
                                    Update card
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 text-destructive hover:text-destructive transition-transform duration-150 active:scale-[0.97]"
                                >
                                    Remove
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Invoices */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24, ease }}
            >
                <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10">
                    <CardHeader>
                        <CardTitle className="text-base">
                            Invoice History
                        </CardTitle>
                        <CardDescription>
                            Download past invoices for your records
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/30">
                            {invoices.map((inv, i) => (
                                <motion.div
                                    key={inv.id}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.28 + i * 0.03,
                                        ease,
                                    }}
                                    className="flex items-center justify-between px-4 py-3 transition-colors duration-150 hover:bg-secondary/30 sm:px-6"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {inv.id}
                                        </span>
                                        <span className="text-sm">
                                            {inv.date}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-sm font-medium tabular-nums">
                                            {inv.amount}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="border-none bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400"
                                        >
                                            {inv.status}
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
