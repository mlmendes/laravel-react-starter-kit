import { Form, InfiniteScroll } from '@inertiajs/react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScrollNext from '@/components/infinite-scroll-next';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ucfirst } from '@/lib/utils';
import roles from '@/routes/users/roles';
import type { CursorPaginatedResponse, Permission, Role, User } from '@/types';

interface PermissionTree {
    [key: string]: PermissionTree | string;
}

type Props = {
    permissions: Permission[];
    role?: Role | undefined;
    users: CursorPaginatedResponse<User>;
};

function sortPermissionTree(node: PermissionTree): PermissionTree {
    const sortedEntries = Object.entries(node).sort(
        ([keyA, valA], [keyB, valB]) => {
            const isLeafA = typeof valA === 'string';
            const isLeafB = typeof valB === 'string';

            if (isLeafA && !isLeafB) {
                return -1;
            }

            if (!isLeafA && isLeafB) {
                return 1;
            }

            return keyA.localeCompare(keyB);
        },
    );

    const sortedObject: PermissionTree = {};

    for (const [key, value] of sortedEntries) {
        if (typeof value === 'string') {
            sortedObject[key] = value;
        } else {
            sortedObject[key] = sortPermissionTree(value as PermissionTree);
        }
    }

    return sortedObject;
}

function parsePermissions(permissions: Permission[]): PermissionTree {
    const root: PermissionTree = {};

    for (const permission of permissions) {
        const parts = permission.name.split(':');
        let currentLevel = root;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isLastPart = i === parts.length - 1;

            if (isLastPart) {
                currentLevel[part] = permission.uuid;
            } else {
                if (!currentLevel[part]) {
                    currentLevel[part] = {};
                }

                currentLevel = currentLevel[part] as PermissionTree;
            }
        }
    }

    return sortPermissionTree(root);
}

