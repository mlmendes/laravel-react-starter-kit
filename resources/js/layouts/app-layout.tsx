import type { ReactNode } from 'react';
import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import type { BreadcrumbItem } from '@/types';
import type { RouteDefinition } from '@/wayfinder';

export default function AppLayout({
    action,
    breadcrumbs = [],
    children,
    filter,
}: {
    action?: RouteDefinition<'get'>;
    breadcrumbs?: BreadcrumbItem[];
    children: ReactNode;
    filter?: ReactNode;
}) {
    return (
        <AppLayoutTemplate
            action={action}
            breadcrumbs={breadcrumbs}
            filter={filter}
        >
            {children}
        </AppLayoutTemplate>
    );
}
