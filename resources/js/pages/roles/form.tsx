import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import roles from '@/routes/roles';
import type { Permission, Role } from '@/types';

type Props = {
    permissions: Permission[];
    role?: Role | undefined;
};

export default function RoleForm({ permissions, role }: Props) {
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

    return (
        <Form
            action={formRoute.url}
            className="m-8 max-w-xs"
            disableWhileProcessing
            method={formRoute.method}
            transform={(data) => ({
                permissions: [],
                ...data,
            })}
        >
            {({ errors, resetAndClearErrors }) => (
                <FieldSet>
                    <FieldGroup>
                        <Field data-invalid={!!errors.name}>
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
                                        checked={permissions.every(
                                            (permission) =>
                                                selectedPermissions.has(
                                                    permission.uuid,
                                                ),
                                        )}
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
                                    <FieldLabel htmlFor="select-all-permissions">{t('Select all')}</FieldLabel>
                                </Field>
                                {permissions.map((permission) => (
                                    <Field
                                        className="ml-8"
                                        key={permission.uuid}
                                        orientation="horizontal"
                                    >
                                        <Checkbox
                                            checked={selectedPermissions.has(
                                                permission.uuid,
                                            )}
                                            defaultChecked={
                                                !!role?.permissions.find(
                                                    (rolePermission) =>
                                                        rolePermission.uuid ===
                                                        permission.uuid,
                                                )
                                            }
                                            id={`permissions[${permission.uuid}]`}
                                            name={`permissions[]`}
                                            onCheckedChange={(checked) =>
                                                togglePermission(
                                                    permission.uuid,
                                                    checked === true,
                                                )
                                            }
                                            value={permission.uuid}
                                        />
                                        <FieldLabel
                                            htmlFor={`permissions[${permission.uuid}]`}
                                            defaultChecked
                                        >
                                            {permission.name}
                                        </FieldLabel>
                                    </Field>
                                ))}
                            </FieldGroup>
                            <FieldError>{errors.permissions}</FieldError>
                        </FieldSet>
                        <Field orientation="horizontal">
                            <Button type="submit">{t('Save')}</Button>
                            <Button
                                onClick={() => resetAndClearErrors()}
                                type="reset"
                                variant="outline"
                            >
                                {t('Cancel')}
                            </Button>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            )}
        </Form>
    );
}
