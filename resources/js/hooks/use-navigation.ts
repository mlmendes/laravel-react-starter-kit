import { usePage } from '@inertiajs/react';
import {
    BookOpen,
    FolderGit2,
    LayoutGrid,
    Logs,
    ShieldUser,
    Users,
} from 'lucide-react';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import users from '@/routes/users';
import type { Auth, NavItem } from '@/types';

export function useNavigation() {
    const { auth } = usePage<{ auth: Auth }>().props;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Users',
            href: users.index(),
            icon: Users,
            restricted: true,
            items: [
                {
                    title: 'Roles',
                    href: users.roles.index(),
                    icon: ShieldUser,
                    restricted: true,
                },
                {
                    title: 'Activity log',
                    href: users.activity_log(),
                    icon: Logs,
                    restricted: true,
                },
            ],
        },
    ];

    const secondaryNavItems: NavItem[] = [
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

    const allowedMainNavItems: NavItem[] = mainNavItems.flatMap<NavItem>(
        (item) => {
            const parentAllowed =
                !item.restricted ||
                Object.values(auth.allowed_pages).some(
                    (pageUrl) =>
                        item.restricted &&
                        item.href &&
                        pageUrl === toUrl(item.href),
                );
            const filteredChildren =
                item.items?.filter(
                    (sub) =>
                        !sub.restricted ||
                        Object.values(auth.allowed_pages).some(
                            (pageUrl) =>
                                sub.restricted &&
                                sub.href &&
                                pageUrl === toUrl(sub.href),
                        ),
                ) ?? [];

            if (parentAllowed) {
                if (!item.href && filteredChildren.length === 0) {
                    return [];
                }

                return [{ ...item, items: filteredChildren }];
            }

            if (filteredChildren.length > 0) {
                return filteredChildren.map((child) => ({
                    ...child,
                    icon: child.icon ?? item.icon,
                }));
            }

            return [];
        },
    );

    return {
        mainNavItems: allowedMainNavItems,
        secondaryNavItems,
    };
}
