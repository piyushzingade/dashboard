'use client';
import { useKBar } from 'kbar';
import { IconSearch } from '@tabler/icons-react';
import { Button } from './ui/button';

export default function SearchInput() {
    const { query } = useKBar();
    return (
        <div className='w-full'>
            <Button
                variant='outline'
                className='relative h-11 w-full justify-start bg-background text-sm font-normal text-muted-foreground sm:pr-12 md:w-44 lg:w-64'
                onClick={query.toggle}
            >
                <IconSearch className='mr-2 h-4 w-4' />
                Search workspace…
                <kbd className='pointer-events-none absolute right-2 hidden h-6 items-center gap-1 rounded-md border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground select-none sm:flex'>
                    <span className='text-xs'>⌘</span>K
                </kbd>
            </Button>
        </div>
    );
}
