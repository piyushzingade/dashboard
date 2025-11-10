import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/products/Heading';
import ProductListingPage from '@/components/products/product-listing';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
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
        <PageContainer scrollable={false}>
            <div className='flex flex-1 flex-col space-y-4'>
                <div className='flex items-center justify-between'>
                    <Heading />
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
        </PageContainer>
    );
}