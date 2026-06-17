import UserForm from '@/pages/users/form';
import users from '@/routes/users';

export default function UserCreate() {
    return <UserForm />;
}

UserCreate.layout = () => ({
    action: users.create(),
    breadcrumbs: [
        {
            title: 'Users',
            href: users.index(),
        },
        {
            title: 'Create',
            href: users.create(),
        },
    ],
});
