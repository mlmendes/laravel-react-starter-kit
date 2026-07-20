import { BookOpen, FolderGit2, Logs, ShieldUser, Users } from 'lucide-react';
import { LayoutGrid } from 'lucide-react';
import { activity_log, dashboard } from '@/routes';
import users from '@/routes/users';
import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Users',
        href: users.index(),
        icon: Users,
    },
    {
        title: 'Roles',
        href: users.roles.index(),
        icon: ShieldUser,
    },
    {
        title: 'Activity log',
        href: activity_log(),
        icon: Logs,
    },
];

export const secondaryNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/mlmendes/laravel-react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];
