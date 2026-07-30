import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    action,
    breadcrumbs,
    children,
    filter,
}: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <AppHeader
                action={action}
                breadcrumbs={breadcrumbs}
                filter={filter}
            />
            <AppContent variant="header">{children}</AppContent>
        </AppShell>
    );
}
