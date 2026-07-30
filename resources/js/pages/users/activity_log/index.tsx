import { InfiniteScroll, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InfiniteScrollNext from '@/components/infinite-scroll-next';
import { LocalizedTimestamp } from '@/components/localized-timestamp';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import ActivityCauser from '@/pages/users/activity_log/activity-causer';
import ActivityDetails from '@/pages/users/activity_log/activity-details';
import { activity_log } from '@/routes';
import users from '@/routes/users';
import type { Activity, CursorPaginatedResponse } from '@/types';

type PageProps = {
    activities: CursorPaginatedResponse<Activity>;
};

export default function Index() {
    const { t } = useTranslation();
    const { activities } = usePage<PageProps>().props;

    return (
        <InfiniteScroll
            data="activities"
            next={({ loading, hasMore }) => (
                <InfiniteScrollNext loading={loading} hasMore={hasMore} />
            )}
            preserveUrl
        >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-0">{t('Timestamp')}</TableHead>
                        <TableHead className="w-0">{t('Log name')}</TableHead>
                        <TableHead className="w-0">{t('Causer')}</TableHead>
                        <TableHead className="w-0">{t('Event')}</TableHead>
                        <TableHead>{t('Subject type')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activities.data.map((activity) => (
                        <TableRow key={activity.uuid}>
                            <TableCell>
                                <LocalizedTimestamp
                                    timestamp={activity.created_at}
                                />
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary">
                                    {activity.log_name}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <ActivityCauser activity={activity} />
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        {activity.causer?.name ?? t('System')}
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{activity.event}</TableCell>
                            <TableCell>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {activity.subject_type}
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        <ActivityDetails activity={activity} />
                                    </TooltipContent>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </InfiniteScroll>
    );
}

Index.layout = () => ({
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index(),
        },
        {
            title: 'Activity log',
            href: activity_log(),
        },
    ],
});
