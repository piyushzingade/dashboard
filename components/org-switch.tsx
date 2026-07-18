'use client';

import { Check, ChevronsUpDown, PanelsTopLeft } from 'lucide-react';
import * as React from 'react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';

interface Tenant {
    id: string;
    name: string;
}

export function OrgSwitcher({
    tenants,
    defaultTenant,
    onTenantSwitch
}: {
    tenants: Tenant[];
    defaultTenant: Tenant;
    onTenantSwitch?: (tenantId: string) => void;
}) {
    const [selectedTenant, setSelectedTenant] = React.useState<
        Tenant | undefined
    >(defaultTenant || (tenants.length > 0 ? tenants[0] : undefined));

    const handleTenantSwitch = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        if (onTenantSwitch) {
            onTenantSwitch(tenant.id);
        }
    };

    if (!selectedTenant) {
        return null;
    }
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                <PanelsTopLeft className='size-4' />
                            </div>
                            <div className='flex min-w-0 flex-col gap-1 leading-none'>
                                <span className='truncate font-semibold tracking-[-0.01em]'>NexUI</span>
                                <span className='truncate text-xs text-sidebar-foreground/65'>{selectedTenant.name}</span>
                            </div>
                            <ChevronsUpDown className='ml-auto' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width]'
                        align='start'
                    >
                        {tenants.map((tenant) => (
                            <DropdownMenuItem
                                key={tenant.id}
                                onSelect={() => handleTenantSwitch(tenant)}
                            >
                                {tenant.name}{' '}
                                {tenant.id === selectedTenant.id && (
                                    <Check className='ml-auto' />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
