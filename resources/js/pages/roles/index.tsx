import { InfiniteScroll } from '@inertiajs/react';
import { ListItemGroup } from '@/components/list-item-group';
import roles from '@/routes/roles';
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
            title: 'Roles',
            href: roles.index(),
        },
    ],
});
