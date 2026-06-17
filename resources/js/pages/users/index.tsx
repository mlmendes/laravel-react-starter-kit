import { InfiniteScroll } from '@inertiajs/react';
import { ListItemGroup } from '@/components/list-item-group';
import users from '@/routes/users';
import { user } from '@/schemas';
import type { CursorPaginatedResponse, User } from '@/types';

export default function Index({
    users,
}: {
    users: CursorPaginatedResponse<User>;
}) {
    return (
        <InfiniteScroll data="users">
            <ListItemGroup data={users.data} propKey="users" schema={user} />
        </InfiniteScroll>
    );
}

Index.layout = () => ({
    action: users.create(),
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index(),
        },
    ],
});
