import { InfiniteScroll } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LocalizedTimestamp } from '@/components/localized-timestamp';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import type { ItemSchema, SoftDeletable } from '@/types';

type InfiniteItemListProps<T> = {
    data: T[];
    onItemHover?: (item: T) => void;
    onItemLeave?: (item: T) => void;
    propKey: string;
    schema: ItemSchema<T>;
};

export function ListItemGroup<T extends SoftDeletable>({
    data,
    onItemHover,
    onItemLeave,
    propKey,
    schema,
}: InfiniteItemListProps<T>) {
    const { t } = useTranslation();

    return (
        <InfiniteScroll
            data={propKey}
            next={({ loading, hasMore }) => (
                <Item className="w-fit justify-self-center" size="sm">
                    {loading && (
                        <ItemMedia>
                            <Spinner />
                        </ItemMedia>
                    )}
                    <ItemContent>
                        <ItemTitle className="line-clamp-1">
                            {t(
                                loading
                                    ? 'Loading'
                                    : hasMore
                                      ? 'Load more'
                                      : 'End of data',
                            )}
                        </ItemTitle>
                    </ItemContent>
                </Item>
            )}
            preserveUrl
        >
            <ItemGroup>
                {data.map((row, index) => (
                    <Item
                        key={index}
                        onMouseOver={() => onItemHover?.(row)}
                        onMouseOut={() => onItemLeave?.(row)}
                        variant="outline"
                    >
                        {schema.media && (
                            <ItemMedia>{schema.media(row)}</ItemMedia>
                        )}
                        <ItemContent className="gap-1">
                            <ItemTitle>{schema.title(row)}</ItemTitle>
                            {schema.description && (
                                <ItemDescription
                                    className={cn(
                                        row.deleted_at && 'text-destructive',
                                    )}
                                >
                                    {schema.description(row)}
                                </ItemDescription>
                            )}
                            <div
                                className={cn(
                                    'mt-2 space-y-1 text-sm',
                                    row.deleted_at
                                        ? 'text-destructive'
                                        : 'text-muted-foreground',
                                )}
                            >
                                {schema.fields?.length && (
                                    <>
                                        {schema.fields.map((field) => {
                                            if (field.render(row)) {
                                                return (
                                                    <div
                                                        key={field.key}
                                                        className="flex gap-2"
                                                    >
                                                        {field.label && (
                                                            <span className="font-medium">
                                                                {t(field.label)}
                                                                :
                                                            </span>
                                                        )}
                                                        <span>
                                                            {field.render(row)}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                        })}
                                        {row.deleted_at && (
                                            <div className="flex gap-2 text-destructive">
                                                <span className="font-medium">
                                                    {t('Deleted at')}:
                                                </span>
                                                <span>
                                                    <LocalizedTimestamp
                                                        timestamp={
                                                            row.deleted_at
                                                        }
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </ItemContent>
                        {schema.actions && (
                            <ItemActions>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full"
                                        >
                                            <Ellipsis />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    {schema.actions(row) && (
                                        <DropdownMenuContent
                                            className="w-40"
                                            align="start"
                                        >
                                            <DropdownMenuGroup>
                                                {schema.actions(row)}
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    )}
                                </DropdownMenu>
                            </ItemActions>
                        )}
                    </Item>
                ))}
            </ItemGroup>
        </InfiniteScroll>
    );
}
