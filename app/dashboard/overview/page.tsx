import { ValueLineBarChart } from '@/components/graphs/BarChart';
import { PartialLineChart } from '@/components/graphs/LineChart';
import { GlowingMultipleStrokeRadarChart } from '@/components/graphs/RadarChart';
import { RecentSales } from '@/components/graphs/Sales';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardFooter
} from '@/components/ui/card';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

export default function OverviewPage() {
    return (
        <div className='flex flex-1 flex-col space-y-2'>
            <div className='flex items-center justify-between '>
                <h2 className='text-2xl font-bold tracking-tight'>
                    Hi, Welcome back 👋
                </h2>
            </div>

            <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
                <Card className='@container/card'>
                    <CardHeader>
                        <CardDescription>Total Revenue</CardDescription>
                        <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                            $1,250.00
                        </CardTitle>
                        <CardAction>
                            <Badge variant='outline'>
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
                            1,234
                        </CardTitle>
                        <CardAction>
                            <Badge variant='outline'>
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
                            45,678
                        </CardTitle>
                        <CardAction>
                            <Badge variant='outline'>
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
                            4.5%
                        </CardTitle>
                        <CardAction>
                            <Badge variant='outline'>
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

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row gap-4 mt-2">
                {/* Left Section - Charts */}
                <div className="flex-1 md:w-2/3">
                    <div className="grid auto-rows-[minmax(180px,auto)] gap-4">
                        <div>
                            <ValueLineBarChart />
                        </div>
                        <div>
                            <PartialLineChart />
                        </div>
                    </div>
                </div>

                {/* Right Section - Stats */}
                <div className="md:w-1/3">
                    <div className="grid auto-rows-[minmax(180px,auto)] gap-4">
                        <div>
                            <GlowingMultipleStrokeRadarChart />
                        </div>
                        <div>
                            <RecentSales />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}