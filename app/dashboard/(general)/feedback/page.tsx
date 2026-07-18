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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/dashboard/page-header";
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
    "Under review": "bg-warning/10 text-warning",
    "In progress": "bg-secondary text-foreground",
    Acknowledged: "bg-positive/10 text-positive",
    Planned: "bg-secondary text-muted-foreground",
    Fixed: "bg-positive/10 text-positive",
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
        <div className="flex gap-1" role="radiogroup" aria-label="Overall experience">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => onChange(star)}
                    role="radio"
                    aria-checked={value === star}
                    aria-label={`${star} star${star === 1 ? "" : "s"}`}
                    className="flex size-11 items-center justify-center rounded-lg outline-none transition-colors duration-150 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <Star
                        className={`h-6 w-6 transition-colors duration-150 ${
                            star <= (hovered || value)
                                ? "fill-warning text-warning"
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
        <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:p-6 md:pb-10 xl:p-8 xl:pb-12">
            <PageHeader title="Feedback" description="Share product ideas, report issues, and help shape the next release." icon={MessageSquareHeart} />

            <div className="grid gap-4 md:grid-cols-2">
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
                                            type="button"
                                            aria-pressed={selectedType === ft.key}
                                            className={`flex min-h-20 items-start gap-2.5 rounded-lg border p-3 text-left outline-none transition-[background-color,border-color] duration-150 focus-visible:ring-2 focus-visible:ring-ring ${
                                                selectedType === ft.key
                                                    ? "border-foreground/25 bg-secondary/70"
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
                        <form onSubmit={(event) => { event.preventDefault(); handleSubmit(); }}>
                        <Card>
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
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="page" className="text-sm">
                                        Related page
                                    </Label>
                                    <Select>
                                        <SelectTrigger
                                            id="page"
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
                                    <Textarea
                                        id="description"
                                        rows={4}
                                        placeholder="Tell us more about your feedback…"
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
                                    type="submit"
                                    className="w-full gap-2"
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
                        </form>
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
