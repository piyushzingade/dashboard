"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    ArrowDownLeft,
    ArrowUpRight,
    ArrowRightLeft,
    Search,
    Filter,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Mock Data ─── */

type Transaction = {
    id: string;
    description: string;
    category: string;
    amount: number;
    type: "income" | "expense";
    status: "completed" | "pending" | "failed";
    date: string;
    initials: string;
};

const transactions: Transaction[] = [
    { id: "TXN-001", description: "Payment from Acme Corp", category: "Invoice", amount: 4500.0, type: "income", status: "completed", date: "2025-03-10", initials: "AC" },
    { id: "TXN-002", description: "AWS Hosting Services", category: "Infrastructure", amount: 2340.0, type: "expense", status: "completed", date: "2025-03-09", initials: "AW" },
    { id: "TXN-003", description: "Stripe Payout", category: "Payment", amount: 8920.5, type: "income", status: "completed", date: "2025-03-08", initials: "SP" },
    { id: "TXN-004", description: "Figma Team License", category: "Software", amount: 150.0, type: "expense", status: "completed", date: "2025-03-08", initials: "FG" },
    { id: "TXN-005", description: "Client Deposit — Wave Studio", category: "Invoice", amount: 12000.0, type: "income", status: "pending", date: "2025-03-07", initials: "WS" },
    { id: "TXN-006", description: "Google Workspace", category: "Software", amount: 72.0, type: "expense", status: "completed", date: "2025-03-06", initials: "GW" },
    { id: "TXN-007", description: "Refund — Order #4821", category: "Refund", amount: 320.0, type: "expense", status: "failed", date: "2025-03-05", initials: "RF" },
    { id: "TXN-008", description: "Freelance Payment — Design", category: "Invoice", amount: 3200.0, type: "income", status: "completed", date: "2025-03-04", initials: "FP" },
    { id: "TXN-009", description: "Vercel Pro Plan", category: "Infrastructure", amount: 20.0, type: "expense", status: "completed", date: "2025-03-03", initials: "VC" },
    { id: "TXN-010", description: "Shopify Revenue", category: "Payment", amount: 6450.0, type: "income", status: "pending", date: "2025-03-02", initials: "SH" },
    { id: "TXN-011", description: "Notion Team Plan", category: "Software", amount: 96.0, type: "expense", status: "completed", date: "2025-03-01", initials: "NT" },
    { id: "TXN-012", description: "Payment from GlobalTech", category: "Invoice", amount: 7800.0, type: "income", status: "completed", date: "2025-02-28", initials: "GT" },
];

const tabs = [
    { key: "all", label: "All" },
    { key: "income", label: "Income" },
    { key: "expense", label: "Expense" },
] as const;

const statusStyles: Record<string, string> = {
    completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    failed: "bg-red-500/10 text-red-500",
};

/* ─── Component ─── */

export default function TransactionsPage() {
    const [activeTab, setActiveTab] = useState<"all" | "income" | "expense">("all");
    const [search, setSearch] = useState("");

    const filtered = transactions.filter((t) => {
        const matchesTab = activeTab === "all" || t.type === activeTab;
        const matchesSearch =
            !search ||
            t.description.toLowerCase().includes(search.toLowerCase()) ||
            t.id.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    // Quick stats
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:p-6 md:pb-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80">
                        <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                        <h1 className="font-heading text-2xl font-bold tracking-tight">
                            Transactions
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Track all incoming and outgoing payments.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06, ease }}
                className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
                <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                    <CardContent className="pt-5">
                        <p className="text-xs text-muted-foreground">Total transactions</p>
                        <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight">
                            {transactions.length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                    <CardContent className="pt-5">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <ArrowDownLeft className="h-3 w-3 text-emerald-500" />
                            Income
                        </p>
                        <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-emerald-600 dark:text-emerald-400">
                            ${totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                    </CardContent>
                </Card>
                <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                    <CardContent className="pt-5">
                        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <ArrowUpRight className="h-3 w-3 text-red-500" />
                            Expenses
                        </p>
                        <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-red-500">
                            ${totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12, ease }}
                className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
                {/* Tabs */}
                <div className="flex gap-1 rounded-lg bg-secondary/50 p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                                activeTab === tab.key
                                    ? "bg-background text-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search transactions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-9 pl-9 text-sm"
                    />
                </div>
            </motion.div>

            {/* Transaction List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease }}
            >
                <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10">
                    <CardContent className="p-0">
                        {/* Table header */}
                        <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border/50 px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground/70 sm:grid-cols-[2fr_1fr_auto_auto_auto]">
                            <span>Transaction</span>
                            <span className="hidden sm:block">Category</span>
                            <span>Status</span>
                            <span className="text-right">Amount</span>
                            <span className="text-right">Date</span>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-border/30">
                            {filtered.map((txn, i) => (
                                <motion.div
                                    key={txn.id}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.2 + i * 0.025,
                                        ease,
                                    }}
                                    className="group grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 px-4 py-3 transition-colors duration-150 hover:bg-secondary/30 sm:grid-cols-[2fr_1fr_auto_auto_auto]"
                                >
                                    {/* Name */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <Avatar className="h-8 w-8 shrink-0">
                                            <AvatarFallback className="text-[10px] font-medium bg-secondary">
                                                {txn.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">
                                                {txn.description}
                                            </p>
                                            <p className="text-[11px] text-muted-foreground sm:hidden">
                                                {txn.category}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <span className="hidden text-xs text-muted-foreground sm:block">
                                        {txn.category}
                                    </span>

                                    {/* Status */}
                                    <Badge
                                        variant="outline"
                                        className={`border-none text-[10px] capitalize ${statusStyles[txn.status]}`}
                                    >
                                        {txn.status}
                                    </Badge>

                                    {/* Amount */}
                                    <span
                                        className={`text-right font-mono text-sm tabular-nums font-medium ${
                                            txn.type === "income"
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : "text-foreground"
                                        }`}
                                    >
                                        {txn.type === "income" ? "+" : "-"}$
                                        {txn.amount.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                        })}
                                    </span>

                                    {/* Date */}
                                    <span className="text-right text-xs tabular-nums text-muted-foreground">
                                        {txn.date}
                                    </span>
                                </motion.div>
                            ))}

                            {filtered.length === 0 && (
                                <div className="py-12 text-center text-sm text-muted-foreground">
                                    No transactions found.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
