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
        <div className='flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-4 py-3 transition-[border-color,box-shadow] duration-200 hover:border-foreground/10 hover:shadow-sm'>
            <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/80'>
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

type ProductListingPage = {};

export default async function ProductListingPage({}: ProductListingPage) {
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
            <div className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
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
