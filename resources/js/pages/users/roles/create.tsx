import RoleForm from '@/pages/users/roles/form';
import users from '@/routes/users';
import roles from '@/routes/users/roles';
import type { CursorPaginatedResponse, Permission, User } from '@/types';

type Props = {
    permissions: Permission[];
    users: CursorPaginatedResponse<User>;
};

export default function RoleCreate({ permissions, users }: Props) {
    return <RoleForm permissions={permissions} users={users} />;
}

RoleCreate.layout = () => ({
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
        {
            title: 'Create',
            href: roles.create(),
        },
    ],
});
