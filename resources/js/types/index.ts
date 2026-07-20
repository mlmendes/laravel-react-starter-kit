import type { User } from '@/types/auth';

export type * from './auth';
export type * from './navigation';
export type * from './ui';

export type Activity = {
    uuid: string;
    log_name?: string;
    description: string;
    subject_type?: string;
    subject_id?: string;
    subject?: {
        uuid: string;
        [key: string]: unknown;
    };
    event?: string;
    causer_type?: string;
    causer_id?: string;
    causer?: User;
    attribute_changes?: {
        attributes: {
            [key: string]: unknown;
        };
        old?: {
            [key: string]: unknown;
        };
    };
    properties?: {
        ip_address: string;
        user_agent: string;
        [key: string]: unknown;
    };
    created_at: string;
};

export type Permission = {
    uuid: string;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
};

export type Role = {
    uuid: string;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
    users?: User[];
};
