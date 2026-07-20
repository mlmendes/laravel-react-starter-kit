<?php

use App\Enums\Permission;
use App\Models\User;

beforeEach(function () {
    $this->seed();
    $this->user = User::factory()->create();
});

test('authorized user can view users activity log', function () {
    $this->user->givePermissionTo(Permission::USERS_ACTIVITY_LOG_VIEW_ANY);

    $this->actingAs($this->user)
        ->get(route('activity_log'))
        ->assertOk();
});
