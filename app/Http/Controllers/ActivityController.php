<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        Gate::authorize('view-any', Activity::class);

        return Inertia::render('users/activity_log/index', [
            'activities' => Inertia::scroll(fn () => Activity::query()->with(['causer'])->orderByDesc('created_at')->cursorPaginate()),
        ]);
    }
}
