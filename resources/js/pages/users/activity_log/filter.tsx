import { Form, usePage } from '@inertiajs/react';
import { Funnel } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePickerWithRange } from '@/components/date-picker-with-range';
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

type PageProps = {
    filter?: {
        attributes?: string;
        period?: {
            from?: string;
            to?: string;
        };
    };
};

export default function ActivityFilter() {
    const { t } = useTranslation();
    const { filter } = usePage<PageProps>().props;
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline">
                    <Funnel />
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>{t('Activity search')}</DialogTitle>
                </DialogHeader>
                <Form
                    action={users.activity_log().url}
                    method={users.activity_log().method}
                    onSuccess={() => setOpen(false)}
                >
                    <FieldGroup>
                        <DatePickerWithRange
                            defaultValue={{
                                from: filter?.period?.from
                                    ? new Date(filter.period.from)
                                    : undefined,
                                to: filter?.period?.to
                                    ? new Date(filter.period.to)
                                    : undefined,
                            }}
                            id="filter[period]"
                            label={t('Period')}
                            name="filter[period]"
                        />
                        <Field>
                            <Label htmlFor="attributes">
                                {t('Attributes')}
                            </Label>
                            <Input
                                defaultValue={filter?.attributes}
                                id="attributes"
                                name="filter[attributes]"
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
