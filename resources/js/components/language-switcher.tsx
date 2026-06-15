import { router } from '@inertiajs/react';
import { Check, ChevronsUpDown, Languages } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type TeamSwitcherProps = {
    inHeader?: boolean;
};

type Language = { key: string; label: string };

export function LanguageSwitcher({ inHeader = false }: TeamSwitcherProps) {
    const { t, i18n } = useTranslation();
    const isMobile = useIsMobile();
    const languages: Language[] = [
        {
            key: 'en',
            label: 'English',
        },
        {
            key: 'pt',
            label: 'Português',
        },
    ];

    const [currentLanguage, setCurrentLanguage] = useState<Language>(
        languages.find((language) => language.key === i18n.language) || {
            key: 'en',
            label: 'English',
        },
    );

    const switchLanguage = (language: Language) => {
        setCurrentLanguage(language);
        i18n.changeLanguage(language.key).then(() => {
            router.reload();
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    data-test="team-switcher-trigger"
                    className={
                        inHeader
                            ? 'h-8 gap-1 px-2'
                            : 'w-full justify-start px-2 has-[>svg]:px-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                    }
                >
                    <Languages
                        className={cn(
                            !inHeader &&
                                'size-4 shrink-0 group-data-[collapsible=icon]:block',
                        )}
                    />
                    <div
                        className={
                            inHeader
                                ? 'grid flex-1 text-left text-sm leading-tight'
                                : 'grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'
                        }
                    >
                        <span
                            className={
                                inHeader
                                    ? 'hidden'
                                    : 'truncate font-semibold'
                            }
                        >
                            {languages.find(
                                (language) => language === currentLanguage,
                            )?.label ?? 'English'}
                        </span>
                    </div>
                    <ChevronsUpDown
                        className={
                            inHeader
                                ? 'size-4 opacity-50'
                                : 'ml-auto group-data-[collapsible=icon]:hidden'
                        }
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={
                    inHeader
                        ? 'w-56'
                        : 'w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                }
                side={inHeader ? undefined : isMobile ? 'bottom' : 'right'}
                align={inHeader ? 'end' : 'start'}
                sideOffset={inHeader ? undefined : 4}
            >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {t('Languages')}
                </DropdownMenuLabel>
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.key}
                        data-test="team-switcher-item"
                        className={
                            inHeader
                                ? 'cursor-pointer gap-2'
                                : 'cursor-pointer gap-2 p-2'
                        }
                        onSelect={() => switchLanguage(language)}
                    >
                        {language.label}
                        {currentLanguage === language && (
                            <Check
                                className={
                                    inHeader
                                        ? 'ml-auto size-4'
                                        : 'ml-auto h-4 w-4'
                                }
                            />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
