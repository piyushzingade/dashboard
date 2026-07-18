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
import { PageHeader } from "@/components/dashboard/page-header";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Toggle Component ─── */

function Toggle({
    checked,
    onChange,
    label,
}: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
}) {
    return (
        <button
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className="relative inline-flex size-11 shrink-0 items-center rounded-lg bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            <span
                aria-hidden="true"
                className={`absolute left-1 top-1/2 h-5 w-9 -translate-y-1/2 rounded-full transition-colors duration-200 ${checked ? "bg-foreground" : "bg-border"}`}
            />
            <span
                aria-hidden="true"
                className={`absolute left-1 top-1/2 size-4 -translate-y-1/2 rounded-full bg-background transition-transform duration-200 ${
                    checked ? "translate-x-5" : "translate-x-0.5"
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
        <div className="flex flex-1 flex-col gap-6 p-4 pb-8 md:p-6 md:pb-10 xl:p-8 xl:pb-12">
            <PageHeader
                title="Settings"
                description="Configure workspace behavior, notifications, appearance, and security."
                icon={Settings2}
                actions={
                <Button
                    size="sm"
                    className="gap-2"
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
                }
            />

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
                                        label={item.label}
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
