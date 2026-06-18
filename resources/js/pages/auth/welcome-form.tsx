import { Form, Head } from '@inertiajs/react';
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
import welcome from '@/routes/welcome';
import type { User } from '@/types';

type Props = {
    user: User;
};

export default function WelcomeForm({ user }: Props) {
    const { t } = useTranslation();
    const urlParams = new URLSearchParams(window.location.search);
    const signature = urlParams.get('signature');
    const expires = urlParams.get('expires');

    return (
        <>
            <Head title={t('Set initial password')} />
            <Form
                {...welcome.store.form(
                    { uuid: user.uuid },
                    { mergeQuery: { expires, signature } },
                )}
                disableWhileProcessing
            >
                {({ errors }) => (
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">
                                    {t('Name')}
                                </FieldLabel>
                                <Input
                                    autoComplete="off"
                                    defaultValue={user.name}
                                    disabled
                                    id="name"
                                    type="text"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">
                                    {t('Email address')}
                                </FieldLabel>
                                <Input
                                    autoComplete="off"
                                    defaultValue={user.email}
                                    disabled
                                    id="email"
                                    readOnly
                                    type="email"
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">
                                    {t('Password')}
                                </FieldLabel>
                                <Input
                                    autoComplete="new-password"
                                    id="password"
                                    name="password"
                                    placeholder={t('Password')}
                                    required
                                    type="password"
                                />
                                <FieldError>{errors.password}</FieldError>
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password_confirmation">
                                    {t('Password confirmation')}
                                </FieldLabel>
                                <Input
                                    autoComplete="new-password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    placeholder={t('Password confirmation')}
                                    required
                                    type="password"
                                />
                                <FieldError>
                                    {errors.password_confirmation}
                                </FieldError>
                            </Field>
                            <Field>
                                <Button className="w-full" type="submit">
                                    {t('Save password')}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                )}
            </Form>
        </>
    );
}

WelcomeForm.layout = {
    title: 'Set initial password',
    description: 'Enter a password to start using your account',
};
