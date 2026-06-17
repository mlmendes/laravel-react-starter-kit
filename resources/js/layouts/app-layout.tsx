import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';
import type { RouteDefinition } from '@/wayfinder';

export default function AppLayout({
    action,
    breadcrumbs = [],
    children,
}: {
    action?: RouteDefinition<'get'>;
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <AppLayoutTemplate action={action} breadcrumbs={breadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
