
'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/mock-api';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-actions';
import { CATEGORY_OPTIONS } from './options';


export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'photo_url',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Image' />
        ),
        cell: ({ row }) => {
            return (
                <div className='relative w-12 h-12'>
                    <Image
                        src={row.getValue('photo_url')}
                        alt={row.getValue('name')}
                        fill
                        className='rounded-lg object-cover'
                    />
                </div>
            );
        }
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
        cell: ({ cell }) => <div className="font-medium">{cell.getValue<string>()}</div>,
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
        cell: ({ cell }) => {
            const category = cell.getValue<string>();
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
        cell: ({ cell }) => {
            const price = cell.getValue<number>();
            return <div className="font-medium">₹{price.toLocaleString()}</div>;
        }
    },
    {
        accessorKey: 'description',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title='Description' />
        ),
        cell: ({ cell }) => {
            const description = cell.getValue<string>();
            return <div className="line-clamp-2 text-sm text-muted-foreground">{description}</div>;
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
