import { useTranslation } from 'react-i18next';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Spinner } from '@/components/ui/spinner';

export default function InfiniteScrollNext({
    loading,
    hasMore,
}: {
    loading: boolean;
    hasMore: boolean;
}) {
    const { t } = useTranslation();

    return (
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
    );
}
