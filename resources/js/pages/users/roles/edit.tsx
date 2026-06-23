import RoleForm from '@/pages/users/roles/form';
import users from '@/routes/users';
import roles from '@/routes/users/roles';
import type { Permission, Role } from '@/types';

type Props = {
    permissions: Permission[];
    role: Role;
};

export default function RoleEdit({ permissions, role }: Props) {
    return <RoleForm permissions={permissions} role={role} />;
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
