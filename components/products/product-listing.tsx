import { fakeProducts, Product } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { ProductTable } from './product-table';
import { columns } from './product-table/columns';
import { Package, DollarSign, Tag, TrendingUp } from 'lucide-react';

function StatCard({
    icon: Icon,
    label,
    value,
    sub,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <div className='flex min-h-24 items-center gap-3 px-4 py-3 lg:px-5'>
            <div className='flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary'>
                <Icon className='h-4 w-4 text-muted-foreground' />
            </div>
            <div className='min-w-0'>
                <p className='text-xs text-muted-foreground'>{label}</p>
                <p className='text-lg font-semibold tabular-nums leading-tight tracking-tight'>
                    {value}
                </p>
                {sub && (
                    <p className='text-[11px] text-muted-foreground/70'>{sub}</p>
                )}
            </div>
        </div>
    );
}

export default async function ProductListingPage() {
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('name');
    const pageLimit = searchParamsCache.get('perPage');
    const categories = searchParamsCache.get('category');

    const filters = {
        page,
        limit: pageLimit,
        ...(search && { search }),
        ...(categories && { categories: categories }),
    };

    const data = await fakeProducts.getProducts(filters);
    const totalProducts = data.total_products;
    const products: Product[] = data.products;

    // Derive quick stats from data
    const totalValue = fakeProducts.records.reduce((sum, p) => sum + p.price, 0);
    const uniqueCategories = new Set(fakeProducts.records.map((p) => p.category)).size;
    const avgPrice = totalValue / fakeProducts.records.length;

    return (
        <div className='flex flex-col gap-5'>
            {/* Summary Stats */}
            <div className='grid grid-cols-2 overflow-hidden rounded-xl border border-border bg-card divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0'>
                <StatCard
                    icon={Package}
                    label='Total products'
                    value={fakeProducts.records.length.toString()}
                    sub='In catalog'
                />
                <StatCard
                    icon={DollarSign}
                    label='Total value'
                    value={`$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                    sub='Catalog worth'
                />
                <StatCard
                    icon={Tag}
                    label='Categories'
                    value={uniqueCategories.toString()}
                    sub='Product types'
                />
                <StatCard
                    icon={TrendingUp}
                    label='Avg. price'
                    value={`$${avgPrice.toFixed(0)}`}
                    sub='Per product'
                />
            </div>

            {/* Data Table */}
            <ProductTable
                data={products}
                totalItems={totalProducts}
                columns={columns}
            />
        </div>
    );
}
