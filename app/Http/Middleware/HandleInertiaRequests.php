<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use App\Models\Activity;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $cookie = $request->cookie(key: 'locale', default: 'en');
        $locale = is_string($cookie) ? $cookie : 'en';
        if (str_starts_with(strtolower($locale), 'pt')) {
            $locale = 'pt_BR';
        }

        App::setLocale($locale);

        if (auth()->check()) {
            $pages = [
                '/users' => $request->user()->can('view-any', User::class),
                '/users/roles' => $request->user()->can('view-any', Role::class),
                '/users/activity_log' => $request->user()->can('view-any', Activity::class),
            ];
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user(),
                'allowed_pages' => array_keys($pages ?? [], true, true),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }
}
