<?php

use App\Enums\Permission;
use App\Models\User;

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
    $this->actingAs($this->authUser)
        ->get(route('users.create'))
        ->assertOk();
    $this->actingAs($this->authUser)
        ->fromRoute('users.create')
        ->post(route('users.store'), [
            'name' => 'New User',
            'email' => 'newuser@example.com',
        ])->assertRedirect(route('users.index'));
    $this->assertModelExists(User::query()->where([
        'name' => 'New User',
        'email' => 'newuser@example.com',
    ])->sole());
});

test('can edit user', function () {
    $this->authUser->givePermissionTo(Permission::USERS_UPDATE);
    $newUser = User::factory()->create();
    $this->actingAs($this->authUser)
        ->get(route('users.edit', $newUser))
        ->assertOk();
    $this->actingAs($this->authUser)
        ->fromRoute('users.edit', $newUser)
        ->patch(route('users.update', $newUser), [
            'name' => 'Edited User',
            'email' => 'editeduser@example.com',
        ])->assertRedirect(route('users.index'));
    $this->assertModelExists(
        User::query()->where([
            'name' => 'Edited User',
            'email' => 'editeduser@example.com',
        ])->sole()
    );
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
