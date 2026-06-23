import RoleForm from '@/pages/roles/form';
import roles from '@/routes/roles';
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
