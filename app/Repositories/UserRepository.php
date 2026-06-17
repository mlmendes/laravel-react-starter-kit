<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Pagination\CursorPaginator;

class UserRepository
{
    /**
     * @return CursorPaginator<int, User>
     */
    public function all(): CursorPaginator
    {
        return User::query()->withTrashed()->cursorPaginate();
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function save(array $data): User
    {
        return User::query()->create($data);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function update(User $user, array $data): User
    {
        $user->fill($data);
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();

        return $user->fresh();
    }

    public function delete(User $user): User
    {
        $user->delete();

        return $user;
    }

    public function restore(User $user): User
    {
        $user->restore();

        return $user;
    }
}
