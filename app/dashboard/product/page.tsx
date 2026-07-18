import ProductListingPage from '@/components/products/product-listing';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache } from '@/lib/searchparams';
import Link from 'next/link';
import { Plus, Package } from 'lucide-react';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/dashboard/page-header';

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
            <PageHeader
                title='Products'
                description='Manage catalog availability, pricing, inventory, and product status.'
                icon={Package}
                actions={
                    <Button asChild>
                        <Link href='/dashboard/product/add'>
                            <Plus className='size-4' />
                            Add product
                        </Link>
                    </Button>
                }
            />

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
