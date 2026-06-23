<?php

namespace App\Policies;

use App\Enums\Permission;
use App\Enums\Role as RoleEnum;
use App\Models\Role as RoleModel;
use App\Models\User;

class RolePolicy
{
    public function before(User $user, string $ability, RoleModel|string $role): ?bool
    {
        if (! is_string($role)) {
            if (get_class($role) === RoleModel::class) {
                if ($role->name === RoleEnum::SUPER_ADMIN->value) {
                    return false;
                }
            }
        }
        if ($user->hasRole(RoleEnum::SUPER_ADMIN)) {
            return true;
        }

        return null;
    }

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAnyPermission(Permission::USERS_ROLES_CREATE, Permission::USERS_ROLES_FORCE_DELETE, Permission::USERS_ROLES_UPDATE);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo(Permission::USERS_ROLES_CREATE);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return $user->hasPermissionTo(Permission::USERS_ROLES_UPDATE);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function forceDelete(User $user): bool
    {
        return $user->hasPermissionTo(Permission::USERS_ROLES_FORCE_DELETE);
    }
}
