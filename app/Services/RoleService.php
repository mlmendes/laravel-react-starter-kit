<?php

namespace App\Services;

use App\Models\Role;
use App\Repositories\RoleRepository;
use Illuminate\Pagination\CursorPaginator;

readonly class RoleService
{
    public function __construct(private RoleRepository $roleRepository) {}

    /**
     * @return CursorPaginator<int, Role>
     */
    public function getAll(): CursorPaginator
    {
        return $this->roleRepository->all();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function save(array $data): Role
    {
        return $this->roleRepository->save($data);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(Role $role, array $data): Role
    {
        return $this->roleRepository->update($role, $data);
    }

    public function forceDelete(Role $role): bool
    {
        return $this->roleRepository->forceDelete($role);
    }
}
