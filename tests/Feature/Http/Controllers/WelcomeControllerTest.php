<?php

use App\Models\User;
use Spatie\WelcomeNotification\WelcomeNotification;

beforeEach(function () {
    $this->user = User::factory()->unverified()->create();

    $this->welcomeNotification = new WelcomeNotification(now()->addDay());
    $this->welcomeNotification->toMail($this->user);
});

it('can show the welcome form', function () {
    $this->get($this->welcomeNotification->showWelcomeFormUrl)->assertOk();
});

it('will show the invalid link view when the link is invalid', function () {
    $invalidWelcomeUrl = $this->welcomeNotification->showWelcomeFormUrl.'blabla';

    $this->get($invalidWelcomeUrl)->assertForbidden();
});

it('can set the initial password', function () {
    $this->withoutExceptionHandling();
    $password = 'my-new-password';

    savePassword($password);

    expect($this->user->fresh()->hasVerifiedEmail())->toBeTrue();
    $this->assertAuthenticatedAs($this->user);
});

it('can login with the new password', function () {
    $password = 'my-new-password';

    savePassword($password);

    expect(auth()->validate([
        'email' => $this->user->email,
        'password' => $password,
    ]))->toBeTrue();

    expect(auth()->validate([
        'email' => $this->user->email,
        'password' => 'invalid password',
    ]))->toBeFalse();
});

test('after being used the welcome url is not valid anymore', function () {
    savePassword('my-new-password');

    $this->get($this->welcomeNotification->showWelcomeFormUrl)
        ->assertForbidden();
});

test('the welcome link will expire after the given point in time', function () {
    $this->freezeTime(function () {
        $welcomeNotification = (new WelcomeNotification(now()->addMinute()));
        $welcomeNotification->toMail($this->user);

        $this->travel(59)->seconds();
        $this->get($this->welcomeNotification->showWelcomeFormUrl)->assertOk();

        $this->travel(1)->seconds();
        $this->get($this->welcomeNotification->showWelcomeFormUrl)->assertForbidden();
    });
});
