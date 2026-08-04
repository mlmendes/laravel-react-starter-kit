import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import MultiLevelSubMenu from '@/components/multi-level-sub-menu';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavItemDropdownMenu({ item }: { item: NavItem }) {
    const { t } = useTranslation();
    const { isCurrentUrl } = useCurrentUrl();
    const { state } = useSidebar();

    return (
        <SidebarMenuItem className="flex" key={item.title}>
            <SidebarMenuButton
                className="flex-auto"
                asChild={!!item.href}
                isActive={!!item.href && isCurrentUrl(item.href)}
                tooltip={{ children: t(item.title) }}
            >
                {item.href ? (
                    <Link href={item.href} prefetch>
                        {item.icon && <item.icon />}
                        <span>{t(item.title)}</span>
                    </Link>
                ) : (
                    <>
                        {item.icon && <item.icon />}
                        <span>{t(item.title)}</span>
                    </>
                )}
            </SidebarMenuButton>
            {item.items && item.items.length > 0 && (
                <SidebarMenuAction className="flex-none" asChild>
                    <MultiLevelSubMenu
                        item={item}
                        hidden={state === 'collapsed'}
                    />
                </SidebarMenuAction>
            )}
        </SidebarMenuItem>
    );
}

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { t } = useTranslation();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{t('Platform')}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => (
                    <NavItemDropdownMenu item={item} key={index} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
