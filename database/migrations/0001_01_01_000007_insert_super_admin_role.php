<?php

use App\Enums\Role as RoleEnum;
use App\Models\Role as RoleModel;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        RoleModel::query()->create(['name' => RoleEnum::SUPER_ADMIN->value]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        RoleModel::query()->where(column: 'name', operator: '=', value: RoleEnum::SUPER_ADMIN->value)->delete();
    }
};
