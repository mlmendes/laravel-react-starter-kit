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
        if (is_null($request->file('avatar'))) {
            $request->user()->destroyAvatar();
            Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile picture deleted successfully')]);

            return to_route('avatar.view');
        }

        $path = $request->file('avatar')->storePublicly('avatars', 'public');

        if ($path) {
            $request->user()->update(['avatar' => $path]);
            Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile picture saved successfully')]);
        } else {
            Inertia::flash('toast', ['type' => 'error', 'message' => __('Error saving profile picture')]);
        }

        return to_route('avatar.view');
    }
}
