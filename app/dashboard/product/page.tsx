import ProductListingPage from '@/components/products/product-listing';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache } from '@/lib/searchparams';
import Link from 'next/link';
import { Plus, Package } from 'lucide-react';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
    title: 'Dashboard: Products'
};

type pageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
    const searchParams = await props.searchParams;
    searchParamsCache.parse(searchParams);

    return (
        <div className='flex flex-1 flex-col gap-6'>
            {/* Header */}
            <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80'>
                        <Package className='h-5 w-5 text-muted-foreground' />
                    </div>
                    <div>
                        <h1 className='font-heading text-2xl font-bold tracking-tight'>
                            Products
                        </h1>
                        <p className='text-sm text-muted-foreground'>
                            Manage your product catalog and inventory.
                        </p>
                    </div>
                </div>
                <Link
                    href='/dashboard/product/add'
                    className="mt-3 sm:mt-0 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                >
                    <Plus className="size-4" />
                    Add product
                </Link>
            </div>

            {/* Table */}
            <Suspense
                fallback={
                    <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
                }
            >
                <ProductListingPage />
            </Suspense>
        </div>
    );
}
