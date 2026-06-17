import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import type { RouteDefinition } from '@/wayfinder';

export default function CreateButton({
    route,
}: {
    route: RouteDefinition<'get'>;
}) {
    const { t } = useTranslation();
    const isMobile = useIsMobile();
    const iconElement = <Plus />;

    return isMobile ? (
        <Button
            asChild
            className="fixed right-4 bottom-4 rounded-full"
            size="icon"
            type="button"
        >
            <Link href={route.url}>{iconElement}</Link>
        </Button>
    ) : (
        <Button asChild type="button" variant="outline">
            <Link href={route.url}>
                {iconElement}
                <span>{t('Create')}</span>
            </Link>
        </Button>
    );
}
