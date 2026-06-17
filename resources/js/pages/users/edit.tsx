import UserForm from '@/pages/users/form';
import users from '@/routes/users';
import type { User } from '@/types';

type Props = {
    user: User;
};

export default function UserEdit({ user }: Props) {
    return <UserForm user={user} />;
}

UserEdit.layout = (props: { user: User }) => ({
    action: users.create(),
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index(),
        },
        {
            title: props.user.name,
            href: users.edit(props.user.uuid),
        },
        {
            title: 'Edit',
            href: users.edit(props.user.uuid),
        },
    ],
});
