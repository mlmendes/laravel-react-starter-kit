<?php

use App\Models\User;

use function Pest\Laravel\assertModelExists;
use function Pest\Laravel\assertModelMissing;

beforeEach(function (): void {
    config(['fortify.force-2fa' => true]);
});

it('redirects back to login if no session is being challenged', function (): void {
    $this->get(route('otp-challenge.show'))
        ->assertRedirectToRoute('login');
});

it('can regenerate OTP', function (): void {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirectToRoute('otp-challenge.show');

    $firstOtp = $user->oneTimePasswords()->sole()->fresh();

    $this->fromRoute('otp-challenge.show')
        ->put(route('otp-challenge.update'))
        ->assertOk();

    $secondOtp = $user->oneTimePasswords()->sole()->fresh();

    assertModelMissing($firstOtp);
    assertModelExists($secondOtp);
});

test('users can authenticate when force 2FA is enabled', function (): void {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirectToRoute('otp-challenge.show');

    $this->fromRoute('otp-challenge.show')
        ->post(route('otp-challenge.store'), [
            'code' => $user->oneTimePasswords()->sole()->password,
        ])->assertRedirectToRoute('dashboard');
    $this->assertAuthenticated();
});
