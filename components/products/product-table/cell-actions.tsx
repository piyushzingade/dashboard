'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Product } from '@/constants/mock-api';
import { IconEdit, IconDotsVertical, IconTrash, IconEye } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface CellActionProps {
    data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const router = useRouter();

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    aria-label={`Open actions for ${data.name}`}
                    className='hover:bg-secondary'
                >
                    <span className='sr-only'>Open menu</span>
                    <IconDotsVertical className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
                <DropdownMenuLabel className='text-xs text-muted-foreground'>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() =>
                        router.push(`/dashboard/product/${data.id}`)
                    }
                    className='gap-2'
                >
                    <IconEye className='h-4 w-4' />
                    View
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() =>
                        router.push(`/dashboard/product/${data.id}`)
                    }
                    className='gap-2'
                >
                    <IconEdit className='h-4 w-4' />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    disabled
                    className='gap-2 text-destructive focus:text-destructive'
                >
                    <IconTrash className='h-4 w-4' />
                    Delete unavailable
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
