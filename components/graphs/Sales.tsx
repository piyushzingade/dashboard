"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { motion } from "motion/react";

const ease = [0.23, 1, 0.32, 1] as const;

const salesData = [
    {
        name: "Emma Johnson",
        email: "emma.johnson@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/1.png",
        fallback: "EJ",
        amount: "+$2,500.00",
    },
    {
        name: "Liam Smith",
        email: "liam.smith@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/2.png",
        fallback: "LS",
        amount: "+$150.00",
    },
    {
        name: "Ava Brown",
        email: "ava.brown@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/3.png",
        fallback: "AB",
        amount: "+$450.00",
    },
    {
        name: "Noah Wilson",
        email: "noah.wilson@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/4.png",
        fallback: "NW",
        amount: "+$75.00",
    },
    {
        name: "Sophia Taylor",
        email: "sophia.taylor@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/5.png",
        fallback: "ST",
        amount: "+$320.00",
    },
    {
        name: "Mason Anderson",
        email: "mason.anderson@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/6.png",
        fallback: "MA",
        amount: "+$180.00",
    },
    {
        name: "Isabella Thomas",
        email: "isabella.thomas@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/7.png",
        fallback: "IT",
        amount: "+$90.00",
    },
    {
        name: "Ethan Garcia",
        email: "ethan.garcia@email.com",
        avatar: "https://api.slingacademy.com/public/sample-users/8.png",
        fallback: "EG",
        amount: "+$600.00",
    },
];

export function RecentSales() {
    return (
        <Card className="group transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md dark:hover:border-foreground/10">
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                    You made 265 sales this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    {salesData.map((sale, index) => (
                        <motion.div
                            key={sale.email}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.35,
                                delay: 0.3 + index * 0.04,
                                ease,
                            }}
                            className="group/row -mx-2 flex items-center rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-secondary/50"
                        >
                            <Avatar className="h-8 w-8 ring-2 ring-transparent transition-[ring-color] duration-200 group-hover/row:ring-border/50">
                                <AvatarImage src={sale.avatar} alt={sale.name} />
                                <AvatarFallback>{sale.fallback}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3 min-w-0 space-y-0.5">
                                <p className="truncate text-sm font-medium leading-none">
                                    {sale.name}
                                </p>
                                <p className="truncate text-xs text-muted-foreground">
                                    {sale.email}
                                </p>
                            </div>
                            <div className="ml-auto pl-2 font-mono text-sm font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                                {sale.amount}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
