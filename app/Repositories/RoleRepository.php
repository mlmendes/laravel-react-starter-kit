<?php

namespace App\Repositories;

use App\Models\Role as RoleModel;
use Illuminate\Pagination\CursorPaginator;

class RoleRepository
{
    /**
     * @return CursorPaginator<int, RoleModel>
     */
    public function all(): CursorPaginator
    {
        return RoleModel::query()->orderBy(column: 'name')->cursorPaginate();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function save(array $data): RoleModel
    {
        $role = RoleModel::query()->create($data);
        if (array_key_exists('permissions', $data)) {
            $role->syncPermissions($data['permissions']);
        }
        if (array_key_exists('users', $data)) {
            $role->users()->sync($data['users']);
        }

        return $role->fresh();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(RoleModel $role, array $data): RoleModel
    {
        $role->update($data);
        if (array_key_exists('permissions', $data)) {
            $role->syncPermissions($data['permissions']);
        }
        if (array_key_exists('users', $data)) {
            $role->users()->sync($data['users']);
        }

        return $role->fresh();
    }

    public function forceDelete(RoleModel $role): bool
    {
        return $role->delete();
    }
}