export default function RoleForm({ permissions, role, users }: Props) {
    const { t } = useTranslation();
    const formRoute = role ? roles.update(role.uuid) : roles.store();
    const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
        () => {
            const initial = new Set<string>();
            role?.permissions?.forEach((permission) =>
                initial.add(permission.uuid),
            );

            return initial;
        },
    );

    const permissionTree = parsePermissions(permissions);

    const toggleGroup = (node: any, isChecked: boolean) => {
        const childUuids = getAllChildUuids(node);

        if (isChecked) {
            setSelectedPermissions(
                selectedPermissions.union(new Set(childUuids)),
            );
        } else {
            setSelectedPermissions(
                selectedPermissions.difference(new Set(childUuids)),
            );
        }
    };

    const togglePermission = (uuid: string, isChecked: boolean) => {
        setSelectedPermissions((prev) => {
            const selectedPermissions = new Set(prev);

            if (isChecked) {
                selectedPermissions.add(uuid);
            } else {
                selectedPermissions.delete(uuid);
            }

            return selectedPermissions;
        });
    };

    function getAllChildUuids(node: any): string[] {
        if (typeof node === 'string') {
            return [node];
        }

        return Object.values(node).flatMap((child) => getAllChildUuids(child));
    }

    const renderTree = (currentNode: PermissionTree) => {
        return Object.entries(currentNode).map(([index, node]) => {
            const isLeaf = typeof node === 'string';

            if (isLeaf) {
                const uuid = node as string;

                return (
                    <Field key={uuid} orientation="horizontal">
                        <Checkbox
                            checked={selectedPermissions.has(uuid)}
                            defaultChecked={
                                !!role?.permissions.find(
                                    (rolePermission) =>
                                        rolePermission.uuid === uuid,
                                )
                            }
                            id={`permissions[${uuid}]`}
                            name={`permissions[]`}
                            onCheckedChange={(checked) =>
                                togglePermission(uuid, checked === true)
                            }
                            value={uuid}
                        />
                        <FieldLabel htmlFor={`permissions[${uuid}]`}>
                            {t(ucfirst(index))}
                        </FieldLabel>
                    </Field>
                );
            } else {
                const childUuids = getAllChildUuids(node);

                return (
                    <FieldGroup key={index}>
                        <Field orientation="horizontal">
                            <Checkbox
                                checked={isGroupChecked(childUuids)}
                                id={index}
                                onCheckedChange={(checked) => {
                                    toggleGroup(node, checked === true);
                                }}
                            />
                            <FieldLabel htmlFor={index}>
                                {t(ucfirst(index))}
                            </FieldLabel>
                        </Field>
                        <FieldGroup className="ml-8">
                            {renderTree(node as PermissionTree)}
                        </FieldGroup>
                    </FieldGroup>
                );
            }
        });
    };

    function areAllChecked(): CheckedState {
        if (
            permissions.every((permission) =>
                selectedPermissions.has(permission.uuid),
            )
        ) {
            return true;
        }

        if (selectedPermissions.size > 0) {
            return 'indeterminate';
        }

        return false;
    }

    function isGroupChecked(childUuids: string[]): CheckedState {
        if (
            childUuids.every((permission) =>
                selectedPermissions.has(permission),
            )
        ) {
            return true;
        }

        if (
            childUuids.some((permission) => selectedPermissions.has(permission))
        ) {
            return 'indeterminate';
        }

        return false;
    }

    return (
        <Form
            action={formRoute.url}
            className="m-8 h-48"
            disableWhileProcessing
            method={formRoute.method}
            transform={(data) => ({
                permissions: [],
                ...data,
            })}
        >
            {({ errors, resetAndClearErrors }) => (
                <FieldSet>
                    <FieldGroup className="grid grid-cols-1 lg:grid-cols-2">
                        <Field
                            className="lg:col-span-2"
                            orientation="horizontal"
                        >
                            <Button type="submit">{t('Save')}</Button>
                            <Button
                                onClick={() => resetAndClearErrors()}
                                type="reset"
                                variant="outline"
                            >
                                {t('Cancel')}
                            </Button>
                        </Field>
                        <Field
                            className="lg:col-span-2"
                            data-invalid={!!errors.name}
                        >
                            <FieldLabel htmlFor="name">{t('Name')}</FieldLabel>
                            <Input
                                aria-invalid={!!errors.name}
                                autoComplete="name"
                                defaultValue={role?.name}
                                id="name"
                                name="name"
                                placeholder={t('Name')}
                                required
                            />
                            <FieldError>{errors.name}</FieldError>
                        </Field>
                        <FieldSet>
                            <FieldLegend>{t('Permissions')}</FieldLegend>
                            <FieldGroup>
                                <Field orientation="horizontal">
                                    <Checkbox
                                        checked={areAllChecked()}
                                        id="select-all-permissions"
                                        onCheckedChange={(checked) => {
                                            if (checked === true) {
                                                setSelectedPermissions(
                                                    new Set(
                                                        permissions.map(
                                                            (permission) =>
                                                                permission.uuid,
                                                        ),
                                                    ),
                                                );
                                            } else {
                                                setSelectedPermissions(
                                                    new Set<string>(),
                                                );
                                            }
                                        }}
                                    />
                                    <FieldLabel htmlFor="select-all-permissions">
                                        {t('Select all')}
                                    </FieldLabel>
                                </Field>
                                <FieldGroup className="ml-8">
                                    {renderTree(permissionTree)}
                                </FieldGroup>
                            </FieldGroup>
                            <FieldError>{errors.permissions}</FieldError>
                        </FieldSet>

                        <FieldSet>
                            <FieldLegend>{t('Users')}</FieldLegend>
                            <FieldGroup className="gap-0">
                                <InfiniteScroll
                                    className="space-y-2"
                                    data="users"
                                    next={({ loading, hasMore }) => (
                                        <InfiniteScrollNext
                                            loading={loading}
                                            hasMore={hasMore}
                                        />
                                    )}
                                    preserveUrl
                                >
                                    {users.data.map((user) => (
                                        <Field
                                            key={user.uuid}
                                            orientation="horizontal"
                                        >
                                            <Checkbox
                                                defaultChecked={role?.users?.some(
                                                    (roleUser) =>
                                                        roleUser.uuid ===
                                                        user.uuid,
                                                )}
                                                id={`users[${user.uuid}]`}
                                                name="users[]"
                                                value={user.uuid}
                                            />
                                            <FieldContent className="gap-0">
                                                <FieldLabel
                                                    htmlFor={`users[${user.uuid}]`}
                                                >
                                                    {user.name}
                                                </FieldLabel>
                                                <FieldDescription>
                                                    {user.email}
                                                </FieldDescription>
                                            </FieldContent>
                                        </Field>
                                    ))}
                                </InfiniteScroll>
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                </FieldSet>
            )}
        </Form>
    );
}
