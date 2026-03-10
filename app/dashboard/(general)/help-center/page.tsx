"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    HelpCircle,
    Search,
    BookOpen,
    MessageSquare,
    Zap,
    Shield,
    CreditCard,
    Users,
    ChevronDown,
    ExternalLink,
    Mail,
    ArrowRight,
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
import { Input } from "@/components/ui/input";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Data ─── */

const categories = [
    {
        icon: Zap,
        label: "Getting Started",
        description: "Quick setup guides and tutorials",
        articles: 12,
    },
    {
        icon: Users,
        label: "Account & Teams",
        description: "Manage users, roles, and permissions",
        articles: 8,
    },
    {
        icon: CreditCard,
        label: "Billing & Plans",
        description: "Payments, invoices, and subscriptions",
        articles: 6,
    },
    {
        icon: Shield,
        label: "Security & Privacy",
        description: "Two-factor auth, data protection",
        articles: 9,
    },
    {
        icon: BookOpen,
        label: "API & Integrations",
        description: "REST API, webhooks, and third-party apps",
        articles: 15,
    },
    {
        icon: MessageSquare,
        label: "Troubleshooting",
        description: "Common issues and error resolution",
        articles: 11,
    },
];

type FAQItem = {
    question: string;
    answer: string;
};

const faqs: FAQItem[] = [
    {
        question: "How do I reset my password?",
        answer: 'Navigate to Settings → Security and click "Update password." Enter your current password, set a new one, and save your changes. If you\'ve forgotten your password, use the "Forgot password" link on the login screen.',
    },
    {
        question: "Can I upgrade or downgrade my plan at any time?",
        answer: "Yes. Go to Billing → Plans and select the plan you'd like. Upgrades take effect immediately with prorated billing. Downgrades take effect at the end of your current billing cycle.",
    },
    {
        question: "How do I invite team members?",
        answer: "Open Settings → Team and click \"Invite member.\" Enter their email address and choose a role (Admin, Editor, or Viewer). They'll receive an invitation email with a link to join your workspace.",
    },
    {
        question: "What data export formats are supported?",
        answer: "We support CSV, JSON, and PDF exports. Navigate to Reports → Export, select your date range and preferred format, then click Download. Large exports are processed in the background and delivered via email.",
    },
    {
        question: "Is there a rate limit on the API?",
        answer: "Free plans allow 500 requests per month. Pro plans include 50,000 requests per month. If you need higher limits, contact our sales team for an Enterprise plan with custom quotas.",
    },
];

/* ─── Accordion Item ─── */

function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24 + index * 0.04, ease }}
        >
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-left transition-colors duration-150 hover:bg-secondary/50"
            >
                <span className="pr-4 text-sm font-medium">
                    {item.question}
                </span>
                <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                className={`grid transition-all duration-200 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <p className="px-4 pb-3 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Component ─── */

export default function HelpCenterPage() {
    const [search, setSearch] = useState("");

    const filteredCategories = categories.filter(
        (c) =>
            !search ||
            c.label.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
    );

    const filteredFaqs = faqs.filter(
        (f) =>
            !search ||
            f.question.toLowerCase().includes(search.toLowerCase()) ||
            f.answer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col gap-4"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80">
                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                        <h1 className="font-heading text-2xl font-bold tracking-tight">
                            Help Center
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Find answers, browse guides, and get support.
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search help articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-10 pl-10 text-sm"
                    />
                </div>
            </motion.div>

            {/* Categories Grid */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06, ease }}
            >
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCategories.map((cat, i) => (
                        <motion.div
                            key={cat.label}
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                delay: 0.1 + i * 0.04,
                                ease,
                            }}
                        >
                            <Card className="group cursor-pointer transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                                <CardContent className="flex items-start gap-3 pt-5">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/80 transition-colors duration-200 group-hover:bg-secondary">
                                        <cat.icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium">
                                                {cat.label}
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className="border-none bg-secondary/80 text-[10px] text-muted-foreground"
                                            >
                                                {cat.articles}
                                            </Badge>
                                        </div>
                                        <p className="mt-0.5 text-xs text-muted-foreground">
                                            {cat.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
                {filteredCategories.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        No categories match your search.
                    </p>
                )}
            </motion.div>

            {/* FAQ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease }}
            >
                <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                    <CardHeader>
                        <CardTitle className="text-base">
                            Frequently Asked Questions
                        </CardTitle>
                        <CardDescription>
                            Quick answers to common questions
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1 pt-0">
                        {filteredFaqs.map((faq, i) => (
                            <AccordionItem key={i} item={faq} index={i} />
                        ))}
                        {filteredFaqs.length === 0 && (
                            <p className="py-6 text-center text-sm text-muted-foreground">
                                No FAQs match your search.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Contact Support */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26, ease }}
            >
                <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                    <CardContent className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:text-left">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/80">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-heading text-base font-semibold tracking-tight">
                                Still need help?
                            </p>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                Our support team typically responds within 2
                                hours during business days.
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2 transition-transform duration-150 active:scale-[0.97]"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Docs
                            </Button>
                            <Button
                                size="sm"
                                className="gap-2 transition-transform duration-150 active:scale-[0.97]"
                            >
                                Contact support
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
