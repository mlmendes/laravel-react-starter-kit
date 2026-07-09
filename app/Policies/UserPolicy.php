<?php

namespace App\Policies;

use App\Enums\Permission;
use App\Enums\Role;
use App\Models\User;

class UserPolicy
{
    public function before(User $user, string $ability, User|string $model): ?bool
    {
        if (! is_string($model)) {
            if (get_class($model) === User::class) {
                if (($ability === 'delete' || $ability === 'restore') && $user->uuid === $model->uuid) {
                    return false;
                }
            }
        }
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
        return $user->hasAnyPermission([
            Permission::USERS_CREATE,
            Permission::USERS_DELETE,
            Permission::USERS_UPDATE,
        ]);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo(Permission::USERS_CREATE);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return $user->hasPermissionTo(Permission::USERS_UPDATE);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        return $user->hasPermissionTo(Permission::USERS_DELETE);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return $user->hasPermissionTo(Permission::USERS_DELETE);
    }
}
