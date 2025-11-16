import { ValueLineBarChart } from '@/components/graphs/BarChart';
import { PartialLineChart } from '@/components/graphs/LineChart';
import { GlowingMultipleStrokeRadarChart } from '@/components/graphs/RadarChart';
import { RecentSales } from '@/components/graphs/Sales';
import { TopCard } from '@/components/graphs/TopCard';

export default function OverviewPage() {
    return (
        <div className='flex flex-1 flex-col space-y-2'>
            <div className='flex items-center justify-between '>
                <h2 className='text-2xl font-bold tracking-tight'>
                    Hi, Welcome back 👋
                </h2>
            </div>

            <TopCard />

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