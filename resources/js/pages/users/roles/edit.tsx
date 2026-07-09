import RoleForm from '@/pages/users/roles/form';
import users from '@/routes/users';
import roles from '@/routes/users/roles';
import type { CursorPaginatedResponse, Permission, Role, User } from '@/types';

type Props = {
    permissions: Permission[];
    role: Role;
    users: CursorPaginatedResponse<User>;
};

export default function RoleEdit({ permissions, role, users }: Props) {
    return <RoleForm permissions={permissions} role={role} users={users} />;
}

RoleEdit.layout = (props: { role: Role }) => ({
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
            title: props.role.name,
            href: roles.edit(props.role.uuid),
        },
        {
            title: 'Edit',
            href: roles.edit(props.role.uuid),
        },
    ],
});
