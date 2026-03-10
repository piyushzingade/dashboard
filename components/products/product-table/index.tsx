'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';

interface ProductTableParams<TData, TValue> {
    data: TData[];
    totalItems: number;
    columns: ColumnDef<TData, TValue>[];
}

export function ProductTable<TData, TValue>({
    data,
    totalItems,
    columns,
}: ProductTableParams<TData, TValue>) {
    const [pageSize] = useQueryState(
        'perPage',
        parseAsInteger.withDefault(10)
    );

    const pageCount = Math.ceil(totalItems / pageSize);

    const { table } = useDataTable({
        data,
        columns,
        pageCount: pageCount,
        shallow: false,
        debounceMs: 500,
    });

    return (
        <div className='rounded-xl border border-border/50 bg-card/30 p-4 transition-[border-color] duration-200 hover:border-border/80'>
            <DataTable table={table}>
                <DataTableToolbar table={table} />
            </DataTable>
        </div>
    );
}
