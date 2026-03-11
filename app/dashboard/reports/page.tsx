"use client";

import { motion } from "motion/react";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    DollarSign,
    Eye,
    ShoppingCart,
    Users,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Cell,
    PieChart,
    Pie,
} from "recharts";

const ease = [0.23, 1, 0.32, 1] as const;

/* ─── Mock Data ─── */

const revenueData = [
    { month: "Jan", revenue: 4200, expenses: 2800 },
    { month: "Feb", revenue: 5100, expenses: 3200 },
    { month: "Mar", revenue: 4800, expenses: 2900 },
    { month: "Apr", revenue: 6300, expenses: 3500 },
    { month: "May", revenue: 5900, expenses: 3100 },
    { month: "Jun", revenue: 7200, expenses: 3800 },
    { month: "Jul", revenue: 6800, expenses: 3400 },
    { month: "Aug", revenue: 8100, expenses: 4200 },
    { month: "Sep", revenue: 7500, expenses: 3900 },
    { month: "Oct", revenue: 8900, expenses: 4500 },
    { month: "Nov", revenue: 9200, expenses: 4800 },
    { month: "Dec", revenue: 10500, expenses: 5100 },
];

const channelData = [
    { channel: "Direct", visitors: 4250 },
    { channel: "Organic", visitors: 3800 },
    { channel: "Referral", visitors: 2100 },
    { channel: "Social", visitors: 1800 },
    { channel: "Email", visitors: 1400 },
    { channel: "Paid", visitors: 950 },
];

const categoryData = [
    { name: "Electronics", value: 35, color: "oklch(0.65 0.19 250)" },
    { name: "Clothing", value: 25, color: "oklch(0.65 0.19 300)" },
    { name: "Furniture", value: 20, color: "oklch(0.65 0.19 145)" },
    { name: "Other", value: 20, color: "oklch(0.55 0 0)" },
];

const topProducts = [
    { name: "Premium Headphones", sales: 1240, revenue: "$202,248", trend: "+18%" },
    { name: "Smart LED TV", sales: 856, revenue: "$769,943", trend: "+12%" },
    { name: "Gaming Console", sales: 743, revenue: "$371,257", trend: "+8%" },
    { name: "Leather Sofa Set", sales: 612, revenue: "$795,593", trend: "-3%" },
    { name: "Digital Camera", sales: 589, revenue: "$765,641", trend: "+22%" },
];

const stats = [
    {
        label: "Total Revenue",
        value: "$84,500",
        change: "+14.2%",
        up: true,
        icon: DollarSign,
    },
    {
        label: "Page Views",
        value: "246K",
        change: "+8.1%",
        up: true,
        icon: Eye,
    },
    {
        label: "Orders",
        value: "1,847",
        change: "-2.4%",
        up: false,
        icon: ShoppingCart,
    },
    {
        label: "Customers",
        value: "12,340",
        change: "+5.7%",
        up: true,
        icon: Users,
    },
];

/* ─── Chart Configs ─── */

const revenueConfig = {
    revenue: { label: "Revenue", color: "oklch(0.65 0.19 145)" },
    expenses: { label: "Expenses", color: "oklch(0.55 0 0)" },
} satisfies ChartConfig;

const channelConfig = {
    visitors: { label: "Visitors", color: "var(--primary)" },
} satisfies ChartConfig;

/* ─── Component ─── */

