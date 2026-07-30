import { ptBR, enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { LocalizedTimestamp } from '@/components/localized-timestamp';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

const localeMap: Record<string, typeof ptBR> = {
    'pt-BR': ptBR,
    pt: ptBR,
    'en-US': enUS,
    en: enUS,
};

export function DatePickerWithRange({
    id,
    label,
    name,
}: {
    id: string;
    label: string;
    name: string;
}) {
    const { i18n, t } = useTranslation();
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    const currentLocale = localeMap[i18n.language] || enUS;

    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <input
                name={`${name}[from]`}
                type="hidden"
                value={date?.from?.toISOString().split('T')[0]}
            />
            <input
                name={`${name}[to]`}
                type="hidden"
                value={date?.to?.toISOString().split('T')[0]}
            />
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={id}
                        className="justify-start px-2.5 font-normal"
                        type="button"
                    >
                        <CalendarIcon data-icon="inline-start" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    <LocalizedTimestamp
                                        dateStyle="medium"
                                        timestamp={date.from.toISOString()}
                                        timeStyle={null}
                                    />
                                    {' - '}
                                    <LocalizedTimestamp
                                        dateStyle="medium"
                                        timestamp={date.to.toISOString()}
                                        timeStyle={null}
                                    />
                                </>
                            ) : (
                                <LocalizedTimestamp
                                    timestamp={date.from.toISOString()}
                                    timeStyle={null}
                                />
                            )
                        ) : (
                            <span>{t('Pick a period')}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        locale={currentLocale}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    );
}
