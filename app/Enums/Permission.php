<?php

namespace App\Enums;

enum Permission: string
{
    case ROLES_CREATE = 'roles:create';
    case ROLES_FORCE_DELETE = 'roles:force_delete';
    case ROLES_UPDATE = 'roles:update';
    case USERS_CREATE = 'users:create';
    case USERS_DELETE = 'users:delete';
    case USERS_UPDATE = 'users:update';
}
