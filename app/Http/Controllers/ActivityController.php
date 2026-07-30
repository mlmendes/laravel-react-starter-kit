<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Carbon\Carbon;
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

        $query = Activity::query()->with(['causer'])->orderByDesc('created_at');

        $filter = $request->query('filter');

        if (! empty($filter['attributes'])) {
            $query->where('attribute_changes', 'LIKE', '%'.$filter['attributes'].'%');
        }
        if (! empty($filter['period']['from'])) {
            $query->whereDate('created_at', '>=', Carbon::createFromFormat('Y-m-d', $filter['period']['from'])->startOfDay());
        }
        if (! empty($filter['period']['to'])) {
            $query->whereDate('created_at', '<=', Carbon::createFromFormat('Y-m-d', $filter['period']['to'])->endOfDay());
        }

        return Inertia::render('users/activity_log/index', [
            'activities' => Inertia::scroll(fn () => $query->cursorPaginate()),
            'filter' => $filter,
        ]);
    }
}
