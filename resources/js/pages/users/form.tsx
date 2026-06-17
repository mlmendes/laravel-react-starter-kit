import { Form } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import users from '@/routes/users';
import type { User } from '@/types';

type Props = {
    user?: User | undefined;
};

export default function UserForm({ user }: Props) {
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
