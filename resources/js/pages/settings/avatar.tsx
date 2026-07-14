import { Form, Head, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useAvatarEditor } from 'react-avatar-editor';
import { useTranslation } from 'react-i18next';
import AvatarUploader from '@/components/avatar-uploader';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { FieldError, FieldSet } from '@/components/ui/field';
import avatar from '@/routes/avatar';
import type { Auth } from '@/types';

type PageProps = {
    auth: Auth;
};

export default function Profile() {
    const { t } = useTranslation();
    const { auth } = usePage<PageProps>().props;
    const [image, setImage] = useState<File | string | undefined>(
        auth.user.avatar ?? undefined,
    );
    const editor = useAvatarEditor();
    const formRef = useRef<any>(null);
    const avatarFileRef = useRef<File | null>(null);

    function handleSubmit() {
        if (!image) {
            avatarFileRef.current = null;
            formRef.current?.submit();

            return;
        }

        const canvas = editor.ref.current?.getImageScaledToCanvas();

        if (!canvas) {
            return;
        }

        canvas.toBlob((blob) => {
            if (blob) {
                avatarFileRef.current = new File([blob], 'avatar.jpg', {
                    type: 'image/jpeg',
                });

                formRef.current?.submit();
            }
        }, 'image/jpeg');
    }

    return (
        <>
            <Head title={t('Profile picture')} />
            <h1 className="sr-only">{t('Profile picture')}</h1>
            <div className="space-y-6">
                <Heading
                    variant="small"
                    title={t('Profile picture')}
                    description={t('Update or remove your profile picture')}
                />

                <Form
                    action={avatar.upload().url}
                    disableWhileProcessing
                    method={avatar.upload().method}
                    ref={formRef}
                    transform={() => ({
                        avatar: avatarFileRef.current,
                    })}
                >
                    {({ errors }) => (
                        <FieldSet>
                            <AvatarUploader
                                editor={editor}
                                image={image}
                                setImage={setImage}
                            />
                            <FieldError>{errors.avatar}</FieldError>
                            <Button type="button" onClick={handleSubmit}>
                                {t('Save')}
                            </Button>
                        </FieldSet>
                    )}
                </Form>
            </div>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile picture',
            href: avatar.view(),
        },
    ],
};
