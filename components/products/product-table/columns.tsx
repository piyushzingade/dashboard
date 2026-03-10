'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/mock-api';
import { ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { CellAction } from './cell-actions';
import { CATEGORY_OPTIONS } from './options';
import Image from 'next/image';

// Category → color map
const categoryColors: Record<string, string> = {
    Electronics: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    Furniture: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    Clothing: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
    Toys: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    Groceries: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    Books: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    Jewelry: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    'Beauty Products': 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
    Sports: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
    Accessories: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    Appliances: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    Health: 'bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/20',
};

const fallbackColor = 'bg-secondary text-muted-foreground border-border/50';

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'photo_url',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Image' />
        ),
        cell: ({ row }) => {
            return (
                <div className='group/img relative overflow-hidden rounded-lg'>
                    <Image
                        src={row.original.photo_url}
                        alt={row.original.name}
                        width={120}
                        height={120}
                        className='h-10 w-10 rounded-lg object-cover ring-1 ring-border/30 transition-transform duration-200 group-hover/img:scale-105 sm:h-12 sm:w-12'
                    />
                </div>
            );
        },
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
        cell: ({ row }) => (
            <div className='font-medium tracking-tight'>
                {row.original.name}
            </div>
        ),
        meta: {
            label: 'Name',
            placeholder: 'Search products...',
            variant: 'text',
            icon: Text,
        },
        enableColumnFilter: true,
    },
    {
        id: 'category',
        accessorKey: 'category',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Category' />
        ),
        cell: ({ row }) => {
            const category = row.original.category;
            const colorClass = categoryColors[category] ?? fallbackColor;
            return (
                <Badge
                    variant='outline'
                    className={`capitalize transition-transform duration-150 hover:scale-105 ${colorClass}`}
                >
                    {category}
                </Badge>
            );
        },
        enableColumnFilter: true,
        meta: {
            label: 'categories',
            variant: 'multiSelect',
            options: CATEGORY_OPTIONS,
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Price' />
        ),
        cell: ({ row }) => {
            const price = row.original.price;
            return (
                <div className='font-mono text-sm font-medium tabular-nums'>
                    ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            );
        },
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Description' />
        ),
        cell: ({ row }) => {
            const description = row.original.description;
            return (
                <div className='hidden max-w-[280px] text-sm leading-relaxed text-muted-foreground sm:block'>
                    <span className='line-clamp-2'>{description}</span>
                </div>
            );
        },
    },
    {
        id: 'actions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='' />
        ),
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
