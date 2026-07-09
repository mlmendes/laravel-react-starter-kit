<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\Role;
use App\Services\PermissionService;
use App\Services\RoleService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function __construct(
        private readonly PermissionService $permissionService,
        private readonly RoleService $roleService,
        private readonly UserService $userService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        Gate::authorize(ability: 'view-any', arguments: Role::class);

        return Inertia::render(component: 'users/roles/index', props: [
            'roles' => Inertia::scroll(fn () => $this->roleService->getAll()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        Gate::authorize(ability: 'create', arguments: Role::class);

        return Inertia::render(component: 'users/roles/create', props: [
            'permissions' => $this->permissionService->getAll(),
            'users' => Inertia::scroll(fn () => $this->userService->getAll()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RoleRequest $request): RedirectResponse
    {
        Gate::authorize(ability: 'create', arguments: Role::class);
        $role = $this->roleService->save($request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => __(':model :name created successfully', ['model' => __('Role'), 'name' => $role->name])]);

        return to_route('users.roles.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role): Response
    {
        Gate::authorize(ability: 'update', arguments: $role);

        return Inertia::render(component: 'users/roles/edit', props: [
            'permissions' => $this->permissionService->getAll(),
            'role' => $role->load(relations: 'users'),
            'users' => Inertia::scroll(fn () => $this->userService->getAll()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleRequest $request, Role $role): RedirectResponse
    {
        Gate::authorize(ability: 'update', arguments: $role);
        $role = $this->roleService->update($role, $request->validated());
        Inertia::flash('toast', ['type' => 'success', 'message' => __(':model :name edited successfully', ['model' => __('Role'), 'name' => $role->name])]);

        return to_route('users.roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role): RedirectResponse
    {
        Gate::authorize(ability: 'force-delete', arguments: $role);
        if ($this->roleService->forceDelete($role)) {
            Inertia::flash('toast', ['type' => 'success', 'message' => __(':model :name deleted successfully', ['model' => __('Role'), 'name' => $role->name])]);
        } else {
            Inertia::flash('toast', ['type' => 'error', 'message' => __(':model :name could not be deleted', ['model' => __('Role'), 'name' => $role->name])]);
        }

        return to_route('users.roles.index');
    }
}
