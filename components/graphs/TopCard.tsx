"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { motion, useMotionValueEvent, useSpring } from "motion/react";
import { useEffect, useState } from "react";

function AnimatedNumber({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(0);
    const springValue = useSpring(0, { stiffness: 100, damping: 20 });

    useMotionValueEvent(springValue, "change", (latest) => {
        setDisplayValue(value % 1 === 0 ? Math.floor(latest) : Number(latest.toFixed(1)));
    });

    useEffect(() => {
        springValue.set(value);
    }, [value, springValue]);

    return <motion.span>{displayValue.toLocaleString()}</motion.span>;
}

export function TopCard() {
    return (
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
            <Card className='@container/card'>
                <CardHeader>
                    <CardDescription>Total Revenue</CardDescription>
                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                        $<AnimatedNumber value={1250} />.00
                    </CardTitle>
                    <CardAction>
                        <Badge variant='outline' className="bg-green-500/10 text-green-500 border-none">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                    <div className='line-clamp-1 flex gap-2 font-medium'>
                        Trending up this month <IconTrendingUp className='size-4' />
                    </div>
                    <div className='text-muted-foreground'>
                        Visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
            <Card className='@container/card'>
                <CardHeader>
                    <CardDescription>New Customers</CardDescription>
                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                        <AnimatedNumber value={1234} />
                    </CardTitle>
                    <CardAction>
                        <Badge variant='outline' className="bg-red-500/10 text-red-500 border-none">
                            <IconTrendingDown />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                    <div className='line-clamp-1 flex gap-2 font-medium'>
                        Down 20% this period <IconTrendingDown className='size-4' />
                    </div>
                    <div className='text-muted-foreground'>
                        Acquisition needs attention
                    </div>
                </CardFooter>
            </Card>
            <Card className='@container/card'>
                <CardHeader>
                    <CardDescription>Active Accounts</CardDescription>
                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                        <AnimatedNumber value={45678} />
                    </CardTitle>
                    <CardAction>
                        <Badge variant='outline' className="bg-green-500/10 text-green-500 border-none">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                    <div className='line-clamp-1 flex gap-2 font-medium'>
                        Strong user retention <IconTrendingUp className='size-4' />
                    </div>
                    <div className='text-muted-foreground'>
                        Engagement exceed targets
                    </div>
                </CardFooter>
            </Card>
            <Card className='@container/card'>
                <CardHeader>
                    <CardDescription>Growth Rate</CardDescription>
                    <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                        <AnimatedNumber value={4.5} />%
                    </CardTitle>
                    <CardAction>
                        <Badge variant='outline' className="bg-green-500/10 text-green-500 border-none">
                            <IconTrendingUp />
                            +4.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                    <div className='line-clamp-1 flex gap-2 font-medium'>
                        Steady performance increase{' '}
                        <IconTrendingUp className='size-4' />
                    </div>
                    <div className='text-muted-foreground'>
                        Meets growth projections
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}