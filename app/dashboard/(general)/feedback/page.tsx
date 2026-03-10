"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    MessageSquareHeart,
    Star,
    Send,
    Check,
    Bug,
    Lightbulb,
    ThumbsUp,
    MessageCircle,
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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Data ─── */

const feedbackTypes = [
    {
        key: "bug",
        label: "Bug Report",
        icon: Bug,
        description: "Something isn't working as expected",
    },
    {
        key: "feature",
        label: "Feature Request",
        icon: Lightbulb,
        description: "Suggest a new feature or improvement",
    },
    {
        key: "praise",
        label: "Praise",
        icon: ThumbsUp,
        description: "Let us know what you love",
    },
    {
        key: "other",
        label: "Other",
        icon: MessageCircle,
        description: "General feedback or comments",
    },
];

const recentFeedback = [
    {
        type: "feature",
        title: "Dark mode calendar view",
        status: "Under review",
        date: "2 days ago",
    },
    {
        type: "bug",
        title: "Chart tooltip misaligned on mobile",
        status: "In progress",
        date: "4 days ago",
    },
    {
        type: "praise",
        title: "Love the new kanban board design",
        status: "Acknowledged",
        date: "1 week ago",
    },
    {
        type: "feature",
        title: "Export reports as PDF",
        status: "Planned",
        date: "1 week ago",
    },
    {
        type: "bug",
        title: "Notification sound plays twice",
        status: "Fixed",
        date: "2 weeks ago",
    },
];

const statusStyles: Record<string, string> = {
    "Under review": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    "In progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    Acknowledged: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Planned: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    Fixed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

const typeIcons: Record<string, typeof Bug> = {
    bug: Bug,
    feature: Lightbulb,
    praise: ThumbsUp,
    other: MessageCircle,
};

/* ─── Star Rating ─── */

function StarRating({
    value,
    onChange,
}: {
    value: number;
    onChange: (v: number) => void;
}) {
    const [hovered, setHovered] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => onChange(star)}
                    className="rounded-md p-0.5 transition-transform duration-150 hover:scale-110 active:scale-95"
                >
                    <Star
                        className={`h-6 w-6 transition-colors duration-150 ${
                            star <= (hovered || value)
                                ? "fill-amber-400 text-amber-400"
                                : "text-border"
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}

/* ─── Component ─── */

export default function FeedbackPage() {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setSelectedType(null);
            setRating(0);
        }, 3000);
    };

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
                    <MessageSquareHeart className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    <h1 className="font-heading text-2xl font-bold tracking-tight">
                        Feedback
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Help us improve by sharing your thoughts.
                    </p>
                </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                {/* Left — Submit Feedback */}
                <div className="flex flex-col gap-4">
                    {/* Feedback Type */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.06, ease }}
                    >
                        <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                            <CardHeader>
                                <CardTitle className="text-base">
                                    What type of feedback?
                                </CardTitle>
                                <CardDescription>
                                    Select the category that best fits
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-2">
                                    {feedbackTypes.map((ft) => (
                                        <button
                                            key={ft.key}
                                            onClick={() =>
                                                setSelectedType(ft.key)
                                            }
                                            className={`flex items-start gap-2.5 rounded-lg border p-3 text-left transition-all duration-200 ${
                                                selectedType === ft.key
                                                    ? "border-foreground/20 bg-secondary/60 shadow-sm"
                                                    : "border-border/50 hover:border-foreground/10 hover:bg-secondary/30"
                                            }`}
                                        >
                                            <div
                                                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors duration-200 ${
                                                    selectedType === ft.key
                                                        ? "bg-foreground text-background"
                                                        : "bg-secondary/80 text-muted-foreground"
                                                }`}
                                            >
                                                <ft.icon className="h-3.5 w-3.5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium">
                                                    {ft.label}
                                                </p>
                                                <p className="text-[11px] text-muted-foreground">
                                                    {ft.description}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Feedback Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.12, ease }}
                    >
                        <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Details
                                </CardTitle>
                                <CardDescription>
                                    Provide as much detail as you can
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-sm">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        placeholder="Brief summary of your feedback"
                                        className="h-9"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="page" className="text-sm">
                                        Related page
                                    </Label>
                                    <Select>
                                        <SelectTrigger
                                            id="page"
                                            className="h-9"
                                        >
                                            <SelectValue placeholder="Select a page (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="overview">
                                                Overview
                                            </SelectItem>
                                            <SelectItem value="product">
                                                Product
                                            </SelectItem>
                                            <SelectItem value="kanban">
                                                Kanban
                                            </SelectItem>
                                            <SelectItem value="calendar">
                                                Calendar
                                            </SelectItem>
                                            <SelectItem value="reports">
                                                Reports
                                            </SelectItem>
                                            <SelectItem value="transactions">
                                                Transactions
                                            </SelectItem>
                                            <SelectItem value="settings">
                                                Settings
                                            </SelectItem>
                                            <SelectItem value="other">
                                                Other
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="description"
                                        className="text-sm"
                                    >
                                        Description
                                    </Label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        placeholder="Tell us more about your feedback..."
                                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm">
                                        Overall experience
                                    </Label>
                                    <StarRating
                                        value={rating}
                                        onChange={setRating}
                                    />
                                </div>

                                <Button
                                    size="sm"
                                    className="w-full gap-2 transition-transform duration-150 active:scale-[0.97]"
                                    onClick={handleSubmit}
                                    disabled={submitted}
                                >
                                    {submitted ? (
                                        <>
                                            <Check className="h-3.5 w-3.5" />
                                            Feedback submitted!
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-3.5 w-3.5" />
                                            Submit feedback
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Right — Recent Feedback */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.18, ease }}
                >
                    <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Recent Feedback
                            </CardTitle>
                            <CardDescription>
                                Track the status of your submissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            {recentFeedback.map((fb, i) => {
                                const Icon = typeIcons[fb.type] || MessageCircle;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -6 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.22 + i * 0.04,
                                            ease,
                                        }}
                                        className="-mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-3 transition-colors duration-150 hover:bg-secondary/40"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/80">
                                                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">
                                                    {fb.title}
                                                </p>
                                                <p className="text-[11px] text-muted-foreground">
                                                    {fb.date}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge
                                            variant="outline"
                                            className={`shrink-0 border-none text-[10px] ${
                                                statusStyles[fb.status] || ""
                                            }`}
                                        >
                                            {fb.status}
                                        </Badge>
                                    </motion.div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
