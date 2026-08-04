<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Exception\SessionNotFoundException;

class OtpController extends Controller
{
    public function show(Request $request): Response|RedirectResponse
    {
        try {
            $this->getUser($request);
        } catch (SessionNotFoundException) {
            Inertia::flash('toast', ['type' => 'error', 'message' => __('OTP session expired. Try to login again.')]);

            return to_route('login');
        }

        return Inertia::render(component: 'auth/otp-challenge');
    }

    /**
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'string'],
        ]);

        try {
            $result = $this->getUser($request)->attemptLoginUsingOneTimePassword($request->input('code'));
        } catch (SessionNotFoundException) {
            Inertia::flash('toast', ['type' => 'error', 'message' => __('OTP session expired. Try to login again.')]);

            return to_route('login');
        }

        if ($result->isOk()) {
            $request->session()->forget('otp_login_user_id');
            $request->session()->regenerate();

            return redirect()->intended(config('fortify.home'));
        }
        throw ValidationException::withMessages([
            'code' => $result->validationMessage(),
        ]);
    }

    public function update(Request $request): void
    {
        $this->getUser($request)->sendOneTimePassword();
    }

    /**
     * @throws SessionNotFoundException|ValidationException
     */
    private function getUser(Request $request): User
    {
        $userId = $request->session()->get('otp_login_user_id');
        if (! $userId) {
            throw new SessionNotFoundException(__('OTP session expired. Try to login again.'));
        }

        try {
            $user = User::findSole($userId);
        } catch (ModelNotFoundException) {
            throw ValidationException::withMessages([
                'code' => __('User not found'),
            ]);
        }

        return $user;
    }
}
