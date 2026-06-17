import { useTranslation } from 'react-i18next';

export function LocalizedTimestamp({
    dateStyle = 'short',
    timeStyle = 'short',
    timestamp,
}: {
    dateStyle?: 'full' | 'long' | 'medium' | 'short' | undefined | null;
    timeStyle?: 'full' | 'long' | 'medium' | 'short' | undefined | null;
    timestamp: string;
}) {
    const { i18n } = useTranslation();
    const locale = i18n.language;
    const dateObj = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat(locale, {
        ...(dateStyle !== null && { dateStyle: dateStyle }),
        ...(timeStyle !== null && { timeStyle: timeStyle }),
    }).format(dateObj);

    return <>{formattedDate}</>;
}
