export type * from './auth';
export type * from './navigation';
export type * from './ui';

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
};
