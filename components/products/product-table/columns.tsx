
'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/mock-api';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import { CellAction } from './cell-actions';
import { CATEGORY_OPTIONS } from './options';
import Image from 'next/image';


export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'photo_url',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Image' />
        ),
        cell: ({ row }) => {
            return (
                <Image
                    src={row.original.photo_url}
                    alt={row.original.name}
                    width={120}
                    height={120}
                    className='w-8 h-8 sm:w-12 sm:h-12 rounded-lg object-cover'
                />
            );
        }
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
        cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
        meta: {
            label: 'Name',
            placeholder: 'Search products...',
            variant: 'text',
            icon: Text
        },
        enableColumnFilter: true
    },
    {
        id: 'category',
        accessorKey: 'category',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Category' />
        ),
        cell: ({ row }) => {
            const category = row.original.category;
            return (
                <Badge variant='outline' className='capitalize'>
                    {category}
                </Badge>
            );
        },
        enableColumnFilter: true,
        meta: {
            label: 'categories',
            variant: 'multiSelect',
            options: CATEGORY_OPTIONS
        }
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Price' />
        ),
        cell: ({ row }) => {
            const price = row.original.price;
            return <div className="font-medium">₹{price.toLocaleString()}</div>;
        }
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Description' />
        ),
        cell: ({ row }) => {
            const description = row.original.description;
            return <div className="line-clamp-2 text-sm text-muted-foreground hidden sm:block">{description}</div>;
        }
    },
    {
        id: 'actions',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Actions' />
        ),
        cell: ({ row }) => <CellAction data={row.original} />
    }
];
