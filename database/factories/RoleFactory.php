<?php

namespace Database\Factories;

use App\Enums\Permission;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Role>
 */
class RoleFactory extends Factory
{
    public function configure(): static
    {
        return $this->afterCreating(function (Role $role) {
            $randomPermissions = collect(Permission::cases())->random(random_int(1, count(Permission::cases())));

            $role->syncPermissions($randomPermissions);
        });
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
        ];
    }
}
