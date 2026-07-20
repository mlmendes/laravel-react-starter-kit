import { InfiniteScroll, usePage } from '@inertiajs/react';
import { ListItemGroup } from '@/components/list-item-group';
import { activity_log } from '@/routes';
import users from '@/routes/users';
import { activity } from '@/schemas';
import type { Activity, CursorPaginatedResponse } from '@/types';

type PageProps = {
    activities: CursorPaginatedResponse<Activity>;
};

export default function Index() {
    const { activities } = usePage<PageProps>().props;

    return (
        <InfiniteScroll data="activities">
            <ListItemGroup
                data={activities.data}
                propKey="activities"
                schema={activity}
            />
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
