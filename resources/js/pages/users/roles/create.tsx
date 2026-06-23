import RoleForm from '@/pages/users/roles/form';
import users from '@/routes/users';
import roles from '@/routes/users/roles';
import type { Permission } from '@/types';

type Props = {
    permissions: Permission[];
};

export default function RoleCreate({ permissions }: Props) {
    return <RoleForm permissions={permissions} />;
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
