import { Link } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { t } = useTranslation();
    const { isCurrentUrl } = useCurrentUrl();
    const { state } = useSidebar();

    function NavItemDropdownMenu({ item }: { item: NavItem }) {
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
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                hidden={state === 'collapsed'}
                            >
                                <Button
                                    className="aspect-square h-8 w-8 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    size="icon"
                                    variant="outline"
                                >
                                    <Ellipsis />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {item.items.map((subItem, index) => (
                                    <NavItemDropdownMenu
                                        item={subItem}
                                        key={index}
                                    />
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuAction>
                )}
            </SidebarMenuItem>
        );
    }

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
