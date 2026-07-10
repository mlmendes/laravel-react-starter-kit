<?php

use App\Enums\Permission;
use App\Models\Role;
use App\Models\User;

use function PHPUnit\Framework\assertTrue;

beforeEach(function () {
    $this->authUser = User::factory()->create();
});

test('can access users index', function () {
    $this->authUser->givePermissionTo([
        Permission::USERS_CREATE,
        Permission::USERS_DELETE,
        Permission::USERS_UPDATE,
    ]);
    $this->actingAs($this->authUser)
        ->get(route('users.index'))
        ->assertOk();
});

test('can create user', function () {
    $this->authUser->givePermissionTo(Permission::USERS_CREATE);
    $roles = collect(Role::factory(10)->create())->random(3);
    $rolesIds = $roles->pluck('uuid')->toArray();

    $this->actingAs($this->authUser)
        ->get(route('users.create'))
        ->assertOk();
    $this->actingAs($this->authUser)
        ->fromRoute('users.create')
        ->post(route('users.store'), [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'roles' => $rolesIds,
        ])->assertRedirect(route('users.index'));

    $user = User::query()->where([
        'name' => 'New User',
        'email' => 'newuser@example.com',
    ])->sole();

    $this->assertModelExists($user);
    assertTrue($user->hasExactRoles($roles));
});

test('can edit user', function () {
    $this->authUser->givePermissionTo(Permission::USERS_UPDATE);
    $newUser = User::factory()->create();
    $roles = collect(Role::factory(10)->create())->random(3);
    $rolesIds = $roles->pluck('uuid')->toArray();

    $this->actingAs($this->authUser)
        ->get(route('users.edit', $newUser))
        ->assertOk();
    $this->actingAs($this->authUser)
        ->fromRoute('users.edit', $newUser)
        ->patch(route('users.update', $newUser), [
            'name' => 'Edited User',
            'email' => 'editeduser@example.com',
            'roles' => $rolesIds,
        ])->assertRedirect(route('users.index'));

    $this->assertModelExists(
        User::query()->where([
            'name' => 'Edited User',
            'email' => 'editeduser@example.com',
        ])->sole()
    );

    assertTrue($newUser->hasExactRoles($roles));
});

test('can delete user', function () {
    $this->authUser->givePermissionTo(Permission::USERS_DELETE);
    $newUser = User::factory()->create();
    $this->actingAs($this->authUser)
        ->fromRoute('users.index')
        ->delete(route('users.destroy', $newUser))
        ->assertRedirect(route('users.index'));
    $this->assertSoftDeleted($newUser);
});

test('can restore user', function () {
    $this->authUser->givePermissionTo(Permission::USERS_DELETE);
    $softDeletedUser = User::factory()->softDeleted()->create();
    $this->actingAs($this->authUser)
        ->fromRoute('users.index')
        ->post(route('users.restore', $softDeletedUser))
        ->assertRedirect(route('users.index'));
    $this->assertNotSoftDeleted($softDeletedUser);
});
