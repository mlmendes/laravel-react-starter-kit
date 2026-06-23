import RoleForm from '@/pages/roles/form';
import roles from '@/routes/roles';
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
            title: 'Roles',
            href: roles.index(),
        },
        {
            title: 'Create',
            href: roles.create(),
        },
    ],
});
