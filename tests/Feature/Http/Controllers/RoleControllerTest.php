<?php

use App\Enums\Permission;
use App\Models\Role;
use App\Models\User;

beforeEach(function () {
    $this->authUser = User::factory()->create();
});

test('can access users\' roles index', function () {
    $this->authUser->givePermissionTo([
        Permission::USERS_ROLES_CREATE,
        Permission::USERS_ROLES_FORCE_DELETE,
        Permission::USERS_ROLES_UPDATE,
    ]);
    $this->actingAs($this->authUser)
        ->get(route('users.roles.index'))
        ->assertOk();
});

test('can create role', function () {
    $this->authUser->givePermissionTo(Permission::USERS_ROLES_CREATE);

    $name = fake()->word();
    $permissions = randomPermissionsIds();

    $this->actingAs($this->authUser)
        ->get(route('users.roles.create'))
        ->assertOk();

    $this->actingAs($this->authUser)
        ->fromRoute('users.roles.create')
        ->post(route('users.roles.store'), [
            'name' => $name,
            'permissions' => $permissions,
        ])->assertRedirectToRoute('users.roles.index');

    assertRoleExists(name: $name, permissionsIds: $permissions);
});

test('can edit role', function () {
    $this->authUser->givePermissionTo(Permission::USERS_ROLES_UPDATE);

    $role = Role::factory()->create();

    $this->actingAs($this->authUser)
        ->get(route('users.roles.edit', $role))
        ->assertOk();

    $newName = fake()->word();
    $newPermissions = randomPermissionsIds();

    $this->actingAs($this->authUser)
        ->fromRoute('users.roles.edit', $role)
        ->patch(route('users.roles.update', $role), [
            'name' => $newName,
            'permissions' => $newPermissions,
        ])->assertRedirectToRoute('users.roles.index');

    assertRoleExists(name: $newName, permissionsIds: $newPermissions);
});

test('can force delete role', function () {
    $this->authUser->givePermissionTo(Permission::USERS_ROLES_FORCE_DELETE);
    $role = Role::factory()->create();

    $this->actingAs($this->authUser)
        ->fromRoute('users.roles.index')
        ->delete(route('users.roles.destroy', $role))
        ->assertRedirectToRoute('users.roles.index');

    $this->assertModelMissing($role);
});
