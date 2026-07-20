import { router } from '@inertiajs/react';
import { Check, ChevronRight, Pencil, X } from 'lucide-react';
import { Translation } from 'react-i18next';
import { LocalizedTimestamp } from '@/components/localized-timestamp';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/user-avatar';
import users from '@/routes/users';
import roles from '@/routes/users/roles';
import type { Activity, ItemSchema, Role, User } from '@/types';

export const activity: ItemSchema<Activity> = {
    media: (activity) =>
        activity.causer ? <UserAvatar user={activity.causer} /> : undefined,
    title: (activity) => activity.causer?.name,
    fields: [
        {
            key: 'event',
            label: 'Event',
            render: (activity) => activity.event,
        },
        {
            key: 'subject_type',
            label: 'Subject type',
            render: (activity) => activity.subject_type,
        },
        {
            key: 'attribute_changes',
            label: 'Attributes',
            render: (activity) => {
                const attributes = activity.attribute_changes
                    ?.attributes as Record<string, unknown>;
                const old = activity.attribute_changes?.old as Record<
                    string,
                    unknown
                >;

                return (
                    <ul className="space-y-1 text-sm">
                        {Object.keys(attributes).map((key) => {
                            let oldValue = undefined;

                            if (old) {
                                oldValue = old[key] ?? undefined;
                            }

                            const newValue = attributes[key];

                            return (
                                <li key={key} className="flex flex-wrap gap-1">
                                    <span className="font-bold">{key}:</span>
                                    {oldValue && (
                                        <>
                                            <span className="text-destructive line-through">
                                                {oldValue as string}
                                            </span>
                                            <ChevronRight className="size-5" />
                                        </>
                                    )}
                                    <span>{newValue as string}</span>
                                </li>
                            );
                        })}
                    </ul>
                );
            },
        },
        {
            key: 'created_at',
            label: 'Logged at',
            render: (activity) => (
                <LocalizedTimestamp timestamp={activity.created_at} />
            ),
        },
        {
            key: 'log_name',
            label: 'Log name',
            render: (activity) => activity.log_name,
        },
    ],
};

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
