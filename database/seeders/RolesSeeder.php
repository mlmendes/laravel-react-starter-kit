<?php

namespace Database\Seeders;

use App\Enums\Role as RoleEnum;
use App\Models\Role as RoleModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\PermissionRegistrar;
use Throwable;

class RolesSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     *
     * @throws Throwable
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        DB::transaction(function () {
            foreach (RoleEnum::cases() as $role) {
                RoleModel::findOrCreate($role);
            }
        });

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
