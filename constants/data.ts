import { NavItem } from "@/types/types";

export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: [] // Empty array as there are no child items for Dashboard
    },
    {
        title: 'Product',
        url: '/dashboard/product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
        items: [] // No child items
    },
    {
        title: 'Kanban',
        url: '/dashboard/kanban',
        icon: 'kanban',
        shortcut: ['k', 'k'],
        isActive: false,
        items: [] // No child items
    }, {
        title: 'Calendar',
        url: '/dashboard/calendar',
        icon: 'calendar',
        shortcut: ['c', 'c'],
        isActive: false,
        items: [] // No child items
    }, {
        title: 'Reports',
        url: '/dashboard/reports',
        icon: 'reports',
        shortcut: ['c', 'c'],
        isActive: false,
        items: [] // No child items
    }, {
        title: 'Transactions',
        url: '/dashboard/transactions',
        icon: 'transaction',
        shortcut: ['c', 'c'],
        isActive: true,
        items: [] // No child items
    },
    {
        title: 'Account',
        url: '#', // Placeholder as there is no direct link for the parent
        icon: 'user2',
        isActive: true,

        items: [
            {
                title: 'Profile',
                url: '/dashboard/profile',
                icon: 'userPen',
                shortcut: ['m', 'm']
            },
            {
                title: 'Billing',
                shortcut: ['l', 'l'],
                url: '/',
                icon: 'billing'
            }
        ]
    }, {
        title: 'General',
        url: '#', // Placeholder as there is no direct link for the parent
        icon: 'billing',
        isActive: true,

        items: [
            {
                title: 'Settings',
                url: '/dashboard/settings',
                icon: 'settings',
                shortcut: ['m', 'm']
            },
            {
                title: 'Help Center',
                shortcut: ['l', 'l'],
                url: '/',
                icon: 'help'
            },
            {
                title: 'Feedback',
                shortcut: ['l', 'l'],
                url: '/',
                icon: 'feedback'
            }
        ]
    },
];
