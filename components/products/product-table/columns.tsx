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
    Electronics: 'bg-secondary text-secondary-foreground border-border',
    Furniture: 'bg-secondary text-secondary-foreground border-border',
    Clothing: 'bg-secondary text-secondary-foreground border-border',
    Toys: 'bg-secondary text-secondary-foreground border-border',
    Groceries: 'bg-secondary text-secondary-foreground border-border',
    Books: 'bg-secondary text-secondary-foreground border-border',
    Jewelry: 'bg-secondary text-secondary-foreground border-border',
    'Beauty Products': 'bg-secondary text-secondary-foreground border-border',
    Sports: 'bg-secondary text-secondary-foreground border-border',
    Accessories: 'bg-secondary text-secondary-foreground border-border',
    Appliances: 'bg-secondary text-secondary-foreground border-border',
    Health: 'bg-secondary text-secondary-foreground border-border',
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
