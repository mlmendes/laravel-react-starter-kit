import { Link } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { NavItem } from '@/types';

export default function MultiLevelSubMenu({
    item,
    hidden = false,
}: {
    item: NavItem;
    hidden?: boolean;
}) {
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild hidden={hidden}>
                <Button
                    className="aspect-square h-8 w-8 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    size="icon"
                    variant="outline"
                >
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {item.items?.map((it, index) => (
                    <DropdownMenuGroup key={index} className="flex">
                        <DropdownMenuItem key={index}>
                            {it.icon && (
                                <DropdownMenuShortcut>
                                    <it.icon />
                                </DropdownMenuShortcut>
                            )}
                            {it.href ? (
                                <Link href={it.href} prefetch>
                                    <span>{t(it.title)}</span>
                                </Link>
                            ) : (
                                <>
                                    <span>{t(it.title)}</span>
                                </>
                            )}
                        </DropdownMenuItem>
                        {it.items && it.items.length > 0 && (
                            <MultiLevelSubMenu
                                item={it}
                                key={`${index}-${it.title}`}
                            />
                        )}
                    </DropdownMenuGroup>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
