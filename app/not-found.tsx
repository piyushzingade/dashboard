"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">

            {/* Glow Circle */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
            >
                <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full" />
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-7xl font-bold text-primary drop-shadow-sm"
                >
                    404
                </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-4 text-xl text-muted-foreground max-w-md"
            >
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </motion.p>

            {/* Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link
                    href="/dashboard/overview"
                    className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium shadow-md hover:bg-primary/90 transition"
                >
                    <ArrowLeft size={18} />
                    Return Home
                </Link>
            </motion.div>
        </div>
    );
}
