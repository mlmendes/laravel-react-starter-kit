<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(private readonly UserService $userService) {}

    public function index(): Response
    {
        Gate::authorize(ability: 'view-any', arguments: User::class);

        return Inertia::render(component: 'users/index', props: [
            'users' => Inertia::scroll(fn () => $this->userService->getAll()),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize(ability: 'create', arguments: User::class);

        return Inertia::render(component: 'users/create');
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        Gate::authorize(ability: 'create', arguments: User::class);

        $user = $this->userService->save($request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => __(':model :name created successfully', ['model' => __('User'), 'name' => $user->name])]);

        return to_route('users.index');
    }

    public function edit(User $user): Response
    {
        Gate::authorize(ability: 'update', arguments: $user);

        return Inertia::render(component: 'users/edit', props: ['user' => $user]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        Gate::authorize(ability: 'update', arguments: $user);

        $user = $this->userService->update($user, $request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => __(':model :name edited successfully', ['model' => __('User'), 'name' => $user->name])]);

        return to_route('users.index');
    }

    public function destroy(User $user): RedirectResponse
    {
        Gate::authorize(ability: 'delete', arguments: $user);

        $user = $this->userService->delete($user);
        if ($user->trashed()) {
            Inertia::flash('toast', ['type' => 'success', 'message' => __(':model :name deleted successfully', ['model' => __('User'), 'name' => $user->name])]);
        } else {
            Inertia::flash('toast', ['type' => 'error', 'message' => __(':model :name could not be deleted', ['model' => __('User'), 'name' => $user->name])]);
        }

        return to_route('users.index');
    }

    public function restore(User $user): RedirectResponse
    {
        Gate::authorize(ability: 'restore', arguments: $user);

        $user = $this->userService->restore($user);
        if (! $user->trashed()) {
            Inertia::flash('toast', ['type' => 'success', 'message' => __(':model :name restored successfully', ['model' => __('User'), 'name' => $user->name])]);
        } else {
            Inertia::flash('toast', ['type' => 'error', 'message' => __(':model :name could not be restored', ['model' => __('User'), 'name' => $user->name])]);
        }

        return to_route('users.index');
    }
}
