<?php

use App\Enums\Permission as PermissionEnum;
use App\Models\Permission as PermissionModel;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        PermissionModel::query()->fillAndInsert(array_map(function ($value) {
            return ['name' => $value];
        }, PermissionEnum::cases()));
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        PermissionModel::query()->whereIn(column: 'name', values: PermissionEnum::cases())->delete();
    }
};
