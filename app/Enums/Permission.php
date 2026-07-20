<?php

namespace App\Enums;

enum Permission: string
{
    case USERS_ACTIVITY_LOG_VIEW_ANY = 'users:activity log:view any';
    case USERS_CREATE = 'users:create';
    case USERS_DELETE = 'users:delete';
    case USERS_UPDATE = 'users:update';
    case USERS_ROLES_CREATE = 'users:roles:create';
    case USERS_ROLES_FORCE_DELETE = 'users:roles:force delete';
    case USERS_ROLES_UPDATE = 'users:roles:update';
}
