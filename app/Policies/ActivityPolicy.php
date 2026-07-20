<?php

namespace App\Policies;

use App\Enums\Permission;
use App\Enums\Role;
use App\Models\User;

class ActivityPolicy
{
    public function before(User $user): ?bool
    {
        if ($user->hasRole(Role::SUPER_ADMIN)) {
            return true;
        }

        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasPermissionTo(Permission::USERS_ACTIVITY_LOG_VIEW_ANY);
    }
}