export default function ReportsPage() {
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
                        <BarChart3 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                        <h1 className="font-heading text-2xl font-bold tracking-tight">
                            Reports
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Insights and analytics for your business performance.
                        </p>
                    </div>
                </div>
                <Badge
                    variant="outline"
                    className="mt-2 w-fit border-border/50 text-xs text-muted-foreground sm:mt-0"
                >
                    Last 12 months
                </Badge>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, delay: 0.06 + i * 0.05, ease }}
                    >
                        <Card className="group relative overflow-hidden transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                            <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/[0.03] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <CardHeader className="pb-2">
                                <CardDescription className="flex items-center gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-secondary/80 transition-colors duration-200 group-hover:bg-secondary">
                                        <stat.icon className="h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground" />
                                    </span>
                                    {stat.label}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-semibold tabular-nums tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span
                                        className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                                            stat.up
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {stat.up ? (
                                            <ArrowUpRight className="h-3 w-3" />
                                        ) : (
                                            <ArrowDownRight className="h-3 w-3" />
                                        )}
                                        {stat.change}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                {/* Revenue Area Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease }}
                >
                    <Card className="group transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                Revenue vs Expenses
                                <Badge
                                    variant="outline"
                                    className="border-none bg-emerald-500/10 text-emerald-600 transition-transform duration-200 group-hover:scale-105 dark:text-emerald-400"
                                >
                                    <TrendingUp className="h-3 w-3" />
                                    +14.2%
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                Monthly revenue and expenses breakdown
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={revenueConfig}
                                className="h-52 w-full sm:h-64"
                            >
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient
                                            id="fillRevenue"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="oklch(0.65 0.19 145)"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="oklch(0.65 0.19 145)"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="fillExpenses"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="oklch(0.55 0 0)"
                                                stopOpacity={0.15}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="oklch(0.55 0 0)"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        vertical={false}
                                        strokeDasharray="3 3"
                                        stroke="var(--border)"
                                        strokeOpacity={0.5}
                                    />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        fontSize={11}
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Area
                                        dataKey="expenses"
                                        type="monotone"
                                        fill="url(#fillExpenses)"
                                        stroke="oklch(0.55 0 0)"
                                        strokeWidth={1.5}
                                    />
                                    <Area
                                        dataKey="revenue"
                                        type="monotone"
                                        fill="url(#fillRevenue)"
                                        stroke="oklch(0.65 0.19 145)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.28, ease }}
                >
                    <Card className="group transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Sales by Category
                            </CardTitle>
                            <CardDescription>
                                Product category distribution
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    value: {
                                        label: "Share",
                                        color: "var(--primary)",
                                    },
                                }}
                                className="mx-auto aspect-square max-h-[180px]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={75}
                                        strokeWidth={2}
                                        stroke="var(--background)"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                            {/* Legend */}
                            <div className="mt-4 grid grid-cols-2 gap-2">
                                {categoryData.map((cat) => (
                                    <div
                                        key={cat.name}
                                        className="flex items-center gap-2 text-xs"
                                    >
                                        <span
                                            className="h-2 w-2 rounded-full"
                                            style={{
                                                backgroundColor: cat.color,
                                            }}
                                        />
                                        <span className="text-muted-foreground">
                                            {cat.name}
                                        </span>
                                        <span className="ml-auto font-medium tabular-nums">
                                            {cat.value}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Traffic Sources */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.32, ease }}
                >
                    <Card className="group transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Traffic Sources
                            </CardTitle>
                            <CardDescription>
                                Visitors by acquisition channel
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={channelConfig}
                                className="h-48 w-full"
                            >
                                <BarChart
                                    data={channelData}
                                    layout="vertical"
                                    margin={{ left: 0 }}
                                >
                                    <YAxis
                                        dataKey="channel"
                                        type="category"
                                        tickLine={false}
                                        axisLine={false}
                                        width={60}
                                        fontSize={11}
                                    />
                                    <XAxis
                                        type="number"
                                        hide
                                    />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Bar
                                        dataKey="visitors"
                                        fill="var(--primary)"
                                        radius={[0, 4, 4, 0]}
                                        barSize={18}
                                        opacity={0.8}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Top Products Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.36, ease }}
                >
                    <Card className="group transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-md">
                        <CardHeader>
                            <CardTitle className="text-base">
                                Top Products
                            </CardTitle>
                            <CardDescription>
                                Best performing products by sales
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                {topProducts.map((product, i) => (
                                    <div
                                        key={product.name}
                                        className="-mx-2 flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors duration-150 hover:bg-secondary/50"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-secondary text-[11px] font-medium text-muted-foreground">
                                                {i + 1}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {product.sales.toLocaleString()}{" "}
                                                    sales
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 pl-2">
                                            <span className="font-mono text-sm tabular-nums">
                                                {product.revenue}
                                            </span>
                                            <span
                                                className={`text-xs font-medium ${
                                                    product.trend.startsWith("+")
                                                        ? "text-emerald-600 dark:text-emerald-400"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {product.trend}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
