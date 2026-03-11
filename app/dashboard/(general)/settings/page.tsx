"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
    Settings2,
    Bell,
    Palette,
    Shield,
    Globe,
    Save,
    Check,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Toggle Component ─── */

function Toggle({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
                checked ? "bg-foreground" : "bg-border"
            }`}
        >
            <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-background shadow-sm transition-transform duration-200 ${
                    checked ? "translate-x-[18px]" : "translate-x-[3px]"
                }`}
            />
        </button>
    );
}

/* ─── Component ─── */

export default function SettingsPage() {
    const [saved, setSaved] = useState(false);
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: false,
        security: true,
    });

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:p-6 md:pb-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80">
                        <Settings2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                        <h1 className="font-heading text-2xl font-bold tracking-tight">
                            Settings
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Customize your dashboard experience.
                        </p>
                    </div>
                </div>
                <Button
                    size="sm"
                    className="mt-3 gap-2 transition-transform duration-150 active:scale-[0.97] sm:mt-0"
                    onClick={handleSave}
                >
                    {saved ? (
                        <>
                            <Check className="h-3.5 w-3.5" />
                            Saved
                        </>
                    ) : (
                        <>
                            <Save className="h-3.5 w-3.5" />
                            Save changes
                        </>
                    )}
                </Button>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* General */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.06, ease }}
                >
                    <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-base">General</CardTitle>
                            </div>
                            <CardDescription>
                                Basic application preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="siteName" className="text-sm">
                                    Site name
                                </Label>
                                <Input
                                    id="siteName"
                                    defaultValue="NexUI Dashboard"
                                    className="h-9"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language" className="text-sm">
                                    Language
                                </Label>
                                <Select defaultValue="en">
                                    <SelectTrigger id="language" className="h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                        <SelectItem value="fr">French</SelectItem>
                                        <SelectItem value="de">German</SelectItem>
                                        <SelectItem value="ja">Japanese</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone" className="text-sm">
                                    Timezone
                                </Label>
                                <Select defaultValue="ist">
                                    <SelectTrigger id="timezone" className="h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ist">Asia/Kolkata (IST)</SelectItem>
                                        <SelectItem value="utc">UTC</SelectItem>
                                        <SelectItem value="pst">America/Los_Angeles (PST)</SelectItem>
                                        <SelectItem value="est">America/New_York (EST)</SelectItem>
                                        <SelectItem value="cet">Europe/Berlin (CET)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.12, ease }}
                >
                    <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Bell className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-base">Notifications</CardTitle>
                            </div>
                            <CardDescription>
                                Choose how you want to be notified
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-1">
                            {[
                                {
                                    key: "email" as const,
                                    label: "Email notifications",
                                    description: "Receive updates via email",
                                },
                                {
                                    key: "push" as const,
                                    label: "Push notifications",
                                    description: "Browser push alerts",
                                },
                                {
                                    key: "marketing" as const,
                                    label: "Marketing emails",
                                    description: "Product news and updates",
                                },
                                {
                                    key: "security" as const,
                                    label: "Security alerts",
                                    description: "Login attempts and changes",
                                },
                            ].map((item) => (
                                <div
                                    key={item.key}
                                    className="-mx-2 flex items-center justify-between rounded-lg px-2 py-3 transition-colors duration-150 hover:bg-secondary/40"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            {item.label}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                    <Toggle
                                        checked={notifications[item.key]}
                                        onChange={(v) =>
                                            setNotifications((prev) => ({
                                                ...prev,
                                                [item.key]: v,
                                            }))
                                        }
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Appearance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.18, ease }}
                >
                    <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Palette className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-base">Appearance</CardTitle>
                            </div>
                            <CardDescription>
                                Customize the look and feel
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm">Density</Label>
                                <Select defaultValue="default">
                                    <SelectTrigger className="h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="compact">Compact</SelectItem>
                                        <SelectItem value="default">Default</SelectItem>
                                        <SelectItem value="comfortable">Comfortable</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">Font size</Label>
                                <Select defaultValue="14">
                                    <SelectTrigger className="h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="12">Small (12px)</SelectItem>
                                        <SelectItem value="14">Default (14px)</SelectItem>
                                        <SelectItem value="16">Large (16px)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.24, ease }}
                >
                    <Card className="transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <CardTitle className="text-base">Security</CardTitle>
                            </div>
                            <CardDescription>
                                Protect your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword" className="text-sm">
                                    Current password
                                </Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-9"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-sm">
                                    New password
                                </Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-9"
                                />
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full transition-transform duration-150 active:scale-[0.97]"
                            >
                                Update password
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
