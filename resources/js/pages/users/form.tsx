import { Form, InfiniteScroll, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import InfiniteScrollNext from '@/components/infinite-scroll-next';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldContent,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import users from '@/routes/users';
import type { CursorPaginatedResponse, Role, User } from '@/types';

type Props = {
    user?: User | undefined;
    roles?: CursorPaginatedResponse<Role>;
};

export default function UserForm({ user }: Props) {
    const { roles } = usePage<Props>().props;
    const { t } = useTranslation();
    const formRoute = user ? users.update(user.uuid) : users.store();

    return (
        <Form
            action={formRoute.url}
            className="m-8 max-w-xs"
            disableWhileProcessing
            method={formRoute.method}
        >
            {({ errors, resetAndClearErrors }) => (
                <FieldSet>
                    <FieldGroup>
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
                    <FieldGroup>
                        <Field data-invalid={errors.name !== undefined}>
                            <FieldLabel htmlFor="name">{t('Name')}</FieldLabel>
                            <Input
                                aria-invalid={errors.name !== undefined}
                                autoComplete="name"
                                defaultValue={user?.name}
                                id="name"
                                name="name"
                                placeholder={t('Full name')}
                                required
                            />
                            <FieldError>{errors.name}</FieldError>
                        </Field>
                        <Field data-invalid={errors.email !== undefined}>
                            <FieldLabel htmlFor="email">
                                {t('Email address')}
                            </FieldLabel>
                            <Input
                                aria-invalid={errors.email !== undefined}
                                autoComplete="email"
                                defaultValue={user?.email}
                                id="email"
                                name="email"
                                placeholder={t('Email address')}
                                required
                                type="email"
                            />
                            <FieldError>{errors.email}</FieldError>
                        </Field>
                    </FieldGroup>
                    <FieldSet>
                        <FieldLegend>{t('Roles')}</FieldLegend>
                        <FieldGroup className="gap-0">
                            <InfiniteScroll
                                className="space-y-2"
                                data="roles"
                                next={({ loading, hasMore }) => (
                                    <InfiniteScrollNext
                                        loading={loading}
                                        hasMore={hasMore}
                                    />
                                )}
                                preserveUrl
                            >
                                {roles?.data.map((role) => (
                                    <Field
                                        key={role.uuid}
                                        orientation="horizontal"
                                    >
                                        <Checkbox
                                            defaultChecked={user?.roles?.some(
                                                (userRole) =>
                                                    userRole.uuid === role.uuid,
                                            )}
                                            id={`roles[${role.uuid}]`}
                                            name="roles[]"
                                            value={role.uuid}
                                        />
                                        <FieldContent className="gap-0">
                                            <FieldLabel
                                                htmlFor={`roles[${role.uuid}]`}
                                            >
                                                {role.name}
                                            </FieldLabel>
                                        </FieldContent>
                                    </Field>
                                ))}
                            </InfiniteScroll>
                        </FieldGroup>
                    </FieldSet>
                </FieldSet>
            )}
        </Form>
    );
}
