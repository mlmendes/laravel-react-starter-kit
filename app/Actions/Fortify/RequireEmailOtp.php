<?php

namespace App\Actions\Fortify;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Fortify;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class RequireEmailOtp
{
    public function __invoke(Request $request, Closure $next): RedirectResponse
    {
        $user = Auth::user();
        if (! $user) {
            return $next($request);
        }
        if ($user->hasEnabledTwoFactorAuthentication()) {
            return $next($request);
        }
        try {
            $user->sendOneTimePassword();
        } catch (TransportExceptionInterface $exception) {
            Log::error($exception->getMessage());
            Auth::logout();
            throw ValidationException::withMessages([
                Fortify::username() => [trans('auth.2fa_timeout')],
            ]);
        }
        $request->session()->put('otp_login_user_id', $user->getAuthIdentifier());
        Auth::logout();

        return redirect()->route('otp-challenge.show');
    }
}
