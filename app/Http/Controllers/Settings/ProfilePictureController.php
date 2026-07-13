<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\AvatarUploadRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProfilePictureController extends Controller
{
    public function view(): Response
    {
        return Inertia::render(component: 'settings/avatar');
    }

    public function upload(AvatarUploadRequest $request): RedirectResponse
    {
        // TODO store uploaded avatar

        return to_route('avatar.view');
    }

    public function destroy(): RedirectResponse
    {
        // TODO remove profile picture

        return to_route('avatar.view');
    }
}
