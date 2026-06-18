<?php

namespace App\Http\Controllers;

use App\Concerns\PasswordValidationRules;
use App\Http\Requests\WelcomeUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class WelcomeController
{
    use PasswordValidationRules;

    public function showWelcomeForm(User $user): Response
    {
        return Inertia::render(component: 'auth/welcome-form', props: ['user' => $user]);
    }

    public function savePassword(WelcomeUserRequest $request, User $user): RedirectResponse
    {
        $user->password = Hash::make($request->validated(key: 'password'));
        $user->welcome_valid_until = null;
        $user->save();
        $user->markEmailAsVerified();

        auth()->login($user);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Welcome! You are now logged in!')]);

        return to_route('dashboard');
    }
}
