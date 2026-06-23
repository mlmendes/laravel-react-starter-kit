<?php

use App\Enums\Permission as PermissionEnum;
use App\Models\Permission as PermissionModel;

if (! function_exists('batchInsertPermissions') && ! function_exists('batchDeletePermissions')) {
    function batchInsertPermissions(string $startingWith): void
    {
        $batch = [];
        foreach (array_filter(PermissionEnum::cases(), fn ($permission) => str_starts_with($permission->value, $startingWith)) as $permission) {
            $batch[] = ['name' => $permission->value];
        }
        PermissionModel::query()->fillAndInsert($batch);
    }

    function batchDeletePermissions(string $startingWith): void
    {
        PermissionModel::query()->whereLike(column: 'name', value: "$startingWith%")->delete();
    }
}
