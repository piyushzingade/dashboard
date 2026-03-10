"use client";

import { motion } from "motion/react";
import {
    User,
    Mail,
    MapPin,
    Globe,
    Calendar,
    Github,
    Twitter,
    Briefcase,
    Edit3,
    ShieldCheck,
    Activity,
    FileText,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Mock Data ─── */

const profile = {
    name: "Piyush Zingade",
    email: "piyush@example.com",
    role: "Admin",
    avatar: "",
    initials: "PZ",
    location: "India",
    website: "piyush.dev",
    bio: "Full-stack developer passionate about building elegant, performant web applications. Focused on React, Next.js, and TypeScript.",
    joinedDate: "March 2024",
    company: "NexUI",
    github: "piyushzingade",
    twitter: "@piyushz",
};

const activityStats = [
    { label: "Projects", value: "12", icon: Briefcase },
    { label: "Commits", value: "847", icon: Activity },
    { label: "Reports", value: "36", icon: FileText },
];

const recentActivity = [
    { action: "Updated dashboard overview page", time: "2 hours ago" },
    { action: "Created new product listing", time: "5 hours ago" },
    { action: "Deployed to production", time: "1 day ago" },
    { action: "Added authentication flow", time: "2 days ago" },
    { action: "Resolved 3 open issues", time: "3 days ago" },
];

/* ─── Component ─── */

export default function ProfilePage() {
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
                    <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                    <h1 className="font-heading text-2xl font-bold tracking-tight">
                        Profile
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Manage your account information and preferences.
                    </p>
                </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                {/* Left — Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08, ease }}
                    className="flex flex-col gap-4"
                >
                    <Card className="group overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        {/* Banner */}
                        <div className="relative h-24 bg-gradient-to-br from-secondary via-secondary/80 to-secondary/40">
                            <div className="absolute -bottom-10 left-5">
                                <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                                    <AvatarImage src={profile.avatar} />
                                    <AvatarFallback className="bg-foreground text-background text-xl font-bold">
                                        {profile.initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        <CardContent className="pt-14">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="font-heading text-lg font-bold tracking-tight">
                                        {profile.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {profile.email}
                                    </p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                >
                                    <ShieldCheck className="h-3 w-3" />
                                    {profile.role}
                                </Badge>
                            </div>

                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                {profile.bio}
                            </p>

                            <Separator className="my-4" />

                            {/* Info rows */}
                            <div className="space-y-3">
                                {[
                                    { icon: Briefcase, text: profile.company },
                                    { icon: MapPin, text: profile.location },
                                    { icon: Globe, text: profile.website },
                                    { icon: Calendar, text: `Joined ${profile.joinedDate}` },
                                    { icon: Github, text: profile.github },
                                    { icon: Twitter, text: profile.twitter },
                                ].map(({ icon: Icon, text }) => (
                                    <div
                                        key={text}
                                        className="flex items-center gap-2.5 text-sm"
                                    >
                                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-muted-foreground">
                                            {text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-5 w-full gap-2 transition-transform duration-150 active:scale-[0.97]"
                            >
                                <Edit3 className="h-3.5 w-3.5" />
                                Edit profile
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Activity Stats */}
                    <div className="grid grid-cols-3 gap-3">
                        {activityStats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.16 + i * 0.05,
                                    ease,
                                }}
                            >
                                <Card className="text-center transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-sm">
                                    <CardContent className="flex flex-col items-center gap-1 pt-5">
                                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-xl font-semibold tabular-nums tracking-tight">
                                            {stat.value}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground">
                                            {stat.label}
                                        </span>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right — Details */}
                <div className="flex flex-col gap-4">
                    {/* Account Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.14, ease }}
                    >
                        <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Account Details
                                </CardTitle>
                                <CardDescription>
                                    Your personal information and preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {[
                                        { label: "Full Name", value: profile.name },
                                        { label: "Email", value: profile.email },
                                        { label: "Role", value: profile.role },
                                        { label: "Company", value: profile.company },
                                        { label: "Location", value: profile.location },
                                        { label: "Website", value: profile.website },
                                    ].map((field) => (
                                        <div key={field.label}>
                                            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                                                {field.label}
                                            </p>
                                            <p className="mt-1 text-sm font-medium">
                                                {field.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease }}
                    >
                        <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Recent Activity
                                </CardTitle>
                                <CardDescription>
                                    Your latest actions and updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-1">
                                    {recentActivity.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -6 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: 0.25 + i * 0.04,
                                                ease,
                                            }}
                                            className="-mx-2 flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-secondary/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary">
                                                    <Activity className="h-3 w-3 text-muted-foreground" />
                                                </div>
                                                <span className="text-sm">
                                                    {item.action}
                                                </span>
                                            </div>
                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                {item.time}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
