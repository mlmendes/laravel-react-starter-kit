import { Form, Head, router } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldSet } from '@/components/ui/field';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import otpChallenge from '@/routes/otp-challenge';

export default function OtpChallenge() {
    const { t } = useTranslation();

    const [cooldown, setCooldown] = useState<number>(30);
    useEffect(() => {
        let time: string | number | NodeJS.Timeout | undefined;

        if (cooldown > 0) {
            time = setTimeout(
                () => setCooldown((counter) => counter - 1),
                1000,
            );
        }

        return () => clearTimeout(time);
    }, [cooldown]);

    return (
        <>
            <Head title={t('Two-factor authentication')} />
            <Form
                action={otpChallenge.store().url}
                disableWhileProcessing
                method={otpChallenge.store().method}
                resetOnError
            >
                {({ errors, processing, resetAndClearErrors }) => (
                    <FieldSet>
                        <FieldGroup className="text-center">
                            <Field>
                                <div className="flex w-full justify-center">
                                    <InputOTP
                                        autoFocus
                                        disabled={processing}
                                        maxLength={OTP_MAX_LENGTH}
                                        name="code"
                                        pattern={REGEXP_ONLY_DIGITS}
                                        required
                                    >
                                        <InputOTPGroup>
                                            {Array.from(
                                                { length: OTP_MAX_LENGTH },
                                                (_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                    />
                                                ),
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </Field>
                            <InputError message={errors.code} />
                        </FieldGroup>
                        <FieldGroup>
                            <Button disabled={processing} type="submit">
                                {t('Continue')}
                            </Button>
                            <Button
                                disabled={cooldown > 0 || processing}
                                onClick={() => {
                                    router.put(otpChallenge.update());
                                    setCooldown(30);
                                    resetAndClearErrors();
                                }}
                                type="button"
                                variant="link"
                            >
                                {t(
                                    '{cooldown, plural, =0 {Resend code} =1 {Resend in {cooldown} second} other {Resend in {cooldown} seconds}}',
                                    { cooldown },
                                )}
                            </Button>
                        </FieldGroup>
                    </FieldSet>
                )}
            </Form>
        </>
    );
}

OtpChallenge.layout = {
    title: 'Two-factor authentication',
    description: "Enter the single use code we've just sent to your email",
};
