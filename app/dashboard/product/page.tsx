import { Heading } from '@/components/Heading';
import ProductListingPage from '@/components/products/product-listing';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache } from '@/lib/searchparams';
import Link from 'next/link';
import { Plus } from 'lucide-react';
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
        <div className='flex flex-1 flex-col space-y-4'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
                <Heading title='Product' description='Manage products (Server side table functionalities.)' />
                <div className="ml-auto">
                    <Link href='/dashboard/product/add' className="bg-foreground text-background px-3 py-2 flex items-center gap-3 rounded-md w-full sm:w-auto justify-center"><Plus className="size-4 " /> Add</Link>
                </div>
            </div>
            <Separator />
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