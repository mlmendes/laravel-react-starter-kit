import { router } from '@inertiajs/react';
import { Check, Pencil, X } from 'lucide-react';
import { Translation } from 'react-i18next';
import { LocalizedTimestamp } from '@/components/localized-timestamp';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/user-avatar';
import roles from '@/routes/roles';
import users from '@/routes/users';
import type { ItemSchema, Role, User } from '@/types';

export const role: ItemSchema<Role> = {
    title: (role) => role.name,
    actions: (role) => (
        <Translation>
            {(t) => (
                <>
                    <DropdownMenuItem
                        onSelect={() => router.get(roles.edit(role.uuid))}
                    >
                        <Pencil />
                        <Translation>{(t) => <p>{t('Edit')}</p>}</Translation>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={() => {
                            if (
                                window.confirm(
                                    t(
                                        'Are you sure you want to delete :model :name?',
                                        {
                                            model: t('role'),
                                            name: role.name,
                                        },
                                    ),
                                )
                            ) {
                                router.delete(roles.destroy(role.uuid));
                            }
                        }}
                        variant="destructive"
                    >
                        <X />
                        {t('Delete')}
                    </DropdownMenuItem>
                </>
            )}
        </Translation>
    ),
};

export const user: ItemSchema<User> = {
    media: (user) => <UserAvatar user={user} />,
    title: (user) => user.name,
    description: (user) => user.email,
    fields: [
        {
            key: 'created_at',
            label: 'Created at',
            render: (user) => (
                <LocalizedTimestamp timestamp={user.created_at} />
            ),
        },
    ],
    actions: (user) => (
        <Translation>
            {(t) => (
                <>
                    <DropdownMenuItem
                        onSelect={() => router.get(users.edit(user.uuid))}
                    >
                        <Pencil />
                        <Translation>{(t) => <p>{t('Edit')}</p>}</Translation>
                    </DropdownMenuItem>
                    {user.deleted_at ? (
                        <DropdownMenuItem
                            onSelect={() => {
                                if (
                                    window.confirm(
                                        t(
                                            'Are you sure you want to restore :model :name?',
                                            {
                                                model: t('user'),
                                                name: user.name,
                                            },
                                        ),
                                    )
                                ) {
                                    router.post(users.restore(user.uuid));
                                }
                            }}
                        >
                            <Check />
                            {t('Restore')}
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem
                            onSelect={() => {
                                if (
                                    window.confirm(
                                        t(
                                            'Are you sure you want to delete :model :name?',
                                            {
                                                model: t('user'),
                                                name: user.name,
                                            },
                                        ),
                                    )
                                ) {
                                    router.delete(users.destroy(user.uuid));
                                }
                            }}
                            variant="destructive"
                        >
                            <X />
                            {t('Delete')}
                        </DropdownMenuItem>
                    )}
                </>
            )}
        </Translation>
    ),
};
