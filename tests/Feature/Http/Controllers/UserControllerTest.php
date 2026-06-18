<?php

use App\Models\User;

beforeEach(function () {
    $this->authUser = User::factory()->create();
});

test('can access users index', function () {
    $this->actingAs($this->authUser)
        ->get(route('users.index'))
        ->assertOk();
});

test('can create user', function () {
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
    $newUser = User::factory()->create();
    $this->actingAs($this->authUser)
        ->fromRoute('users.index')
        ->delete(route('users.destroy', $newUser))
        ->assertRedirect(route('users.index'));
    $this->assertSoftDeleted($newUser);
});

test('can restore user', function () {
    $softDeletedUser = User::factory()->softDeleted()->create();
    $this->actingAs($this->authUser)
        ->fromRoute('users.index')
        ->post(route('users.restore', $softDeletedUser))
        ->assertRedirect(route('users.index'));
    $this->assertNotSoftDeleted($softDeletedUser);
});
