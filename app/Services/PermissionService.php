<?php

namespace App\Services;

use App\Models\Permission;
use App\Repositories\PermissionRepository;
use Illuminate\Database\Eloquent\Collection;

readonly class PermissionService
{
    public function __construct(private PermissionRepository $permissionRepository) {}

    /**
     * @return Collection<int, Permission>
     */
    public function getAll(): Collection
    {
        return $this->permissionRepository->all();
    }
}
