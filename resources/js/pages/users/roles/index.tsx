import { InfiniteScroll } from '@inertiajs/react';
import { ListItemGroup } from '@/components/list-item-group';
import users from '@/routes/users';
import roles from '@/routes/users/roles';
import { role } from '@/schemas';
import type { CursorPaginatedResponse, Role } from '@/types';

export default function Index({
    roles,
}: {
    roles: CursorPaginatedResponse<Role>;
}) {
    return (
        <InfiniteScroll data="roles">
            <ListItemGroup data={roles.data} propKey="roles" schema={role} />
        </InfiniteScroll>
    );
}

Index.layout = () => ({
    action: roles.create(),
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index(),
        },
        {
            title: 'Roles',
            href: roles.index(),
        },
    ],
});
