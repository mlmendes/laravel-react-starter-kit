<?php

use App\Enums\Permission;
use App\Models\User;

beforeEach(function (): void {
    $this->seed();
    $this->user = User::factory()->create();
});

test('authorized user can view users activity log', function (): void {
    $this->user->givePermissionTo(Permission::USERS_ACTIVITY_LOG_VIEW_ANY);

    $this->actingAs($this->user)
        ->get(route('users.activity_log', [
            'filter' => [
                'attributes' => 'something changed',
                'period' => [
                    'from' => fake()->date(),
                    'to' => fake()->date(),
                ],
            ],
        ]))
        ->assertOk();
});
