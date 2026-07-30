import { Form } from '@inertiajs/react';
import { Funnel } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import users from '@/routes/users';

export default function UserFilter() {
    const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline">
                    <Funnel />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('User search')}</DialogTitle>
                </DialogHeader>
                <Form
                    action={users.index().url}
                    method={users.index().method}
                    onSuccess={() => setOpen(false)}
                >
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name">{t('Name')}</Label>
                            <Input id="name" name="filter[name]" type="text" />
                        </Field>
                        <Field>
                            <Label htmlFor="email">{t('Email')}</Label>
                            <Input
                                id="email"
                                name="filter[email]"
                                type="text"
                            />
                        </Field>
                        <Button type="submit">{t('Search')}</Button>
                    </FieldGroup>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
