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
        title: 'Account',
        url: '#', // Placeholder as there is no direct link for the parent
        icon: 'billing',
        isActive: true,

        items: [
            {
                title: 'Profile',
                url: '/dashboard/profile',
                icon: 'userPen',
                shortcut: ['m', 'm']
            },
            {
                title: 'Login',
                shortcut: ['l', 'l'],
                url: '/',
                icon: 'login'
            }
        ]
    },
    {
        title: 'Kanban',
        url: '/dashboard/kanban',
        icon: 'kanban',
        shortcut: ['k', 'k'],
        isActive: false,
        items: [] // No child items
    }
];
