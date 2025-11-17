"use client";
import { Rocket } from "lucide-react";
import { motion } from "motion/react";
import { CardContent } from "@/components/ui/card";

export function UpdateSoon() {
    return (
        <div className="w-full flex justify-center items-center max-w-md mx-auto border-dashed">
            <CardContent className="flex flex-col items-center justify-center gap-6 p-8 text-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.8
                    }}
                    className="p-4 rounded-full bg-primary/10"
                >
                    <Rocket className="h-12 w-12 text-primary" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-2"
                >
                    <h2 className="text-2xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Coming Soon
                    </h2>
                    <p className="text-muted-foreground">
                        We're working hard to bring you this amazing feature. Stay tuned!
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span>In Development</span>
                </motion.div>
            </CardContent>
        </div>
    );
}