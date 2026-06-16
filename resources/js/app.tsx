import { createInertiaApp } from '@inertiajs/react';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import pt_BR from '@lang/pt_BR.json';

type TranslationResource = string | { [key: string]: TranslationResource };

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const convertLaravelPlaceholders = (
    obj: TranslationResource,
): TranslationResource => {
    if (typeof obj === 'string') {
        return obj.replace(/:([a-zA-Z_]\w*)/g, '{{$1}}');
    }

    const entries = Object.entries(obj).map(([key, value]) => [
        key,
        convertLaravelPlaceholders(value),
    ]);

    return Object.fromEntries(entries);
};

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'pt'],
        debug: import.meta.env.VITE_APP_DEBUG === 'true',
        detection: {
            caches: ['cookie'],
            cookieOptions: {
                path: '/',
                maxAge: 31536000,
                sameSite: 'lax',
            },
            order: ['cookie', 'navigator'],
            lookupCookie: 'locale',
        },
        resources: {
            pt: { translation: convertLaravelPlaceholders(pt_BR) },
        },
    })
    .then(() => {
        createInertiaApp({
            title: (title) => (title ? `${title} - ${appName}` : appName),
            layout: (name) => {
                switch (true) {
                    case name === 'welcome':
                        return null;
                    case name.startsWith('auth/'):
                        return AuthLayout;
                    case name.startsWith('settings/'):
                        return [AppLayout, SettingsLayout];
                    default:
                        return AppLayout;
                }
            },
            strictMode: true,
            withApp(app) {
                return (
                    <TooltipProvider delayDuration={0}>
                        {app}
                        <Toaster richColors />
                    </TooltipProvider>
                );
            },
            progress: {
                color: '#4B5563',
            },
        });

        // This will set light / dark mode on load...
        initializeTheme();
    });
